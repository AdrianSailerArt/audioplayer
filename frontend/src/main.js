import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import vb from "vue-babylonjs";
Vue.use(vb);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
