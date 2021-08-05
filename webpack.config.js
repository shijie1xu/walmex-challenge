const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        // filename: 'bundle.js',
        path: path.join(__dirname, 'temp')
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            }
        ]





    },
    devServer: {
        port: 8080,
        hot: true,
        compress: false,
        open: true,
        overlay: true,
        stats: "errors-only"
    },


    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({

            filename: './index.html',
            template: './public/index.html',
            // favicon: path.resolve(__dirname, 'public', 'favicon.png'),
        })
    ],
    devtool: 'eval-source-map'

};
