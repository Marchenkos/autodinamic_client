const { merge } = require('webpack-merge');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

 const dd = merge(common, {
    mode: 'production',
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname,'.env'),
            safe: true, 
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                keepClosingSlash: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
            },
        }),
    ],
});

console.log(dd);
module.exports = dd;
