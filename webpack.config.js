module.exports = {
    entry: './src/snow.ts',
    output: {
        filename: 'snow.js',
        path: __dirname
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
};
