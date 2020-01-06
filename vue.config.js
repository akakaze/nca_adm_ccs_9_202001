module.exports = {
  publicPath: "",

  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.electron.template",
        win: {
          icon: "src/assets/icon.ico"
        }
      }
    }
  },

  productionSourceMap: false
};
