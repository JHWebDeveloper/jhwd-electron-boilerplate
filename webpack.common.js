const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const postcssPseudoIs = require('postcss-pseudo-is')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		'react-vendors': ['react', 'react-dom', 'prop-types'],
    index: {
			import: path.resolve('src', 'renderer'),
			dependOn: 'react-vendors'
		}
  },
  output: {
    path: path.resolve('build', 'renderer'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
        	MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
							postcssOptions: {
								plugins: [
									postcssPseudoIs(),
									postcssPresetEnv({ stage: 0 })
								]
							}
            }
          }
        ]
      }
    ]
	},
	resolve: {
		alias: {
			actions: path.resolve('src', 'renderer', 'actions'),
			css: path.resolve('src', 'renderer', 'css'),
			store: path.resolve('src', 'renderer', 'store')
		}
	},
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join('assets', 'css', '[name].min.css')
    }),
    new HTMLWebpackPlugin({
			chunks: ['index', 'react-vendors'],
			publicPath: '.',
      filename: 'index.html',
      template: path.resolve('src', 'renderer', 'index.html')
    })
  ]
}