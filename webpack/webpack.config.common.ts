import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { type Configuration, EnvironmentPlugin } from 'webpack'

const config: Configuration = {
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				exclude: /nodemodules/,
				use: ['babel-loader']
			}
		]
	},
	plugins: [
		new EnvironmentPlugin({
			NODE_ENV: process.env.NODE_ENV
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		plugins: [new TsconfigPathsPlugin()]
	},
	node: {
		__dirname: false,
		__filename: false
	}
}

export default config
