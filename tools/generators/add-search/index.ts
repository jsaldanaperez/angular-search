import {
  Tree,
  formatFiles,
  installPackagesTask,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, schema: any) {
  const projectRoot = readProjectConfiguration(tree, schema.projectName).root;
  console.log('projectRoot', projectRoot)
  const filesPath = joinPathFragments(tree.root, './tools/generators/add-search/files');
  console.log('filesPath', filesPath);

  // generateFiles(
  //   tree, // the virtual file system
  //   projectPath, // path to the file templates
  //   projectRoot, // destination path of the files
  //   {

  //   } // config object to replace variable in file templates
  // );

  // await formatFiles(tree);
  // return () => {
  //   installPackagesTask(tree);
  // };
}
