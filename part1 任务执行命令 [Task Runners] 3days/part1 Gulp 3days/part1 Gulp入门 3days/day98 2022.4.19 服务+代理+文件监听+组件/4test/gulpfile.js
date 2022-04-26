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
const htmlmin = require('gulp-htmlmin');
// 0-8. 导入 del
const del = require('del');
// 0-9. 导入 gulp-webserver
const webserver = require('gulp-webserver');
// 0-10. 导入 gulp-file-include
const fileInclude = require('gulp-file-include');

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

// 1-4. 创建一个打包 html 文件的任务
const htmlHandler = function () {
    return gulp
        .src('./src/pages/*.html')
        .pipe(fileInclude({     // 根据你的配置导入对应的 html 片段
            prefix: '@-@',                  // 你自定义的一个标识符
            basepath: './src/components',   // 基准目录, 你的组件文件都在哪一个目录里面
        }))
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

// 1-5. 创建一个打包 image 文件的任务
const imgHandler = function () {
    return gulp
        .src('./src/images/**')
        .pipe(gulp.dest('./dist/images/'))
}

// 1-6. 创建一个打包 videos 文件的任务
const videoHandler = function () {
    return gulp
        .src('./src/videos/**')
        .pipe(gulp.dest('./dist/videos'))
}

// 1-7. 创建一个打包 audios 文件的任务
const audioHandler = function () {
    return gulp
        .src('./src/audios/**')
        .pipe(gulp.dest('./dist/audios'))
}

// 1-8. 创建一个打包 第三方 的任务
const libHandler = function () {
    return gulp
        .src('./src/lib/**/*')
        .pipe(gulp.dest('./dist/lib'))
}

// 1-9. 创建一个打包 fonts 文件的任务
const fontHandler = function () {
    return gulp
        .src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
}

// 1-10. 创建一个删除 dist 目录的任务
const delHandler = function () {
    // del 直接执行就可以了, 不需要流
    // 参数以数组的形式传递你要删除的文件夹
    return del(['./dist/'])
}

// 1-11. 创建一个启动 服务器 的任务
const webHandler = function () {
    return gulp
        .src('./dist')
        .pipe(webserver({
            host: 'www.gx.com',  // 域名(可以配置自定义域名)
            port: '8080',        // 端口号
            livereload: true,    // 当文件修改的时候, 是否自动刷新页面
            open: './pages/login.html',  // 默认打开哪一个文件(从 dist 目录以后的目录开始书写)
            proxies: [           // 配置你的所有代理
                // 每一个代理就是一个对象数据类型
                // 注意: 如果你没有代理, 不要写空对象
                {
                    // 代理标识符
                    sourse: '/dt',
                    // 代理目标地址
                    target: 'http://www.duitang.com/napi/blog/list/by_filter_id/'
                },
                {
                    source: '/gx',
                    target: 'http://localhost:80/server.php'
                },
                {
                    source: '/gx2',
                    target: 'http://localhost:80/'
                }
            ]
        }))
}

// 1-12. 创建一个监控任务
const watchHandler = function () {
    // 使用 gulp.watch()
    gulp.watch('./src/css/*.css', cssHandler)
    gulp.watch('./src/sass/*.scss', sassHandler)
    gulp.watch('./src/js/*.js', jsHandler)
    gulp.watch('./src/pages/*.html', htmlHandler)
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
// 2-5. 导出打包 images 的任务
module.exports.imgHandler = imgHandler
// 2-6. 导出打包 videos 的任务
module.exports.videoHandler = videoHandler
// 2-7. 导出打包 audios 的任务
module.exports.audioHandler = audioHandler
// 2-8. 导出打包 第三方 的任务
module.exports.libHandler = libHandler
// 2-9. 导出打包 fonts 的任务
module.exports.fontHandler = fontHandler
// 2-10. 导出删除 dist 目录的任务
module.exports.delHandler = delHandler

// 3. 配置一个默认任务
//    默认任务的作用就是把所有的任务给我一起执行了
//    要么使用 gulp.series(), 要么使用gulp.parallel()
//    这两个方法的返回值是一个函数, 返回值可以直接被当做任务函数使用
//    使用 task 的方式创建一个 default 任务
// 方式1:
// gulp.task('default', () => { })
// 方式2:
// module.exports.default = () => {}

// 创建一个默认任务
module.exports.default = gulp.parallel(cssHandler, sassHandler, jsHandler, htmlHandler, imgHandler, videoHandler, audioHandler, libHandler, fontHandler);
// module.exports.default = gulp.series(cssHandler, sassHandler, jsHandler);

// 添加完删除 dist 目录的任务, 修改 default 任务
// module.exports.default = gulp.series(
//     delHandler,
//     gulp.parallel(cssHandler, sassHandler, jsHandler, htmlHandler, imgHandler, videoHandler, audioHandler, libHandler, fontHandler)
// )

// 添加完毕服务器任务以后, 修改 default 任务
// module.exports.default = gulp.series(
//     delHandler,
//     gulp.parallel(cssHandler, sassHandler, jsHandler, htmlHandler, imgHandler, videoHandler, audioHandler, libHandler, fontHandler),
//     webHandler
// )

// 添加完毕监控任务以后, 修改 default 任务
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, sassHandler, jsHandler, htmlHandler, imgHandler, videoHandler, audioHandler, libHandler, fontHandler),
    webHandler,
    watchHandler
)

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
/*
    图片问题
        + 在开发环境中
        + 图片是不需要我们压缩的
            => 直接使用线上地址
            => 图片时 UI 处理好给我们的
        + gulp-imagemin
            => 专门用来压缩图片(无损压缩)
            => 下载需要很好的网络环境
            => 压缩程度最高是 7 级, 1024K 变成 1023K
*/
/*
    默认任务为什么一定要交 default
        + 因为你使用 gulp 指令的时候
            => 应该是 $ gulp 任务名称
        + 当你有一个叫做 default 的任务的时候
            => 你可以直接执行指令 $ gulp
            => 它会自动去指定你 gulpfile.js 文件中的 default 任务
*/
/*
    利用 gulp 启动一个服务器
        + gulp 是基于 node 环境的工具
        + node 就是可以做服务器的语言
        + gulp 可以启动一个基于 node 的服务器

    启动服务器, 用哪个目录当做服务器根目录
        + dist 目录, 
        + 如果你使用 src 目录当做根目录, sass 文件怎么办
        + 启动服务器的时候, 启动 dist 目录里面的 对应的 html 文件
    
    sass 文件
        + src/pages/login.html
        + src/sass/login.scss
        + 怎么使用
            => 将来 src/pages/login.html 会被打包传递到 dist/pages/login.html
            => 将来 src/sass/login.css 会被打包传递到 dist/sass/login.css
        + 在 html 中书写
            => link href="../sass/login.css"

    自动刷新为什么不好使
        + 因为你启动的服务器是 dist 目录
        + 你修改的 src 目录下的内容
        + 你还需要一个任务, 当 src 目录下的内容修改的时候, 自动重新打包一遍该文件
        + 导致 dist 目录下的文件修改, dist 目录下的文件修改就会自动刷新页面

    启动服务配置自定义域名
        + webserver 位置的 host 书写一个你自己定义好的域名(www.gx.com)
        + 找到电脑中的 hosts 文件
            -> C：/windows/system32/dirvers/etc/hosts
            -> 注意: 找到那个没有后缀的 hosts 文件
            -> 添加一行内容 127.0.0.1  www.gx.com
*/
/*
    gulp-webserver 配置代理
        + 再 webserver({
            proxies: [
                {
                    sourse: '代理标识符',
                    target: '代理目标地址'
                }
            ]
        })
        + 注意:
            1. 如果没有多与代理, 不要写空对象
            2. 如果你想使用代理, 那么必须要是在 gulp-webserver 启动的服务器上运行页面
            3. 可以直接代理一半目录结构
*/