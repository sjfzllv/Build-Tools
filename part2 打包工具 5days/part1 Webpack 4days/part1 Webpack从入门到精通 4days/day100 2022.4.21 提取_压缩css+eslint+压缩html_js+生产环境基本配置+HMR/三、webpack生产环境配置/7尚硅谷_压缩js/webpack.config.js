const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 生产环境下会自动压缩js代码
    mode: 'production'
}