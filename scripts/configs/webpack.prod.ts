import { merge } from 'webpack-merge'
import commonConfig from './webpack.common'
import { HotModuleReplacementPlugin } from 'webpack' 

const devConfig = merge(commonConfig, {
  mode: 'production',
  plugins: [
  ]
})

export default devConfig
