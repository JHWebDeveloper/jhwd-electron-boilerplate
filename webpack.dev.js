const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { spawn } = require('child_process')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src', 'renderer')
  },
  output: {
    path: path.join(__dirname, 'build'),
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
  ],
  devServer: {
    port: 3000,
    hot: true,
    before() {
      spawn('electron', ['babelRegister.js'], {
        cwd: path.join('src', 'main'),
        shell: true,
        env: process.env,
        stdio: 'inherit'
      }).on('close', () => process.exit(0))
        .on('error', spawnError => console.error(spawnError))
    }
  }
}
