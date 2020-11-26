
<template>
  <div ref="loginContainer" class="myStyle">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <md-menu>
      <md-button class="md-primary md-raised" md-menu-trigger>Testing</md-button>
      <md-menu-content>
        <md-menu-item>
           <md-button @click="showRegisterDialogClick()" class="md-primary md-raised" md-menu-trigger>register</md-button>
        </md-menu-item>
        <md-menu-item>
          <md-button @click="showLoginDialogClick()" class="md-primary md-raised" md-menu-trigger>login</md-button>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    
    <md-dialog :md-active.sync="showLoginDialog">
      <md-dialog-title>Route card</md-dialog-title>
      <md-tabs md-dynamic-height>

        <md-tab md-label="Login">
          <md-content class="md-scrollbar">
            <md-content v-bind:style="optionsStyle">
               <h3> /login  </h3>
              <md-field class="md-content-options">
                <label class="labelText" >User email address:</label>
                <md-input
                        @keyup.enter="runApiCallByActionName('login')"
                        v-model="defaults.useremail"
                        class="md-primary md-raised"
                        placeholder="Please enter your email"
                        maxlength="25">
                </md-input>
              </md-field>
              <md-field class="md-content-options">
                <label class="labelText" >Password:</label>
                <md-input
                        @keyup.enter="runApiCallByActionName('login')"
                        v-model="defaults.password"
                        class="md-primary md-raised"
                        placeholder="Default password:"
                        maxlength="200">
                </md-input>
              </md-field>
              <md-button @click="runApiCallByActionName('login')"> /rocket/login/ </md-button>
            </md-content>
          </md-content>
        </md-tab>
        <md-tab md-label="Route Info">
          <md-content class="md-scrollbar" v-bind:style="optionsStyle">
            <img style="width:200px;margin: -5px -5px -5px -5px;" src="/assets/vule-logo1.png" />
            <h3> Project name: rocket-craft-server service</h3>
            <p> @params { } </p>
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
              <md-button class="md-accent md-raised" 
                         @click="runApiCallByActionName('register')">
                    /rocket/register/
                    <md-icon class="fa fa-bolt md-size-3x"></md-icon>
              </md-button>
            </md-content>
              <md-content ref="responseContainer" v-bind:style="optionsStyle">
                <ul id="example-1">
                  <li v-for="item in registerResponse" :key="item.message">
                    {{ item }}
                  </li>
              </ul> 
              </md-content>   
          </md-content>
        </md-tab>

        <md-tab md-label="Route Info">
          <md-content class="md-scrollbar" v-bind:style="optionsStyle">
            <img style="width:200px;margin: -5px -5px -5px -5px;" src="/assets/vule-logo1.png" />
            <h3> rocket-craft-server service-route register</h3>
            <p> `@param useremail` </p>
            <p> `@param userpassword` </p>
          </md-content>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button color="md-primary" @click="showPostDialog = false">HIDE</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

<style lang="scss" scoped>
  .md-menu {
    margin: 1px;
  }

  .md-button {
    font-weight: 400;
  }

  .myStyle {
    width:100%;
    height: 41px;
    -webkit-box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.5);
    -moz-box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.5);
    box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.5);
  }

  .md-content {
    font-size: 110%;
    height: 500px;
  }

</style>

<script lang="ts">

  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { mdMenu,
           mdButton,
           mdIcon,
           mdContent,
           mdProgressSpinner } from 'vue-material'
  import { switchTheme } from '../../my-common/common-func'
  import IAccounts from './IAccounts'

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
      mdContent
    }
  })

  @Component
  export default class RocketAccounts extends CompProps implements IAccounts {

    private showLoginDialog: boolean = false
    private showRegisterDialog: boolean = false

    private registerResponse = {}

    public optionsStyle = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingBottom: '10px',
      itemsAlign: 'left',
      height: 'auto',
      border: '4px solid gray',
      borderRadius: '18px',
      padding : '10px',
      margin : '1px 1px 1px 1px',
    }

    constructor() {
      super()
    }

    data() {
      return {
        defaults: {
          userEmail: 'zlatnaspirala@gmail.com',
          userName: "nikola",
          userPassword: "123123123"
        },
        
      }
    }

    async runApiCallByActionName(apiCallFlag) {
  
      let route = this.$props.domain
      if (location.port == "3000") {
        route = route.replace(":3000/", ":30100/")
      }

      const args = {
        emailField: this.$data.defaults.userEmail.toString(),
        passwordField: this.$data.defaults.userPassword.toString()
      }

      const rawResponse = await fetch(route+ this.$props.prefix + '/' +  apiCallFlag, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
      });
      const content = await rawResponse.json();
      this.registerResponse = content
      console.log(content);

    }
    
    googleApiLogin(): void {
       this.$root.$emit('googleApiLoginEvent', { start: 'start googleApiLoginEvent' })
    }

    mounted (): void {

    }

    public showLoginDialogClick() {
      this.showLoginDialog = true
    }

    public showRegisterDialogClick() {
      this.showRegisterDialog = true
    }

  }
</script>
