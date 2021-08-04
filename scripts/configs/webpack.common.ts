import { Configuration } from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {
  PROJECT_NAME,
  PROJECT_ROOT,
  HMR_PATH,
  __DEV__
} from '../env'

const commonConfig: Configuration = {
  context: PROJECT_ROOT,
  entry: [
    'react-hot-loader/patch',
    path.resolve(PROJECT_ROOT, './src/index.tsx')
  ],
  output: {
    publicPath: '/',
    path: path.resolve(PROJECT_ROOT, './dist'),
    filename: 'js/[name]-[chunkhash].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_ROOT, './public/index.html'),
      templateParameters: () => {
        return {
          PUBLIC_PATH: '/'
        }
      }
    })
  ]
}

// 热更新
if (__DEV__) {
  (commonConfig.entry as string[]).unshift(`webpack-hot-middleware/client?path=${HMR_PATH}`)
}

export default commonConfig