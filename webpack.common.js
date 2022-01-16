const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].chunkhash.bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            assets: path.resolve('./public/assets'), // Makes it easier to reference our assets in jsx files
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/',
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [new TerserPlugin({})],
        usedExports: true,
    },
};
