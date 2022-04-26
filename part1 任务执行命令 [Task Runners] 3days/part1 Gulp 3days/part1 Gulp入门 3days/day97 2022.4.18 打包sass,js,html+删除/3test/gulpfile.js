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
// 0-5. 导入 gulp-uglify
const uglify = require('gulp-uglify');
// 0-6. 导入 gulp-babel
const babel = require('gulp-babel');
// 0-7. 导入 gulp-htmlmin
const htmlmin = require('gulp-htmlmin')

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

// 1-3. 创建一个打包 js 文件的任务
const jsHandler = function () {
    return gulp
        .src('./src/js/*.js')   // 1. 找到 js 文件
        .pipe(babel({
            // babel@7, presets: ['es2015']
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
}

// 1-4. {创建一个打包} html 文件的任务
const htmlHandler = function () {
    return gulp
        .src('./src/pages/*.html')
        .pipe(htmlmin({     // 通过你配置的参数来进行压缩
            collapseWhitespace: true,       // 表示移除空格
            removeEmptyAttributes: true,    // 表示移除空属性(仅限于原生属性)
            collapseBooleanAttributes: true,    // 移除 checked 类似的布尔值属性
            removeAttributeQuotes: true,    // 移除属性上的双引号
            minifyCSS: true,                // 压缩内嵌式 CSS 代码(只能基本压缩, 不能自动添加前缀)
            minifyJS: true,                 // 压缩内嵌式 JS 代码(只能基本压缩, 不能转码)
            removeStyleLinkTypeAttributes: true, // 移除 style 和 link 标签上的 type 属性
            removeScriptTypeAttributes: true     // 移除 script 标签上默认的 type 属性
        }))
        .pipe(gulp.dest('./dist/pages/'))
}

// 2. 导出任务
// 2-1. 导出打包 css 的任务
module.exports.cssHandler = cssHandler
// 2-2. 导出打包 sass 的任务
module.exports.sassHandler = sassHandler
// 2-3. 导出打包 js 的任务
module.exports.jsHandler = jsHandler
// 2-4. 导出打包 html 的任务
module.exports.htmlHandler = htmlHandler

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