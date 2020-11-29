
import Vue from 'vue'
import Vuex from 'vuex'

interface ApplicationStateI {
  permission: {
    optimal: boolean,
    cookieAccept: boolean
  },
  system: {
    readonly emailAddress: string
  }
}

Vue.use(Vuex)

/**
 * @description 
 * Administrator for rocket API
 */
const state = {
  permission: {
    optimal: true,
    cookieAccept: false
    // read: "https://www.googleapis.com/auth/youtube.readonly",
    // write: "https://www.googleapis.com/auth/youtube.force-ssl"
  },
  system: {
    emailAddress: 'greespiral@gmail.com'
  }
}

const mutations = {
  cookieAccept(state: ApplicationStateI, { yesOrNo }) {
    state.permission.cookieAccept = yesOrNo
    console.log("Application instance store call cookieAccept method.", yesOrNo)
  }
}

export default new Vuex.Store({
  state,
  mutations
})

