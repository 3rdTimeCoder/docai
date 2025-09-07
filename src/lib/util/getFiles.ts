import { globby } from 'globby';

export async function getFiles() {
  const files = await globby([
    'src/**/*',          // All files recursively in src/
    'README.md',         // README
    'package.json'       // package.json
  ], {
    gitignore: true,     // Respect .gitignore automatically
    onlyFiles: true,     // Exclude directories
    absolute: true       // Return absolute paths (optional)
  });

  return files;
};
