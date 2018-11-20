const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const publicPath = 'dist';

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: `${__dirname}/${publicPath}`,
};

/**
 * COMMON CONFIG
 */
const commonConfig = merge([
  {
    entry: {
      app: './src/main.js',
    },

    output: {
      path: PATHS.build,
      filename: '[name].[contenthash].js',
    },
  },
  parts.loadHtml(),
]);

/**
 * PRODUCTION CONFIG
 */
const productionConfig = merge([
  parts.clean(PATHS.build),
  parts.loadJavaScript({ include: __dirname + '/', exclude: /node_modules/ }),
  parts.loadProdCSS(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true
    }
  }),
]);

/**
 * DEVELOPMENT CONFIG
 */
const developmentConfig = merge([
  parts.loadJavaScript({ include: __dirname + '/', exclude: /node_modules/ }),
  parts.devServer({
    // Customize host/port here if needed, like `PORT=3000 npm start`
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadDevCSS(),
  parts.generateSourceMaps(),
]);

/**
 * EXPORT
 */
module.exports = mode => {

  if (mode === 'production') {
      return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
}