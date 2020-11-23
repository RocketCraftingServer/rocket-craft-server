
<template>
  <div ref="loginContainer" class="myStyle">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <md-menu>
      <md-button class="md-primary md-raised" md-menu-trigger>Testing</md-button>
      <md-menu-content>
        <md-menu-item>
           <md-button @click="showPostDialogClick()" class="md-primary md-raised" md-menu-trigger>POST</md-button>
        </md-menu-item>
        <md-menu-item>
          <md-button @click="showPostDialogClick()" class="md-primary md-raised" md-menu-trigger>GET</md-button>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    
    <md-dialog :md-active.sync="showPostDialog">
      <md-dialog-title>Administrator developing panel</md-dialog-title>
      <md-tabs md-dynamic-height>

        <md-tab md-label="POST">
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

        <md-tab md-label="GET">
          <md-content class="md-scrollbar" style="text-align:center;" >
            <h3> GET </h3>
            <br>
            <h4>Get function call </h4>
          </md-content>
        </md-tab>

        <md-tab md-label="ROUTE - CALLS">
          <md-content class="md-scrollbar" v-bind:style="optionsStyle">
            <img style="width:200px;margin: -5px -5px -5px -5px;" src="/assets/vule-logo1.png" />
            <h3> Project name: rocket-craft-server service</h3>
            <p>This project is open source :</p>
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
  import IRocketLogin from './IRocketLogin'

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
  export default class RocketLogin extends CompProps implements IRocketLogin{

    private showPostDialog: boolean = false

    public optionsStyle = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingBottom: '10px',
      itemsAlign: 'left',
      height: 'auto',
      border: '4px double #fCfEAf',
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
          useremail: 'zlatnaspirala@gmail.com',
          username: "nikola",
          password: "123123123"
        }
      }
    }

    async runApiCallByActionName(apiCallFlag) {
  
      const rawResponse = await fetch(this.$props.domain + this.$props.prefix + '/' +  apiCallFlag, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: "Nikola Lukic", password: '123456'})
      });
      const content = await rawResponse.json();
      console.log(content);

    }
    
    googleApiLogin(): void {
       this.$root.$emit('googleApiLoginEvent', { start: 'start googleApiLoginEvent' })
    }

    mounted (): void {

    }

    public showPostDialogClick() {

      this.showPostDialog = true

    }

  }
</script>
