<template>
  <div ref="emailService" class="myStyle">

    <md-menu>
      <md-button class="md-primary md-raised" md-menu-trigger>SYSTEM</md-button>
      <md-menu-content>
        <md-menu-item>
          <md-button class="md-primary md-raised" ref="switchThemeBtn" @click="visibility = !visibility">
            <md-icon class="fa fa-email md-size-1x" ></md-icon>
            EmailService
          </md-button>
        </md-menu-item>
      </md-menu-content>
    </md-menu>

    <md-dialog :md-active.sync="visibility">
      <md-dialog-title>Email service</md-dialog-title>
      <md-tabs md-dynamic-height>

        <md-tab md-label="System Email Address">
          <md-content class="md-scrollbar">
            <md-content v-bind:style="optionsStyle">
               <h3> GMail Service </h3>
              <md-button class="disabled" style="align-self: flex-start;" >
                <label class="labelText text-align:left" >System email address: {{ this.$props.slogan }}</label>
              </md-button>
              <h3>
              To edit this variable go to config.js [READONLY]
              </h3>
            </md-content>
          </md-content>
        </md-tab>
        <md-tab md-label="Test email service">
          <md-content class="md-scrollbar" v-bind:style="optionsStyle">
            <img style="width:100px;margin: 5px 5px 5px 5px;" src="/assets/images/rocket-image-1.png" />
              <label>Send email to : </label>
              <md-field class="md-content-options">
                <label class="labelText" >address:</label>
                <md-input
                        class="md-primary md-raised"
                        placeholder="Default email:"
                        maxlength="100">
                </md-input>
              </md-field>
            <md-field>
              <md-textarea> TEXT TEXT </md-textarea>
            </md-field>
            <md-button class="md-primary md-raised" @click="testEmailService()"> Test service </md-button>
          </md-content>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button color="md-primary md-raised" @click="visibility = false">HIDE</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>


<style lang="scss" scoped>
  .md-menu {
    margin: 1px;
  }

  .md-button {
    min-width: 200px;
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

import { API } from "../../my-common/literal"
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
    prefix: String
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
export default class EmailService extends CompProps {

  private visibility = false
  
  public optionsStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: '10px',
    itemsAlign: 'left',
    height: 'auto',
    border: '1px solid gray',
    borderRadius: '2px',
    padding : '10px',
    margin : '1px 1px 1px 1px',
  }

  constructor() {
    super()
  }

  mounted(): void {
    console.log('Email Service.')
  }
 
  data() {
    return {
      defaults: {
        systemEmail: 'greespiral@gmail.com',
        systemEmailName: "greespiral",
        systemEmailPassword: "123123123",
      },
        
    }
  }

  testEmailService() {
    console.log("Test email service.")
  }
}
</script>
