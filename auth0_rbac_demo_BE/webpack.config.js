import path from "path";

const config = {
  entry: "./src/index.js",
  mode: "development",
  target: "node",
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /\.(js|jsx)$/i,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    fallback: {
      "path": false,
      "zlib": false,
      "assert": false,
      "crypto": false,
      "stream": false,
      "os": false,
      "http": false
    }
  },
  output: {
    path: path.resolve("./dist")
  },
  plugins: [],
  externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore']
};

export default config;