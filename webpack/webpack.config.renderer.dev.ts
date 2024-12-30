import 'webpack-dev-server'
import path from 'node:path'
import { spawn } from 'node:child_process'
import webpack, { Configuration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import postcssPresetEnv from 'postcss-preset-env'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { merge } from 'webpack-merge'

import common from './webpack.config.common'

process.env.PORT = process.env.PORT || '3000'

const RENDERER_PATH: string = path.resolve(__dirname, '..', 'src', 'renderer')

const config: Configuration = {
  mode: 'development',
  target: ['web', 'electron-renderer'],
  entry: {
    index: [
      `webpack-dev-server/client?http://localhost:${process.env.PORT}/build`,
      'webpack/hot/only-dev-server',
      path.join(RENDERER_PATH, 'index.tsx')
    ]
  },
  output: {
		path: path.resolve('build', 'renderer'),
		filename: '[name].bundle.js',
		publicPath: '/'
	},
  module: {
    rules: [
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
                  postcssPresetEnv({
                    stage: 0
                  })
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new MiniCssExtractPlugin({
			filename: path.join('assets', 'css', '[name].min.css')
		}),
    new HtmlWebpackPlugin({
      file: 'index.html',
      template: path.join(RENDERER_PATH, 'index.html'),
      inject: false
    })
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
  devServer: {
    port: process.env.PORT,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: {
      publicPath: '/',
    },
    setupMiddlewares(middlewares) {
      console.log('Starting preload.js builder...')

      const preloadProcess = spawn('npm', ['run', 'start:preload'], {
        shell: true,
        stdio: 'inherit',
      }).on('close', (code: number) => {
        process.exit(code)
      }).on('error', (err: Error) => {
        console.error(err)
      })

      console.log('Starting Main Process...')

      spawn('npm', ['run', 'start:main'], {
        shell: true,
        stdio: 'inherit',
      }).on('close', (code: number) => {
        preloadProcess.kill()
        process.exit(code)
      }).on('error', (err: Error) => {
        console.error(err)
      })

      return middlewares
    }
  }
}

export default merge(common, config)
