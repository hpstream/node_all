/**
 * 练习os模块
 */

var os = require('os');
// 查看操作系统平台
const platform = os.platform();

// 查看操作系统版本
const release = os.release();
// 查看操作系统名称
const type = os.type();
// 查看cpu架构
const arch = os.arch();


// console.log(platform);
// console.log(release);
// console.log(type);
// console.log(arch);

console.log(os.cpus().length);



