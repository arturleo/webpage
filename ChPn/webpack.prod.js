const autoprefixer = require('autoprefixer');
const path = require('path');

function tryResolve_(url, sourceFilename) {
    // Put require.resolve in a try/catch to avoid node-sass failing with cryptic libsass errors
    // when the importer throws
    try {
        return require.resolve(url, {paths: [path.dirname(sourceFilename)]});
    } catch (e) {
        return '';
    }
}

function tryResolveScss(url, sourceFilename) {
    // Support omission of .scss and leading _
    const normalizedUrl = url.endsWith('.scss') ? url : `${url}.scss`;
    return tryResolve_(normalizedUrl, sourceFilename) ||
        tryResolve_(path.join(path.dirname(normalizedUrl), `_${path.basename(normalizedUrl)}`),
            sourceFilename);
}

function materialImporter(url, prev) {
    if (url.startsWith('@material')) {
        const resolved = tryResolveScss(url, prev);
        return {file: resolved || url};
    }
    return {file: url};
}


module.exports = {
    entry: ['./public/stylesheets/app.scss',
        './public/javascripts/index.js'],
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'bundle.css',
                            },
                        },
                        { loader: 'extract-loader' },
                        { loader: 'css-loader' },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer()]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                importer: materialImporter
                            },
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015'],
                        plugins: ['transform-object-assign']
                    },
                },
                {
                    test: /\.(svg|eot|woff|ttf|svg|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: "[path][name].[ext]"
                            }
                        }
                    ]
                }
            ]
        },
/*        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
        ],*/
        output: {
            // This is necessary for webpack to compile
            path: path.resolve(__dirname,'public'),
            filename: 'bundle.js',
        },
    };