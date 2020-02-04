module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  // filenameHashing: true,
  productionSourceMap: false, // 编译后产不产生map文件
  devServer: {
    host: '0.0.0.0',
    hotOnly: false,
    disableHostCheck: true,
    // historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
    },
  },
}
