const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
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
									postcssPresetEnv({ stage: 0 })
								]
							}
            }
          }
        ]
      },
			{
				test: /\.(svg|woff2)$/,
				use: ['url-loader']
			}
    ]
	},
	resolve: {
		alias: {
			store: path.resolve('src', 'renderer', 'store'),
			actions: path.resolve('src', 'renderer', 'actions')
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