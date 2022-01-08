
import Vue from 'vue'
import Vuex from 'vuex'

interface ApplicationStateI {
  permission: {
    optimal: boolean,
    cookieAccept: boolean,
    token: string,
    emailAddress: string
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
    cookieAccept: false,
    token: "NO-TOKEN",
    emailAddress: "zlatnaspirala@gmail.com"
    // read: "https://www.googleapis.com/auth/youtube.readonly",
    // write: "https://www.googleapis.com/auth/youtube.force-ssl"
  },
  system: {
    getEmailAddress: () => 'greespiral@gmail.com',
    hardCodeAccount: {
      getEmailAddress: () => state.permission.emailAddress,
      adminAccountToken: () => state.permission.token
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
  setNewEmailAddress(state: ApplicationStateI, { emailAddress }) {
    console.log("Application instance store call setNewToken method.", emailAddress)
    state.permission.emailAddress = emailAddress
    dispatchEvent(new CustomEvent('onNewEmailAddress', {}))
  },
  setNewToken(state: ApplicationStateI, { token }) {
    console.log("Application instance store call setNewToken method.", token)
    state.permission.token = token
    dispatchEvent(new CustomEvent('onNewToken', {}))
  },
  cookieAccept(state: ApplicationStateI, { yesOrNo }) {
    state.permission.cookieAccept = yesOrNo
    console.log("Application instance store call cookieAccept method.", yesOrNo)
  }
}

export default new Vuex.Store({
  state,
  mutations
})

