import { Tree, formatFiles, installPackagesTask, generateFiles, joinPathFragments, readProjectConfiguration } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, schema: any) {
  await libraryGenerator(tree, { name: schema.name });
  const projectRoot = readProjectConfiguration(tree, schema.name).root;
  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates
    projectRoot, // destination path of the files
    {

    } // config object to replace variable in file templates
  );

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
