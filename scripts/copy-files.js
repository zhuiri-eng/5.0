import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

// 确保 dist 文件夹存在（避免后续操作报错）
if (!existsSync('dist')) {
  mkdirSync('dist', { recursive: true });
  console.log('Created dist folder');
}

// 复制 package.json 到 dist 文件夹
const sourceFile = 'package.json';
const destFile = 'dist/package.json';

if (existsSync(sourceFile)) {
  copyFileSync(sourceFile, destFile);
  console.log(`Copied ${sourceFile} to ${destFile}`);
} else {
  console.error(`Error: ${sourceFile} not found in project root`);
  process.exit(1); // 出错时终止构建
}

// 创建 empty.txt 模板文件（用于生成 build.flag）
const emptyTemplate = 'scripts/empty.txt';
if (!existsSync(emptyTemplate)) {
  console.error(`Error: ${emptyTemplate} not found - please create it`);
  process.exit(1);
}

// 创建 build.flag 文件
const flagFile = 'dist/build.flag';
mkdirSync(dirname(flagFile), { recursive: true }); // 确保目标文件夹存在
copyFileSync(emptyTemplate, flagFile);
console.log(`Created ${flagFile}`);