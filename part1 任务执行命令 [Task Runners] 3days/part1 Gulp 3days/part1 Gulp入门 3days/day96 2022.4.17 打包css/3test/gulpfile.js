// 书写我本个项目的打包配置流程
// 按照 gulp 的语法来进行配置
// gulp 指令运行的时候才会认识

// 因为 gulp 是依赖于 node 环境运行的
// 将来的运行也是以 node 为基础运行的
// 书写 gulpfile.js 文件就按照 node 的模块化语法进行书写(CommonJS)
const gulp = require('gulp');
console.log(gulp);