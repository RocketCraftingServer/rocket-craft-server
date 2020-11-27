
import Vue from 'vue'
import Vuex from 'vuex'

interface ApplicationStateI {
  permission: Object
}

Vue.use(Vuex)

/**
 * @description 
 * Administrator for rocket API
 */
const state = {
  permission: {
    optimal: true
    // read: "https://www.googleapis.com/auth/youtube.readonly",
    // write: "https://www.googleapis.com/auth/youtube.force-ssl"
  }
}

const mutations = {
  cookieAccept(state: ApplicationStateI, { items }) {
    console.log("Application instance store call cookieAccept method.", items)
    state.permission = items
  }
}

export default new Vuex.Store({
  state,
  mutations
})

