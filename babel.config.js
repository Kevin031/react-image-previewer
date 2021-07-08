module.exports = function (api) {
  api.cache(true)

  const presets = [
    ['@babel/preset-typescript', { development: true }],
    '@babel/preset-react'
  ]
  const plugins = []

  return {
    presets,
    plugins
  }
}
