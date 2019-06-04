const path = require('path');
module.exports = {
    mode: "development",
    entry:"./index.js",
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js','.json']
    },
    module: {
        rules: [{
            test: /\.yaml$/,
            use: 'js-yaml-loader',
        }]
    }
};