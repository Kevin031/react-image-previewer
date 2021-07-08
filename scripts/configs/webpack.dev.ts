import { merge } from 'webpack-merge'
import commonConfig from './webpack.common'
import { HotModuleReplacementPlugin } from 'webpack' 

const devConfig = merge(commonConfig, {
  mode: 'development',
  plugins: [
    new HotModuleReplacementPlugin()
  ]
})

export default devConfig
