import { merge } from 'webpack-merge'
import commonConfig from './webpack.common'
import { HotModuleReplacementPlugin } from 'webpack' 
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { PROJECT_ROOT } from '../env'
import path from 'path'

const devConfig = merge(commonConfig, {
  mode: 'production',
  entry: path.resolve(PROJECT_ROOT, './src/ImagePreviewer.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(PROJECT_ROOT, './dist'),
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
})

export default devConfig
