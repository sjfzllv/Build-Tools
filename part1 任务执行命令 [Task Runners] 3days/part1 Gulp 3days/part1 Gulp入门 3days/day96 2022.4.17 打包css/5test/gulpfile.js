// 书写 gulp 配置文件
// 0. 导入第三方
// 0-1. 导入 gulp
const gulp = require('gulp');

// 0-2. 导入 gulp-cssmin
const cssmin = require('gulp-cssmin');
// 0-3. 导入 gulp-autoperfixer
const autoPerfixer = require('gulp-autoprefixer');
// 1. 创建任务
// 1-1. 创建一个打包 css 的任务
const cssHandler = function () {
    return gulp
        .src('./src/css/*.css')     // 1. 找到内容
        .pipe(autoPerfixer())       // 2. 自动添加前缀
        .pipe(cssmin())             // 3. 压缩
        .pipe(gulp.dest('./dist/css/'));    // 4. 放到指定目录
}

// 2. 导出任务
// 2-1. 导出打包 css 的任务
module.exports.cssHandler = cssHandler