
<template>
  <div ref="loginContainer" class="myStyle">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <md-menu md-align-trigger>
      <md-button class="md-primary md-raised" md-menu-trigger>
        <md-icon class="fa fa-user" ></md-icon>Account</md-button>
      <md-menu-content class="md-primary md-raised" >
        <md-menu-item>
           <md-button @click="showRegisterDialogClick()" class="md-primary md-raised" md-menu-trigger>Register</md-button>
        </md-menu-item>
        <md-menu-item>
          <md-button @click="showRegisterConfirmationDialogClick()" class="md-primary md-raised" md-menu-trigger>Confirmation</md-button>
        </md-menu-item>
        <md-menu-item>
          <md-button @click="showLoginDialogClick()" class="md-primary md-raised" md-menu-trigger>Login</md-button>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    
    <md-dialog :md-active.sync="showLoginDialog">
      <md-dialog-title>Route card Login</md-dialog-title>
      <md-tabs md-dynamic-height>

        <md-tab md-label="Login">
          <md-content class="md-scrollbar">
            <md-content v-bind:style="optionsStyle">
               <h3> /login  </h3>
              <md-field class="md-content-options">
                <label class="labelText" >User email address:</label>
                <md-input
                        @keyup.enter="runApiCallByActionName('login')"
                        v-model="defaults.userEmail"
                        class="md-primary md-raised"
                        placeholder="Please enter your email"
                        maxlength="25">
                </md-input>
              </md-field>
              <md-field class="md-content-options">
                <label class="labelText" >Password:</label>
                <md-input
                        @keyup.enter="runApiCallByActionName('login')"
                        v-model="defaults.userPassword"
                        class="md-primary md-raised"
                        placeholder="Default password:"
                        maxlength="200">
                </md-input>
              </md-field>
              <md-button class="md-primary md-raised" @click="runApiCallByActionName('login')"> /rocket/login/ </md-button>
            </md-content>
              <md-content ref="responseLoginContainer" v-bind:style="optionsStyle">
                <md-chip class="md-accent">Click on value field to copy in clipboard.</md-chip>
                  <div v-for="(item) in loginResponse" :key="item.message">
                    <div v-if="typeof item != 'object'"
                          style="padding: 1px;margin: 0;display:flex;flex-direction:column" class="level1">
                          <div style="display:flex;padding: 0px;margin: 0px;">
                            <md-button class="md-accent md-raised">
                              {{ Object.keys(loginResponse)[Object.values(loginResponse).indexOf(item)] }} 
                              <md-icon class="fa fa-caret-right"></md-icon>
                            </md-button>
                            <md-button class="md-primary md-raised notexttransform" v-on:click="copyToClipboard($event)" > {{ item }} </md-button>
                          </div>
                    </div>

                    <div v-if="typeof item === 'object'" 
                         style="padding: 2px;margin: 0;height:200px;display:flex;flex-direction:column;overflow:scroll;overflow-x:hidden;" >
                      <div  v-for="(subItem, name, index) in item" :key="subItem" style="display:flex;">
                        <md-button v-if="index === 0" 
                                   class="md-accent md-raised notexttransform" 
                                   style="width:150px;padding-top:-5px;">
                          {{ Object.keys(loginResponse)[Object.values(loginResponse).indexOf(item)] }}
                          <md-icon class="fa fa-sitemap"></md-icon>
                        </md-button>
                        <p v-else class="positive" style="width:204px;" >   </p>
                        <md-button class="md-accent md-raised" style="width:150px;">
                          {{ Object.keys(item)[Object.values(item).indexOf(subItem)] }}
                          <md-icon class="fa fa-caret-right"></md-icon>
                        </md-button>
                        <md-button class="md-primary md-raised notexttransform" v-on:click="copyToClipboard($event)">
                          <img v-if="Object.keys(item)[Object.values(item).indexOf(subItem)] === 'profileImage'" v-bind:src="$props.domain + 'storage' + subItem" width="100px" />
                         <p v-else > {{ subItem }} </p>
                        </md-button>
                      </div>
                    </div>
                    <md-icon v-if="item == 'USER_ALREADY_REGISTERED'" class="fa fa-exclamation-triangle md-accent" />
                  </div>
              </md-content>
          </md-content>
        </md-tab>
        <md-tab md-label="Route Info">
          <md-content class="md-scrollbar">
            <!--img style="width:200px;margin: -5px -5px -5px -5px;" src="assets/logo.png" /-->
            <h3>Description: This is login route. </h3>
              <p>@param emailField</p>
              <p>@param passwordField</p>
            <md-content class="md-scrollbar myscroll">
              <p>Fetch[js]</p>
              <md-content class="md-raised md-primary" v-on:click="copyToClipboard($event)">
                fetch("http://maximumroulette.com/rocket/login", { <br>
                  "headers": {<br>
                    "accept": "application/json",<br>
                    "accept-language": "en-US,en;q=0.9,ru;q=0.8",<br>
                    "cache-control": "no-cache",<br>
                    "content-type": "application/json",<br>
                    "pragma": "no-cache"<br>
                  },<br>
                  "referrer": "http://maximumroulette.com/apps/my-admin/",<br>
                  "referrerPolicy": "strict-origin-when-cross-origin",<br>
                  "body": "{\"emailField\":\"zlatnaspirala@gmail.com\",\"passwordField\":\"123123123\"}",<br>
                  "method": "POST",<br>
                  "mode": "cors",<br>
                  "credentials": "omit"<br>
                });
              </md-content>
              <p>CURL</p>
              <md-content class="md-primary md-raised" v-on:click="copyToClipboard($event)">
                 curl 'http://maximumroulette.com/rocket/login' \ <br>
                  -H 'Connection: keep-alive' \ <br>
                  -H 'Pragma: no-cache' \ <br>
                  -H 'Cache-Control: no-cache' \ <br>
                  -H 'Accept: application/json' \ <br>
                  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36' \ <br>
                  -H 'Content-Type: application/json' \ <br>
                  -H 'Origin: http://maximumroulette.com' \ <br>
                  -H 'Referer: http://maximumroulette.com/apps/my-admin/' \ <br>
                  -H 'Accept-Language: en-US,en;q=0.9,ru;q=0.8' \ <br>
                  --data-raw '{"emailField":"zlatnaspirala@gmail.com","passwordField":"123123123"}' \ <br>
                  --compressed \ <br>
                  --insecure <br>
             </md-content>

              <p>Response</p>
              <md-content class="md-accent">
                <p>{"message":"User logged","rocketStatus":"USER_LOGGED",<br>
                   "flag":{<br>
                     "status":"USER_LOGGED",<br>
                     "email":"zlatnaspirala@gmail.com",<br>
                     "nickname":"barbarianHead",<br>
                     "points":2011,<br>
                     "rank":"junior",<br>
                     "token":"36toO"<br>
                     }}</p>
              </md-content>

            </md-content>
          </md-content>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button color="md-primary" @click="showLoginDialog = false">HIDE</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showRegisterDialog">
      <md-dialog-title>Route card Register </md-dialog-title>
      <md-tabs md-dynamic-height>

        <md-tab md-label="POST - Register">
          <md-content class="md-scrollbar">
            <md-content v-bind:style="optionsStyle">
               <md-button > /register  </md-button>
              <md-field class="md-content-options">
                <label class="labelText" >User email address:</label>
                <md-input
                        @keyup.enter="runApiCallByActionName('register')"
                        v-model="defaults.userEmail"
                        class="md-primary md-raised"
                        placeholder="Please enter your email"
                        maxlength="25">
                </md-input>
              </md-field>
              <md-field class="md-content-options">
                <label class="labelText" >Password:</label>
                <md-input
                        @keyup.enter="runApiCallByActionName('register')"
                        v-model="defaults.userPassword"
                        class="md-primary md-raised"
                        placeholder="Default password:"
                        maxlength="200">
                </md-input>
              </md-field>
              <md-button class="md-accent md-raised" 
                         @click="runApiCallByActionName('register')">
                    /rocket/register/
                    <md-icon class="fa fa-bolt md-size-1x"></md-icon>
              </md-button>
            </md-content>
              <md-content ref="responseContainer" v-bind:style="optionsStyle">
                <ul id="example-1">
                  <li v-for="item in registerResponse" :key="item.message">
                    {{ item }} 
                    <md-icon v-if="item == 'USER_ALREADY_REGISTERED'" 
                             class="fa fa-exclamation-triangle md-accent" />
                  </li>
                </ul> 
              </md-content>   
          </md-content>
        </md-tab>

        <md-tab md-label="Route Info">
          <md-content class="md-scrollbar">
            <!--img style="width:200px;margin: -5px -5px -5px -5px;" src="assets/logo.png" /-->
            <h3>Description: This is register route.</h3>
              <p>@param emailField</p>
              <p>@param passwordField</p>
            <md-content class="md-scrollbar myscroll">
              <p>Fetch[js]</p>
              <md-content class="md-raised md-primary" v-on:click="copyToClipboard($event)">
                fetch("http://maximumroulette.com/rocket/register", { <br>
                  "headers": {<br>
                    "accept": "application/json",<br>
                    "accept-language": "en-US,en;q=0.9,ru;q=0.8",<br>
                    "cache-control": "no-cache",<br>
                    "content-type": "application/json",<br>
                    "pragma": "no-cache"<br>
                  },<br>
                  "referrer": "http://localhost:3000/",<br>
                  "referrerPolicy": "strict-origin-when-cross-origin",<br>
                  "body": "{\"emailField\":\"zlatnaspirala@gmail.com\",\"passwordField\":\"123123123\"}",<br>
                  "method": "POST",<br>
                  "mode": "cors",<br>
                  "credentials": "omit"<br>
                });<br>
              </md-content>
              <p>CURL</p>
              <md-content class="md-primary md-raised" v-on:click="copyToClipboard($event)">
                curl 'http://maximumroulette.com/rocket/register' \<br>
                  -H 'Connection: keep-alive' \<br>
                  -H 'Pragma: no-cache' \<br>
                  -H 'Cache-Control: no-cache' \<br>
                  -H 'Accept: application/json' \<br>
                  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36' \<br>
                  -H 'Content-Type: application/json' \<br>
                  -H 'Origin: http://localhost:3000' \<br>
                  -H 'Referer: http://localhost:3000/' \<br>
                  -H 'Accept-Language: en-US,en;q=0.9,ru;q=0.8' \<br>
                  --data-raw '{"emailField":"zlatnaspirala@gmail.com","passwordField":"123123123"}' \<br>
                  --compressed \<br>
                  --insecure<br>
             </md-content>

              <p>Response</p>
              <md-content class="md-accent">
                <p>
                  {"message":"You are already registred.","rocketStatus":"USER_ALREADY_REGISTERED"}
                </p>
              </md-content>

            </md-content>
          </md-content>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button color="md-primary" @click="showRegisterDialog = false">HIDE</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showRegisterConfirmationDialog">
      <md-dialog-title>Route card Register Confirmation </md-dialog-title>
      <md-tabs md-dynamic-height>

        <md-tab md-label="POST - confirmation">
          <md-content class="md-scrollbar">
            <md-content v-bind:style="optionsStyle">
               <md-button > /confirmation  </md-button>
              <md-field class="md-content-options">
                <label class="labelText" >User email address:</label>
                <md-input
                        @keyup.enter="runApiConfirmation()"
                        v-model="defaults.userEmail"
                        class="md-primary md-raised"
                        placeholder="Please enter your email"
                        maxlength="25">
                </md-input>
              </md-field>
              <md-field class="md-content-options">
                <label class="labelText" >Password:</label>
                <md-input
                        @keyup.enter="runApiConfirmation()"
                        v-model="defaults.userEmailConfirmation"
                        class="md-primary md-raised"
                        placeholder="Access TOKEN:"
                        maxlength="200">
                </md-input>
              </md-field>
              <md-button class="md-accent md-raised" 
                         @click="runApiConfirmation()">
                    /rocket/confirmation/
                    <md-icon class="fa fa-bolt md-size-1x"></md-icon>
              </md-button>
            </md-content>
              <md-content ref="responseContainerConfirmation" v-bind:style="optionsStyle">
                <ul id="firstViewResponseDOM">
                  <li v-for="item in confirmationResponse" :key="item.message">
                    {{ item }}
                  </li>
              </ul> 
              </md-content>   
          </md-content>
        </md-tab>

        <md-tab md-label="Route Info">
          <md-content class="md-scrollbar">
            <!--img style="width:200px;margin: -5px -5px -5px -5px;" src="assets/logo.png" /-->
            <h3>Description: This is register confirmation route.</h3>
              <p>@param emailField</p>
              <p>@param passwordField</p>
            <md-content class="md-scrollbar myscroll">
              <p>Fetch[js]</p>
              <md-content class="md-raised md-primary" v-on:click="copyToClipboard($event)">
                fetch("http://maximumroulette.com/rocket/confirmation", {<br>
                  "headers": {<br>
                    "accept": "application/json",<br>
                    "accept-language": "en-US,en;q=0.9,ru;q=0.8",<br>
                    "cache-control": "no-cache",<br>
                    "content-type": "application/json",<br>
                    "pragma": "no-cache"<br>
                  },<br>
                  "referrer": "http://localhost:3000/",<br>
                  "referrerPolicy": "strict-origin-when-cross-origin",<br>
                  "body": "{\"emailField\":\"zlatnaspirala@gmail\",\"tokenField\":\"\"}",<br>
                  "method": "POST",<br>
                  "mode": "cors",<br>
                  "credentials": "omit"<br>
                });<br>
              </md-content>
              <p>CURL</p>
              <md-content class="md-primary md-raised" v-on:click="copyToClipboard($event)">
                curl 'http://maximumroulette.com/rocket/confirmation' \<br>
                  -H 'Connection: keep-alive' \<br>
                  -H 'Pragma: no-cache' \<br>
                  -H 'Cache-Control: no-cache' \<br>
                  -H 'Accept: application/json' \<br>
                  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36' \<br>
                  -H 'Content-Type: application/json' \<br>
                  -H 'Origin: http://localhost:3000' \<br>
                  -H 'Referer: http://localhost:3000/' \<br>
                  -H 'Accept-Language: en-US,en;q=0.9,ru;q=0.8' \<br>
                  --data-raw '{"emailField":"zlatnaspirala@gmail","tokenField":""}' \<br>
                  --compressed \<br>
                  --insecure<br>
             </md-content>

              <p>Response</p>
              <md-content class="md-accent">
                <p>
                  {"message":"Wrong confirmation code.","rocketStatus":"USER_NOT_CONFIRMED"}
                </p>
              </md-content>

            </md-content>
          </md-content>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button color="md-primary" @click="showRegisterConfirmationDialog = false">HIDE</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

