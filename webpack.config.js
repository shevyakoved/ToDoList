const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    src: path.resolve(__dirname, './src'), // исходные файлы JS
    build: path.resolve(__dirname, './build'), // собранный проект для выкладывания на хостинг
    static: path.resolve(__dirname, './public'), // статичные файлы, которые копируются в build
};

module.exports = {
    mode: 'development', // режим работы: development - для разработки, production - для выкладывания на сервер
    devtool: 'inline-source-map', // что делать с исходниками @see https://habr.com/ru/post/509250/
    entry: [paths.src + '/index.js'], // точка входа
    output: {
        path: paths.build, // куда класть бандл
        filename: 'vasya.bundle.js', // имя бандла
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({ // плагин копирует файлы из static
            patterns: [{
                from: paths.static,
                to: paths.build,
                globOptions: {
                    ignore: ['**/index.html'] // кроме index.html
                }
            }],
        }),
        new HtmlWebpackPlugin({
            template: paths.static + '/index.html', // template file
            filename: 'index.html', // output file
        }),
    ],
    module: {
        rules: [{ // модуль для обработки JS
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        }, ]
    }
};