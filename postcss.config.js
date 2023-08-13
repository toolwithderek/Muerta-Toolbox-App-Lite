/* eslint global-require: off, import/no-extraneous-dependencies: off */

module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
  module: {
    rules: [
      // ... other rules ...
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
      },
    ],
  },
};
