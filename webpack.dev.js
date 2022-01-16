const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        port: 8080,
        historyApiFallback: true,
    },
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname,'.env'),
            safe: true, 
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
        }),
        new BundleAnalyzerPlugin({
            analyzerPort: 3002,
            openAnalyzer: false,
        }),
    ],
});
