const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    root: path.resolve(__dirname, '..'),
    nodeModules: path.resolve(__dirname, '../node_modules'),
    src: path.resolve(__dirname, '../src'),
    //dist: path.resolve(__dirname, '../../dist'),
    dist: path.resolve(__dirname, '../dist'),
    styles: path.resolve(__dirname, '../src/styles'),
    images: path.resolve(__dirname, '../src/images')
};

const DEV_SERVER = {
    historyApiFallback: true,
    overlay: true,
    hot: true,
    hotOnly: true,
    port: 8080, //should match ./config/sfdc-cors-enable
    proxy: {
        '/api/**': {
            target: 'http://localhost:5000/',
            secure: false,
        }
    }
};

module.exports = (env = {}) => {
    //entry: { main: "../src/index.tsx" },

    const isBuild = !!env.build;
    const isDev = !env.build;
    const isLocal = env.local;
    const isSourceMap = !!env.sourceMap || isDev;

    let GLOBAL_DEFINES = {
        'process.env': {
            NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
        }
    }
    
    return {
        mode: isDev ? 'development' : 'production',
        cache: true,
        devtool: isDev ? 'eval-source-map' : 'source-map',
        devServer: DEV_SERVER,

        context: PATHS.root,

        entry: {
            app: [
                //'babel-polyfill',
                './src/index.tsx',
            ],
        },
        output: {
            path: PATHS.dist,
            filename: '[name].js',
            publicPath: '/',
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all"
                    }
                }
            }
        },

        resolve: {
            alias: { '@src': PATHS.src },
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            modules: ['src', 'node_modules'],
        },

        // externals: {
        // },

        module: {
            rules: [
                // typescript
                {
                    test: /\.(ts|tsx)$/,
                    include: PATHS.src,
                    use:
                        [
                            {
                                loader: 'awesome-typescript-loader',
                                options: {
                                    useBabel: true,
                                    transpileOnly: true,
                                    useTranspileModule: false,
                                    sourceMap: isSourceMap,
                                },
                            },
                        ]
                },
                // css
                {
                    test: /\.css$/,
                    include: PATHS.styles,
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" },
                    ]
                },
                // json
                {
                    test: /\.json$/,
                    include: [PATHS.src],
                    use: { loader: 'json-loader' },
                },
                // // images
                {
                   test: /\.png$/,
                   include: PATHS.images,
                   use: { loader: 'file-loader' },
                },
            ],
        },

        plugins: [
            ...(isDev ? [
                new DashboardPlugin(),
                new webpack.NamedModulesPlugin(),
                new webpack.DefinePlugin(GLOBAL_DEFINES),
            ] : []),
            ...(isBuild ? [
                new webpack.DefinePlugin(GLOBAL_DEFINES),
                new HtmlWebpackPlugin({
                    template: './index.html',
                    inject: false,
                }),
            ] : []),
        ]
    };
    
    

    /* devServer: {
        port: 8080,
        open: true,
        proxy: {
          "/api": "http://localhost:5000"
        }
    }, */

    /* externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    } */
};
