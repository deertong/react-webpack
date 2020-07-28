const { merge } = require('webpack-merge');
const path = require('path')
const webpackDll = require('./webpack.dll');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const port = process.env.PORT
module.exports = merge(webpackDll, {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            cacheGroups: {
                vendor: {
                    test: /node_modules/, // 用于规定缓存组匹配的文件位置
                    name: 'vendor',
                    minSize: 30000,
                    priority: -10 // 优先级
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            { //字体文件
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    name: "[name].[ext]",
                    outputPath: './fonts'
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name][hash].[ext]',
                            outputPath: 'image/'
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ //生成html文件
            title: 'deertong',
            template: './public/index.html',
            chunks: ['app', 'vendor']
        })
    ],
    devServer: { //测试服务启动
        port,
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        overlay: true,
        quiet: true,
        historyApiFallback: true,
    }
})