const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: '/'
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        router: () => "http://localhost:5000",
        logLevel: "debug" /*optional*/,
        historyApiFallback: true
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            "presets": [
              "@babel/preset-env",
             ["@babel/preset-react", {"runtime": "automatic"}]
          ]
      },
    },
  },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
      fs: false
    },
  },
};
