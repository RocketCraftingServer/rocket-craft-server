
import Vue from 'vue'
import Vuex from 'vuex'

interface ApplicationStateI {
  permission: {
    optimal: boolean,
    cookieAccept: boolean
  },
  system: {
    getEmailAddress: () => string,
    hardCodeAccount: {
      getEmailAddress: () => string,
      adminAccountToken: () => string
    }
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
    getEmailAddress: () => 'greespiral@gmail.com',
    hardCodeAccount: {
      getEmailAddress: () => 'zlatnaspirala@gmail.com',
      adminAccountToken: () => '9607qk05p3k0uncp3oe9fczdldlfzlg6mhtllchugueg'
    }
  },
  appStyle: {
    themes: () => [
      'Dark',  'Orange', 'Light', 'Blue', 'Red', 'Pink', 'Purple', 'Deeppurple',
      'Indigo', 'Lightblue', 'Teal', 'Green', 'Lightgreen', 'Lime', 'Yellow',
      'Cyan', 'Deeporange', 'Brown', 'Black'
    ]
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

