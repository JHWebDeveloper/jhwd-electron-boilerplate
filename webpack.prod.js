const path = require('path')
const nodeExternals = require('webpack-node-externals')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const common = {
	mode: 'production',
	module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  node: {
    __dirname: false
  }
}

const mainConfig = {
	...common,
  entry: path.join(__dirname, 'src', 'main'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'main.js'
  },
  target: 'electron-main',
  externals: [nodeExternals()]
}

const preloadConfig = {
	...common,
	entry: path.join(__dirname, 'src', 'main', 'preload', 'preload.js'),
	output: {
    path: path.join(__dirname, 'build'),
    filename: 'preload.js'
	},
	target: 'electron-preload',
  externals: [nodeExternals()]
}

const rendererConfig = {
  ...common,
  entry: {
    index: path.join(__dirname, 'src', 'renderer', 'index.js')
  },
  output: {
    path: path.join(__dirname, 'build', 'renderer'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  target: 'web',
  module: {
    rules: [
			...common.module.rules,
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
									postcssPresetEnv({ stage: 0 }),
									cssnano({
										preset: ['default', { calc: false }]
									})
								]
							}
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join('assets', 'css', '[name].min.css')
    }),
    new HTMLWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: path.join('src', 'renderer', 'index.html')
    })
  ]
}

module.exports = [
	mainConfig,
	preloadConfig,
  rendererConfig
]
