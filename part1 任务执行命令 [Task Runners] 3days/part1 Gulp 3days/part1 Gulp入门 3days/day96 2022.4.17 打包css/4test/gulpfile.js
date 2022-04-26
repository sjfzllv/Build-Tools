// 书写我本个项目的打包配置流程
// 按照 gulp 的语法来进行配置
// gulp 指令运行的时候才会认识

/*
    执行一个 gulp 配置好的任务
        + 直接打开命令行, 切换到 gulpfile.js 所在的目录
        + 执行命令 $ gulp 任务名称
*/

// 因为 gulp 是依赖于 node 环境运行的
// 将来的运行也是以 node 位居出运行的
// 书写 gulpfile.js 文件就按照 node 的模块化语法进行书写(CommonJS)
const gulp = require('gulp');

// 导入 gulp-cssmin
const cssmin = require('gulp-cssmin');

// 1. 创建一个打包 css 的任务
//      gulp@3 的标准书写语法
// gulp.task('cssHandler', function () {
//     // 需要捕获到该任务的结束, 需要把这个流 return 出去
//     // task 就会处理流
//     return gulp
//         .src('./src/css/*.css')     // 1-1. 找到源文件
//         .pipe(cssmin())             // 1-2. 压缩文件
//         .pipe(gulp.dest('./dist/css/')) // 1-3. 把压缩好的内容放在指定目录下
// })

// 1. 创建一个打包 css 的任务
//      gulp@4 的标准书写, 需要在 gulpfile.js 文件里面把这个函数名导出
const cssHandler = function () {
    return gulp
        .src('./src/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
}

// 导出这个任务
module.exports.cssHandler = cssHandler