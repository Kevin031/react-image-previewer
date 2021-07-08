import chalk from 'chalk'
import express, { Express } from 'express'
import { HOST, DEFAULT_PORT, HMR_PATH } from './env'
import webpack, { Compiler } from 'webpack'
import devConfig from './configs/webpack.dev'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const address = `http://${HOST}:${DEFAULT_PORT}`

function setupMiddlewares (compiler: Compiler, server: Express) {
  const devMiddlewareOptions: webpackDevMiddleware.Options = {
    // 保持和webpack中配置一致
    publicPath: '/',
    // 只在发生错误或有新的编译时输出
    stats: 'minimal',
    // 需要输出文件到磁盘可以开启
    writeToDisk: true
  }
  server.use(webpackDevMiddleware(compiler, devMiddlewareOptions))
  
  const hotMiddlewareOptions: webpackHotMiddleware.ClientOptions = {
    // sse路由
    path: HMR_PATH,
    // 编译出错会在网页中显示出错信息遮罩
    overlay: true,
    // webpack卡主自动刷新页面
    reload: true
  }
  server.use(webpackHotMiddleware(compiler, hotMiddlewareOptions))
}

async function start () {
  const compiler = webpack(devConfig)
  const devServer = express()
  setupMiddlewares(compiler, devServer)

  const httpServer = devServer.listen(DEFAULT_PORT, HOST, () => {
    console.log(
      `DevServer is running at ${chalk.magenta.underline(address)}`
    )
  })
}

if (require.main === module) {
  start()
}