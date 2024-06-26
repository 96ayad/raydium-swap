var webpack = require('webpack');

const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: prod ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
        path: __dirname + '/build/',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.json'],
                },
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ]
    },
    devtool: prod ? undefined : 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            // Make a global `process` variable that points to the `process` package,
            // because the `util` package expects there to be a global variable named `process`.
            // Thanks to https://stackoverflow.com/a/65018686/14239942
            process: 'process/browser'
        }),
    ],
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "os": false, // "os": require.resolve("os-browserify/browser"),
        }
    },


    devServer: {
        // allowedHosts: "all"

        // compress: true,
        // public: 'raydium-swap.onrender.com' // That solved it

        // disableHostCheck: true,
        // host: '0.0.0.0',
        // port: 3000

        allowedHosts: [
            'onrender.com',
            'raydium-swap.onrender.com'
             ]
    
     }  
};