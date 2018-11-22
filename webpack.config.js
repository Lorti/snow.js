module.exports = {
    entry: './src/snow.ts',
    output: {
        filename: 'snow.js',
        path: __dirname,
        library: 'snow',
        libraryExport: 'default',
        libraryTarget: 'umd'
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
