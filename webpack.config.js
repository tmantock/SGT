const webpack = require('webpack');

module.exports = {
    entry: './client.js',
    output: {
        filename: 'bundle.js',
        path: 'public'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: ['babel-loader'],
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }, {
              test: /\.scss$/,
              loaders: ["style-loader", "css-loader", "sass-loader"]
          },{
              test: /\.less$/,
              loader: "style-loader!css-loader!less-loader"
          }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.less']
    },
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin()
    // ]
};