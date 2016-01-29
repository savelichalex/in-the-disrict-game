var path = require('path');
module.exports = {
    entry: './src/assets/app.js',
    output: {
        path: path.join(__dirname, 'src', 'static', 'js')
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};