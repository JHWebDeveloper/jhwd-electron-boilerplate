import path from 'node:path'
import webpack, { Configuration } from 'webpack'
import { merge } from 'webpack-merge'

import common from './webpack.config.common'

const MAIN_PATH: string = path.resolve(__dirname, '..', 'src', 'main')

const config: Configuration = {
  mode: 'development',
  target: 'electron-preload',
  entry: path.join(MAIN_PATH, 'preload.ts'),
  output: {
    path: path.resolve('build'),
    filename: 'preload.js'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
  watch: true
}

export default merge(common, config)
