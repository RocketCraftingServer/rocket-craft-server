import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { API } from './my-common/literal'
Vue.config.productionTip = false
Vue.prototype.window = window

/**
 * @description for Application main instance.
 * 
 * @property AppPropVersion @default '0.1.1',
 * @property AppDomainHost  @default 'https://localhost:30100/'
 *
 * API.constructMaximumroulette() Hardcoded for my own server
 * API.constructDomain() create domain by client current protocol and hostname.
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
      AppPropVersion: '0.1.2',
      AppDomainHost: API.constructMaximumroulette()
      // API.constructDomainForceHTTP()
      // API.constructDomain()
      // API.constructMaximumroulette()
    }
  }),
}).$mount('#app')
