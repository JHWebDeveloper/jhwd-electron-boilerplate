const { merge } = require('webpack-merge')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const commonRenderer = require('./webpack.common')

const commonMain = {
	mode: 'production',
	module: {
    rules: [
      commonRenderer.module.rules[0] //.js
    ]
	},
	externals: [nodeExternals()],
  node: {
    __dirname: false
  }
}

const mainConfig = merge(commonMain, {
  entry: path.join(__dirname, 'src', 'main'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'main.js'
  },
  target: 'electron-main',
})

const preloadConfig = merge(commonMain, {
	entry: path.join(__dirname, 'src', 'main', 'preload', 'preload.js'),
	output: {
    path: path.join(__dirname, 'build'),
    filename: 'preload.js'
	},
	target: 'electron-preload',
})

const rendererConfig = merge(commonRenderer, {
	mode: 'production',
  plugins: [
		new CssMinimizerPlugin({
			minimizerOptions: {
				preset: ['default', { calc: false }]
			}
		})
  ]
})

module.exports = [
	mainConfig,
	preloadConfig,
  rendererConfig
]
