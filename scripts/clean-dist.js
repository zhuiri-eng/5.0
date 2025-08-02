import { execSync } from 'child_process';
import fs from 'fs';

// 跨平台删除 dist 文件夹（兼容 Windows 和 Linux）
if (fs.existsSync('dist')) {
  // 根据系统选择删除命令
  const command = process.platform === 'win32' 
    ? 'rd /s /q dist'  // Windows 命令
    : 'rm -rf dist';   // Linux/Mac 命令
  
  // 执行删除命令
  execSync(command, { stdio: 'inherit' });
} else {
  console.log('No dist folder to delete');
}