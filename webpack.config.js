const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const modeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: modeEnv,
    module: {
        rules: [
            {
              test: /\.s[ac]ss$/i,
              // 把 sass-loader 放在首要處理 (第一步)
              use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'images/[hash:8][name][ext]'
                  },
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 //在多少位元組以下就變成base64
                    }
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/, //node module底下的東西就不用做了
                use: {
                  loader: "babel-loader",
                }
              },
              
          ],
    },
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
      },
    devServer: {
        static: {
            directory: path.join(__dirname, './dist/html')
        },
        open: true,
        port: 8080,
        hot:true,
    },
    devtool:'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Custom template',
            filename: 'html/index.html',
            template:'src/html/template.html'
        }),
       new MiniCssExtractPlugin({
        filename: "./css/[contenthash:8].bundle.css"
       }),
    ],
}