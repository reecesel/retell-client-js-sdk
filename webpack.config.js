const path = require('path');

module.exports = {
  // The entry point for your SDK's code
  entry: './build-project/src/index.js',  // Adjust if your entry file is different

  // Output configuration
  output: {
    filename: '[name].js',  // This will generate separate files for each entry point
    path: path.resolve(__dirname, 'dist'),  // The directory to output the bundled files
    library: 'RetellClient',  // This makes the SDK accessible as a global variable (optional)
    libraryTarget: 'umd',  // Ensures compatibility with various module systems (UMD, CommonJS, etc.)
  },

  // Module resolution rules
  module: {
    rules: [
      {
        test: /\.js$/,  // Apply to all JS files
        exclude: /node_modules/,  // Don't transpile node_modules
        use: {
          loader: 'babel-loader',  // Use Babel to transpile JS (if needed)
          options: {
            presets: ['@babel/preset-env'],  // Transpile ES6+ code to ES5
          },
        },
      },
    ],
  },

  // Plugins for additional functionality (like minification)
  optimization: {
    minimize: true,  // This will minify the output
    splitChunks: {
      chunks: 'all',  // Split code into smaller chunks (useful for large SDKs)
    },
  },

  // Multiple configurations for both full and minified versions
  // Entry points for different builds
  mode: 'production',  // Ensure production mode for optimization and minification
  target: 'web',  // Ensure the output is suitable for the browser

  // Additional output for a minified version
  // To create a non-minified and minified version
  configurations: [
    {
      // Full version (non-minified)
      output: {
        filename: 'retell-client.js',  // Full version name
      },
    },
    {
      // Minified version
      output: {
        filename: 'retell-client.min.js',  // Minified version name
      },
      optimization: {
        minimize: true,  // Minification for production
      },
    },
  ],
};
