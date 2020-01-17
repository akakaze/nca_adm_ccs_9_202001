import Vue from "vue";
import ElectronStore from "electron-store";
import schema from "./schema";

declare module "vue/types/vue" {
  interface Vue {
    // Config injection
    readonly $config: ElectronStore;
  }
}

const PROP_NAME = "$config";

const config = new ElectronStore({
  schema: schema.properties
});

export default {
  install() {
    if (!Vue.prototype.hasOwnProperty(PROP_NAME)) {
      Object.defineProperty(Vue.prototype, PROP_NAME, {
        get: () => config
      });
    }
  }
};
