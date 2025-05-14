import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-CN";
import '@/styles/element-variables.scss';// 可自定义element主题颜色的文件
import "@/styles/index.scss";
import '@/styles/iconfont/iconfont.css'; // icon
import "@/assets/scss/index.scss";
// 引入时间格式
import moment from 'moment';
import {turnNumber} from "@/utils";

Vue.prototype.$moment = moment
Vue.prototype.turnNumber = turnNumber;
Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: "mini",
  locale,
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
