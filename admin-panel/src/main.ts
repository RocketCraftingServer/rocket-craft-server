import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { API } from './my-common/literal'
Vue.config.productionTip = false
Vue.prototype.window = window

/**
 * @description for Application main instance.
 * 
 * @property AppPropVersion @default '0.1.0',
 * @property AppDomainHost  @default 'https://localhost:30100/'
 * 
 * In Application i defined AppDomainHost property
 * For testing proporse we can use vue serve on
 * http://localhost:3000/ address but also we can
 * use it on http://localhost:30100/ hosted by 
 * our `node server.js localhost nidza`
 */

var Application = new Vue({
  store,
  render: h => h(App, {
    props: {
      AppPropVersion: '0.1.0',
      AppDomainHost: API.constructDomain()
    }
  }),
}).$mount('#app')
