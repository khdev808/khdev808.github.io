import { copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
copyFileSync(join(root, 'docs', 'index.html'), join(root, 'docs', '404.html'));
console.log('Copied index.html to 404.html for GitHub Pages SPA support');
