const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

let htmlPageNames = ['options','popup'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/html/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});

module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            return {
                ...webpackConfig,
                entry: {
                    main: [env === 'development' &&
                    require.resolve('react-dev-utils/webpackHotDevClient'),paths.appIndexJs].filter(Boolean),
                    content: './src/chrome/content.ts',
                    background: './src/chrome/background.ts',
                    popup:'./src/chrome/popup.tsx',
                    //options: './src/chrome/options.tsx'
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                },
                plugins: [
                        new webpack.ProvidePlugin({
                            $: "jquery",
                            jQuery: "jquery"
                        }),
                        new HtmlWebpackPlugin({
                            template: "./src/html/index.html",
                            filename: "index.html"
                        },
                        ),
                        new MiniCssExtractPlugin()
                ].concat(multipleHtmlPlugins),

            }
        },
    }
}
