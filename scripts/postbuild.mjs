// Assembles the Hostinger-ready `dist/` folder from Next's static export (`out/`).
// dist/
//   index.html, 404.html, robots.txt, sitemap.xml, manifest.webmanifest, llms.txt, icon.svg
//   assets/            ← images + compiled JS/CSS/fonts (assets/_next)
//   .htaccess
import { cpSync, existsSync, mkdirSync, renameSync, rmSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'out';
const DIST = 'dist';

if (!existsSync(OUT)) {
  console.error('✖ Static export folder "out" not found. Check `output: "export"` in next.config.mjs.');
  process.exit(1);
}

rmSync(DIST, { recursive: true, force: true });
cpSync(OUT, DIST, { recursive: true });

mkdirSync(join(DIST, 'assets'), { recursive: true });
if (existsSync(join(DIST, '_next'))) {
  rmSync(join(DIST, 'assets', '_next'), { recursive: true, force: true });
  renameSync(join(DIST, '_next'), join(DIST, 'assets', '_next'));
}

cpSync(join('public', '.htaccess'), join(DIST, '.htaccess'));
rmSync(OUT, { recursive: true, force: true });

console.log('\n✔ dist/ ready for Hostinger → upload the CONTENTS of dist/ to public_html/');
for (const f of readdirSync(DIST)) console.log('   ' + f);
