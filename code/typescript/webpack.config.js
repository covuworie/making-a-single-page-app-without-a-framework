const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        openPage: 'app/',
        publicPath: '/app/'
    },
    devtool: 'inline-source-map',
    entry: './src/ts/app.ts',
    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/app/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/html/index.html', to: 'index.html' },
                { from: 'src/css', to: 'css' },
                { from: 'src/assets', to: 'assets' },
            ],
        }),
    ],
};