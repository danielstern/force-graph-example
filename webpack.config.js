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
        rules: []
    }
};