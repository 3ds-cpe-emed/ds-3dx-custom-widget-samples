// Imports

const path = require ("path")

const projectPackage = require ("./package.json");

const { merge } = require ("webpack-merge");

// Webpack plugins 

const { CleanWebpackPlugin } = require ( "clean-webpack-plugin");
const HtmlWebpackPlugin      = require ( "html-webpack-plugin");
// const CopyPlugin             = require ( "copy-webpack-plugin");

const { VueLoaderPlugin }    = require( "vue-loader");

const webpack = require ( "webpack");

// Definitions

const commonWebpackConfigOptions = {
    entry: ["/src/main.js"],
    output: {
        path: path.resolve( /* process.env.INIT_CWD ? */ process.cwd(), "./dist"),
        filename: "bundle.js",
        chunkFilename: "[contenthash].bundle.js"
    },
    target: "web",
    plugins: [
        new CleanWebpackPlugin(),
        // new CopyPlugin({
        //     patterns: [{ from: "./src/static", to: "static", globOptions: { ignore: ["*.md"] } }]
        // }),
        new HtmlWebpackPlugin({
            inject: false, // disable auto asset injection, preventing the bundle to be auto injected
            title: projectPackage.widgetName || "Your App",
            template: path.resolve("src", "index.html"),
            minify: false //
        }),
        new webpack.DefinePlugin({ __VUE_OPTIONS_API__: true, __VUE_PROD_DEVTOOLS__: false })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                
                exclude: [new RegExp("node_modules\\" + path.sep + "*") ],
                use: {
                    loader: "babel-loader",
                    options: {
                        /* 
                        useBuiltIns add necessary polyfill using corejs 3 
                        "usage" and not "entry" else, core-js & runtime-genetators must be in entry point
                        */
                        presets: [["@babel/preset-env", { debug: false, useBuiltIns: "usage", corejs: 3 }]]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};

const vueConfig = {
    module: {
        rules: [{ test: /\.vue$/, loader: "vue-loader" }]
    },
    plugins: [new VueLoaderPlugin()]
};

    // Production config
    const productionConfig  = 
    {   mode: "production",
        performance: { maxAssetSize: 1000000},
        optimization: {
            minimize: false //TEMP: set it to false to debug runtime issues on the web browser 
        },
    }

module.exports = [
    { name: "prod", ...merge(commonWebpackConfigOptions, productionConfig, vueConfig) }
];
