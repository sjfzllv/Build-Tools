// 书写 gulp 配置文件
// 0. 导入第三方
// 0-1. 导入 gulp
const gulp = require('gulp');

// 0-2. 导入 gulp-cssmin
const cssmin = require('gulp-cssmin');
// 0-3. 导入 gulp-autoperfixer
const autoPerfixer = require('gulp-autoprefixer');
// 0-4. 导入 gulp-sass
const sass = require('gulp-sass');

// 1. 创建任务
// 1-1. 创建一个打包 css 的任务
const cssHandler = function () {
    return gulp
        .src('./src/css/*.css')     // 1. 找到内容
        .pipe(autoPerfixer())       // 2. 自动添加前缀
        .pipe(cssmin())             // 3. 压缩
        .pipe(gulp.dest('./dist/css/'));    // 4. 放到指定目录
}

// 1-2. 创建一个打包sass 文件的任务
const sassHandler = function () {
    return gulp
        .src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(autoPerfixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/sass/'))
}

// 2. 导出任务
// 2-1. 导出打包 css 的任务
module.exports.cssHandler = cssHandler
// 2-2. 导出打包 sass 的任务
module.exports.sassHandler = sassHandler

/*
    sass 转换的问题
        + 有一个电脑上的工具叫做 sass
            => 可以转换和编译 sass 文件为 css 文件
        + gulp 里面配置一个任务, 也可以转换 sass 文件
    
    + 写项目的时候使用哪一个?
        => 如果你需要使用 gulp 来配置你的项目, 那么就不需要使用 sass 工具
        => 如果你不需要使用 gulp 来配置你的项目，那么就需要使用 sass 工具

    + 写项目不要多个工具(完成一个工作的多个工具)混着使用
        => 使用 sass 工具转换 sass 文件为 css
        => 使用 gulp 对 css, js, html 等文件进行打包
        => 用了 gulp 就不要再用 sass
*/
/*
    sass 转码使用
        + 有一种方式叫做 导入 sass 文件
        + 如果你需要用到导入
        + 你可以把变量和混合器定义在 .sass 后缀的文件中
            => 您的 gulp 配置的只会转码 .scss 文件
            => 你设置的变量和混合器文件不会被转码
        + 但是, 当他转码 .scss 文件的时候, 会自动读取 .sass 文件里面的变量
            => 会给你解析以后使用
*/