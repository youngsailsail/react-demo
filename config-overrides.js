const rewireMobX = require('react-app-rewire-mobx');
//antd-mobile
const {injectBabelPlugin, getLoader} = require('react-app-rewired');
const pxtorem = require('postcss-pxtorem');
const fileLoaderMatcher = function (rule) {
    return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
}
const theme = require('./package.json').theme;
/* config-overrides.js */
module.exports = function override(config, env) {
    config = rewireMobX(config, env);
    //antd-mobile
    // babel-plugin-import
    config = injectBabelPlugin(['import', {
        libraryName: 'antd-mobile',
        //style: 'css',
        style: true, // use less for customized theme
    }], config);

    // customize theme
    config.module.rules[1].oneOf.unshift(
        {
            test: /\.less$/,
            use:[
                require.resolve('style-loader'),
                require.resolve('css-loader'),
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009',
                            }),
                            pxtorem({rootValue: 100, propWhiteList: []})
                        ],
                    },
                },
                {
                    loader: require.resolve('less-loader'),
                    options: {
                        // theme vars, also can use theme.js instead of this.
                        modifyVars: theme,
                        javascriptEnabled: true
                    },
                },
            ]
        }
    );

    // css-modules
    config.module.rules[1].oneOf.unshift(
        {
            test: /\.css$/,
            exclude: /node_modules|antd-mobile\.css/,
            use: [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[local]___[hash:base64:5]'
                    },
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009',
                            }),
                            pxtorem({rootValue: 100, propWhiteList: []})
                        ],
                    },
                },
            ]
        }
    );
    config.module.rules[1].oneOf.unshift(
        {
            test: /\.(css|less)$/,
            use: [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1,
                    },
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009',
                            }),
                            pxtorem({rootValue: 100, propWhiteList: []})
                        ],
                    },
                },
                {
                    loader: require.resolve('less-loader'),
                    options: {
                        javascriptEnabled: true
                    },
                },
            ],
        }
    );
    // file-loader exclude
    getLoader(config.module.rules, fileLoaderMatcher).exclude.push(/\.less$/);
    return config;
}