import {
  Tree,
  formatFiles,
  joinPathFragments,
  readProjectConfiguration,
  updateJson,
  generateFiles,
} from '@nrwl/devkit';
import { addRoute, getTsSourceFile } from '../../ast-utils'
import * as ts from 'typescript';

export default async function (tree: Tree, schema: any) {
  const projectRoot = readProjectConfiguration(tree, schema.projectName).root;
  const filesPath = joinPathFragments(tree.root, './tools/generators/add-search/files');
  const destinationPath = joinPathFragments(projectRoot, './src/app/search');
  console.log('filesPath', filesPath);
  console.log('destination', destinationPath);

  const webpackConfigPath = joinPathFragments(projectRoot, 'webpack.config.js');
  const content = tree.read(webpackConfigPath).toString();
  const exposedSearchModule = `exposes: { './SearchModule': 'apps/${schema.projectName}/src/app/search/search.module.ts',`
  const newContent = content.replace('exposes: {', exposedSearchModule);
  tree.write(webpackConfigPath, newContent);

  const tsConfigPath = joinPathFragments(projectRoot, 'tsconfig.app.json');
  updateJson(tree, tsConfigPath, (json) => {
    const searchModulePath = 'src/app/search/search.module.ts';
    if (!json.files.includes(searchModulePath)) {
      json.files.push('src/app/search/search.module.ts')
    }
    return json;
  })

  const searchModuleRoute = `{
    path: '',
    loadChildren: () =>
      import('${schema.projectName}/SearchModule').then((m) => m.SearchModule),
    outlet: '${schema.projectName}',
  }`;

  const shellAppModulePath = './apps/shell/src/app/app.module.ts';
  console.log('path', shellAppModulePath)
  console.log('fileExists', tree.exists('./apps/shell/src/app/app.module.ts'))
  addRoute(tree, shellAppModulePath, getTsSourceFile(tree, shellAppModulePath), searchModuleRoute);

  const declarationsFilePath = './apps/shell/src/decl.d.ts';
  const declarationsFile = getTsSourceFile(tree, declarationsFilePath);

  let endOfFilePosition = 0;
  declarationsFile.forEachChild((child) => {
    if (child.kind === ts.SyntaxKind.EndOfFileToken) {
      endOfFilePosition = child.end;
    }
  });

  const fileContent = tree.read(declarationsFilePath).toString();
  const newFileContent = [fileContent.slice(0, endOfFilePosition), `\ndeclare module '${schema.projectName}/SearchModule'`, fileContent.slice(endOfFilePosition)].join('');
  tree.write(declarationsFilePath, newFileContent)

  const appComponentPath = './apps/shell/src/app/app.component.html';
  const appComponentContent = tree.read(appComponentPath).toString();
  const indexOfEndSearch = appComponentContent.indexOf('</app-search-modal>');
  const newRouterOutlet = `<router-outlet name="${schema.projectName}"></router-outlet>`;
  const newAppComponentContent = [appComponentContent.slice(0, indexOfEndSearch), newRouterOutlet, appComponentContent.slice(indexOfEndSearch)].join('');
  tree.write(appComponentPath, newAppComponentContent)
  generateFiles(
    tree, // the virtual file system
    filesPath, // path to the file templates
    destinationPath, // destination path of the files
    schema
  );

  await formatFiles(tree);
}
