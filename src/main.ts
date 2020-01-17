import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import config from "@/config";
import "@/scss/index.scss";

Vue.use(BootstrapVue);
Vue.use(config);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

process.env.NODE_CONFIG_DIR = __dirname + "/src/config/";
