const path = require('path');

var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
        main: './client/src/main.js',
    },
    output: {
        path: path.resolve('./client/dist'),
        filename: "[name].min.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: { 
                    presets: ['es2015', 'react'] 
                }
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js"
        })
    ]
};
