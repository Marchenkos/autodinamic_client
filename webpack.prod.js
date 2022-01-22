const { merge } = require('webpack-merge');
const path = require('path');

const { GenerateSW } = require('workbox-webpack-plugin');

const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    performance: {
        hints: false
    },
    plugins: [
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
        new GenerateSW({
            clientsClaim: true,
            navigateFallback: path.resolve(__dirname, 'public', 'index.html'),
        })
    ],
});
