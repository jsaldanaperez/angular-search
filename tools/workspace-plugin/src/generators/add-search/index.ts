import {
  Tree,
  formatFiles,
  joinPathFragments,
  readProjectConfiguration,
  updateJson,
  generateFiles,
} from '@nrwl/devkit';
import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

export default async function (tree: Tree, schema: any) {
  const projectRoot = readProjectConfiguration(tree, schema.projectName).root;
  const filesPath = joinPathFragments(
    tree.root,
    './tools/generators/add-search/files'
  );
  const destinationPath = joinPathFragments(projectRoot, './src/app/search');

  addExposesEntry(tree, projectRoot, schema.projectName);

  const tsConfigPath = joinPathFragments(projectRoot, 'tsconfig.app.json');
  updateJson(tree, tsConfigPath, (json) => {
    const searchModulePath = 'src/app/search/search.module.ts';
    if (!json.files.includes(searchModulePath)) {
      json.files.push('src/app/search/search.module.ts');
    }
    return json;
  });

  const searchModuleRoute = `{
    path: '',
    loadChildren: () =>
      import('${schema.projectName}/SearchModule').then((m) => m.SearchModule),
    outlet: '${schema.projectName}',
  }`;

  const shellAppModulePath = './apps/shell/src/app/app.module.ts';
  addRoute(tree, shellAppModulePath, searchModuleRoute);

  const declarationsFilePath = './apps/shell/src/decl.d.ts';
  const fileContent = tree.read(declarationsFilePath).toString();
  const endOfFile = tsquery(fileContent, 'EndOfFileToken')[0].end;
  const newFileContent = insertContent(
    fileContent,
    endOfFile,
    `\ndeclare module '${schema.projectName}/SearchModule'`
  );
  tree.write(declarationsFilePath, newFileContent);

  const appComponentPath = './apps/shell/src/app/app.component.html';
  const appComponentContent = tree.read(appComponentPath).toString();
  const indexOfEndSearch = appComponentContent.indexOf('</app-search-modal>');
  const newRouterOutlet = `<router-outlet name="${schema.projectName}"></router-outlet>`;
  const newAppComponentContent = insertContent(
    appComponentContent,
    indexOfEndSearch,
    newRouterOutlet
  );
  tree.write(appComponentPath, newAppComponentContent);

  generateFiles(tree, filesPath, destinationPath, schema);

  await formatFiles(tree);
}

function addExposesEntry(
  tree: Tree,
  projectRoot: string,
  projectName: string
): void {
  const webpackConfigPath = joinPathFragments(projectRoot, 'webpack.config.js');
  const selector =
    'ObjectLiteralExpression > :first-child :has([name=exposes]) > ObjectLiteralExpression';
  const fileContent = tree.read(webpackConfigPath).toString();
  const exposesNode = tsquery(fileContent, selector, {
    visitAllChildren: true,
  })[0];
  const endsWithComma = endsWith(exposesNode.getFullText(), ',}');
  const entry = `'./SearchModule': 'apps/${projectName}/src/app/search/search.module.ts'`;
  const exposedSearchModule = endsWithComma ? entry : `,${entry}`;
  const newContent = insertContent(
    fileContent,
    exposesNode.end - 1,
    exposedSearchModule
  );
  tree.write(webpackConfigPath, newContent);
}

function addRoute(tree: Tree, filePath: string, route: string): void {
  const fileContent = tree.read(filePath).toString();
  const selector =
    'ArrayLiteralExpression :has([name=RouterModule]) > ArrayLiteralExpression';
  const routerModuleArrayNode = tsquery(fileContent, selector, {
    visitAllChildren: true,
  })[0];
  const routerModuleArrayContent = routerModuleArrayNode.getFullText();
  const routeContent = endsWith(routerModuleArrayContent, ',]')
    ? route
    : `,${route}`;
  const newContent = insertContent(
    fileContent,
    routerModuleArrayNode.end - 1,
    routeContent
  );
  tree.write(filePath, newContent);
}

function insertContent(
  fileContent: string,
  position: number,
  content: string
): string {
  return [
    fileContent.slice(0, position),
    content,
    fileContent.slice(position),
  ].join('');
}

function endsWith(content: string, match: string): boolean {
  const matchContent = content.replace(/\n/g, '').replace(/\s/g, '');
  return matchContent.slice(matchContent.length - match.length) === match;
}