<style lang="scss" scoped>

  .myscroll {
    height: calc(50vh) !important;
    overflow: auto;
  }

  .mycode {
    white-space: pre-line;
  }

  .md-menu {
    margin: 1px;
  }

  .md-button {
    min-width: 200px;
    font-weight: 400;
  }

  .myStyle {
    width:100%;
    height: 37px;
    -webkit-box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.5);
    -moz-box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.5);
    box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.5);
  }

  .md-content {
    font-size: 110%;
    height: fit-content;
  }

  .positive {
    padding: 1px;
    margin: 1px;
    color: rgb(255, 230, 163) !important;
    text-shadow: 0 0 1px #fffb12;
    -webkit-border-radius: 3px 3px 3px 3px;
    border-radius: 3px 3px 3px 3px;
  }
</style>

<script lang="ts">

  import { API } from "../../my-common/literal"
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { mdMenu,
           MdList,
           mdButton,
           mdIcon,
           mdChip,
           mdContent,
           mdTextArea,
           mdProgressSpinner } from 'vue-material'
  import { copyToClipboard, switchTheme } from '../../my-common/common-func'
  import IAccounts from './IAccounts'
import store from "../../store"

  const CompProps = Vue.extend({
    props: {
      slogan: String,
      prefix: String,
      domain: String
    }
  });

  @Component({
    components: {
      mdButton,
      mdMenu,
      mdIcon,
      mdProgressSpinner,
      mdContent,
      MdList,
      mdTextArea,
      mdChip
    }
  })

  @Component
  export default class RocketAccounts extends CompProps implements IAccounts {

    private showLoginDialog: boolean = false
    private showRegisterDialog: boolean = false
    private showRegisterConfirmationDialog: boolean = false

    private registerResponse = {}
    private confirmationResponse = {}
    private loginResponse = {}

    public optionsStyle = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingBottom: '10px',
      itemsAlign: 'left',
      height: 'auto',
      border: '1px solid gray',
      borderRadius: '2px',
      padding : '5px',
      margin : '1px 1px 1px 1px',
      overflow: 'auto'
    }

    public flexImgStyle = {
      display: 'flex',
      flexDirection: 'row',
      backgroundImage: 'url("assets/logo.png")',
      width: '100%',
      paddingBottom: '10px',
      itemsAlign: 'left',
      height: 'auto',
      border: '1px solid gray',
      borderRadius: '2px',
      padding : '10px',
      margin : '1px 1px 1px 1px',
    }

    public copyToClipboard;

    constructor() {
      super()

      this.copyToClipboard = copyToClipboard.bind(this)
    }

    public setNewEmailAddress() {
      console.log(">>>", this.$data.defaults.userEmail )
      store.commit("setNewEmailAddress", { emailAddress: this.$data.defaults.userEmail })
    }

    data() {
      return {
        defaults: {
          userEmail: 'zlatnaspirala@gmail.com',
          userName: "nikola",
          userPassword: "12345678",
          userEmailConfirmation: ""
        },
        
      }
    }

    async runApiCallByActionName(apiCallFlag) {

      let route = this.$props.domain; // 'http://localhost/'

      const args = {
        emailField: this.$data.defaults.userEmail.toString(),
        passwordField: this.$data.defaults.userPassword.toString()
      }

      const rawResponse = await fetch(route+ this.$props.prefix + '/' +  apiCallFlag, {
        method: 'POST',
        headers: API.JSON_HEADER,
        body: JSON.stringify(args)
      })

      this[apiCallFlag + 'Response'] = await rawResponse.json();
      // this.registerResponse = await rawResponse.json();

      this.setNewEmailAddress();
    }

    async runApiConfirmation() {

      let route = this.$props.domain

      const args = {
        emailField: this.$data.defaults.userEmail,
        tokenField: this.$data.defaults.userEmailConfirmation,
      }

      const rawResponse = await fetch(route+ this.$props.prefix + '/confirmation', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
      });
      const content = await rawResponse.json();
      this.confirmationResponse = content

      this.setNewEmailAddress();
      console.log(content);

    }

    async runApiLogin() {

      let route = this.$props.domain

      const args = {
        emailField: this.$data.defaults.userEmail,
        passwordField: this.$data.defaults.user,
      }

      const rawResponse = await fetch(route+ this.$props.prefix + '/confirmation', {
        method: 'POST',
        headers: API.JSON_HEADER,
        body: JSON.stringify(args)
      });
      const content = await rawResponse.json();
      this.confirmationResponse = content
      console.log(content);

      this.setNewEmailAddress();
    }

    mounted (): void {
      console.log("Account component created.")
    }

    public showLoginDialogClick() {
      this.showLoginDialog = true
    }

    public showRegisterDialogClick() {
      this.showRegisterDialog = true
    }

    public showRegisterConfirmationDialogClick() {
      this.showRegisterConfirmationDialog = true
    }

  }
</script>
