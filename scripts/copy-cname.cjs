const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const cnameSrc = path.join(root, 'CNAME');
const distDir = path.join(root, 'dist');
const cnameDest = path.join(distDir, 'CNAME');

if (!fs.existsSync(cnameSrc)) {
  console.error('CNAME file not found in project root. Aborting.');
  process.exit(1);
}

if (!fs.existsSync(distDir)) {
  process.exit(0);
}

try {
  fs.copyFileSync(cnameSrc, cnameDest);
  console.log('Copied CNAME to dist/');
} catch (err) {
  console.error('Failed to copy CNAME:', err);
  process.exit(1);
}
