import { Configuration } from 'webpack'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

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
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()]
  }
}

export default config
