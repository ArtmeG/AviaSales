const path = require('path'),
    HTMLWebpackPlugin = require('html-webpack-plugin'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    plugins = [];

plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].[fullhash].css',
        chunkFilename: '[id].css'
    }),
    new HTMLWebpackPlugin({
        template: './index.html'
    }))

module.exports = {
    mode: 'development',
    entry: {
        polyfill: 'babel-polyfill',
        app: './scripts/index.js',
    },
    context: path.resolve(__dirname, 'src'),
    devServer: {
        publicPath: '/',
        contentBase: path.join(__dirname, 'dist'),
        host: 'localhost',
        compress: true,
        hot: true,
        port: 7000
    },
    module: {
        rules: [
            {
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
                test: /\.js?x$/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(?:png|svg|gif|jpg|jpeg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff?2|eot|ttf|otf|svg)$/,
                use: ['file-loader']
            },
        ]
    },
    plugins,
    output: {
        filename: '[name].[fullhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css']
    },
}