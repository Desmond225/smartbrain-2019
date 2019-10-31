
module.exports = {
    mode: "development",
    watch: true,
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
    },
    resolve: {
      extensions: [".ts", ".jsx", ".js", ".json"]
    },
    devtool: "source-map",
    module: {
      rules: [
        { test: /\.css$/, use: [ "style-loader", "css-loader" ] },
        { test: /\.scss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
        { test: /\.jsx?$/, loader: "babel-loader" },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        {
          test: /\.(jpe?g|png|gif|svg)$/i, 
          loader: "file-loader?name=/public/icons/[name].[ext]"
      }
        
      ]
    }
  };