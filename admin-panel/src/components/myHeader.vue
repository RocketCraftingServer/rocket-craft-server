
<template>
  <div ref="myHeader" class="myHeader">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <md-menu>
      <md-button class="md-primary md-raised" md-menu-trigger>MORE</md-button>
      <md-menu-content>
        <md-menu-item>
          <md-content>
            <md-chip md-disabled>RocketCraftingServer Admin page<br>
            Javascript oriented platform.<br>
            Server side based on Nodejs<br>
            Server active on http/https<br>
            host: maximumroulette.com<br>
              <a href="https://github.com/RocketCraftingServer/rocket-craft-server">Download backend/admin source</a><br>
              <br>
              <img src="assets/icons/pngs/information.png" /><br>
              <h4>Kickstart frontend project<h4><br>
              <a href="https://github.com/RocketCraftingServer/kickstart">Download web client source</a><br>
              <a href="https://github.com/zlatnaspirala/safir">Download safir source</a><br>
            </md-chip>
          </md-content>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    <md-menu md-size="big" md-align-trigger>
      <md-button class="md-primary md-raised" md-menu-trigger>
        Visibility
        <md-icon class="fa fa-rocket md-accent" />
      </md-button>
      <md-menu-content>
        <md-menu-item>
          <md-button class="md-primary md-raised" v-show='loginBtnVisibility' @click="visibilityAccountTestRoute">
            <md-icon class="fa fa-shield"></md-icon>
            Account
          </md-button>
        </md-menu-item>
        <md-menu-item>
          <md-button class="md-primary md-raised" v-show='loginBtnVisibility' @click="visibilityEmailService">
            <md-icon class="fa fa-shield"></md-icon>
            Email Service
          </md-button>
        </md-menu-item>
        <md-menu-item>
          <md-button class="md-primary md-raised" @click="visibilityUsersComponent">
            <md-icon class="fa fa-shield"></md-icon>
            Users Data Table
          </md-button>
        </md-menu-item>
        <md-menu-item>
          <md-button class="md-primary md-raised" @click="visibilityGenericComponent">
            <md-icon class="fa fa-shield"></md-icon>
            Generic Rocket [DEV]
          </md-button>
        </md-menu-item>
        <md-menu-item>
          <md-button class="md-primary md-raised" @click="visibilityProfileComponent">
            <md-icon class="fa fa-shield"></md-icon>
            Users Profile
          </md-button>
        </md-menu-item>
        <md-menu-item>
          <md-button class="md-primary md-raised" @click="visibilityLeaderboardComponent">
            <md-icon class="fa fa-shield"></md-icon>
            Leaderboards
          </md-button>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    <md-menu>
      <md-button class="md-primary md-raised" md-menu-trigger>MORE</md-button>
      <md-menu-content>
        <md-menu-item>
          <md-button class="md-primary md-raised" ref="switchThemeBtn" @click="switchTheme">
            <md-icon>T</md-icon>
            Theme {{ switchThemeBtnLabel }}
          </md-button>
        </md-menu-item>
        <md-menu-item>
           <md-button @click="showAboutDialogClick()" class="md-primary md-raised" md-menu-trigger>Donate, About and Credits</md-button>
        </md-menu-item>
      </md-menu-content>
    </md-menu>

    <md-dialog :md-active.sync="showAboutDialog">
      <md-dialog-title>Credits and About</md-dialog-title>
      <md-tabs md-dynamic-height>
        <md-tab md-label="Credits">
          <md-content class="md-scrollbar">
            <h3> Used in my project: </h3>
            <md-content v-bind:style="optionsStyle">
              <h4>Project structural/methodology </h4>
              <a target="_blank" href="https://vuejs.org/">https://vuejs.org/</a>
              This project use http/https protocol.
            </md-content>
          </md-content>
        </md-tab>

        <md-tab md-label="Donate">
          <md-content class="md-scrollbar" style="text-align:center;" >
            <h3> Thank you for using my software. </h3>
            <br>
            <div id="paypal-button-container"></div>
          </md-content>
        </md-tab>

        <md-tab md-label="About RocketCraftServer Service">
          <md-content class="md-scrollbar" v-bind:style="optionsStyle">
            <h3> Project name: Rocket Craft Server</h3>
            <md-content>Version Integrity 2023</md-content>
            <p>Integrity is based on Node.js server part and Vue clietn part for admin page</p>
            <br>
            <img style="width:200px;margin: -5px -5px -5px -5px;" src="assets/logo.png" />
            <br>

              <span>http://maximumroulette.com</span>
              <p>This project is open source:</p>
              <a target="_blank" href="https://github.com/zlatnaspirala//blob/master/LICENSE">LICENCE</a>
              <br>
              <a target="_blank" href="https://github.com/RocketCraftingServer/rocket-craft-server">Download source code</a>

          </md-content>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button color="md-primary" @click="showAboutDialog = false">HIDE</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<style lang="scss" scoped>

.mycode {
  white-space: pre-line;
}

.md-menu {
  min-height: initial;
  margin: 0;
}

.md-list-item-content {
  min-height: initial;
}

.md-button {
  min-width: 100px;
  margin: 0;
  font-weight: 300;
}

.myHeader {
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
import { switchTheme } from './../my-common/common-func'
import IHeader from './IHeader'

const CompProps = Vue.extend({
  props: {
    slogan: String,
    switchPlaceA: { type: Function }
  }
});

// Register for components
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
export default class myHeader extends CompProps implements IHeader{

  declare windowGlobal: Window | any
  declare paypal: any

  private showAboutDialog: boolean = false

  public optionsStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: '10px',
    itemsAlign: 'left',
    height: '650px'
  }

  constructor() {

    super()
    this.windowGlobal = window
    this.switchTheme = switchTheme.bind(this)

  }

  data() {
    return {
      myData: "test",
      tyfetchVisibility: true,
      loginBtnVisibility: false,
      switchThemeBtnLabel: 'Dark'
    }
  }

  switchTheme() {}

  changeTheme (themeEnu: string) {
    this.$set(this, 'switchThemeBtnLabel', themeEnu)
  }

  visibilityUsersComponent(): void {
    (this.$root.$children[0] as any).setUsersVisibility()
  }

  visibilityEmailService(): void {
    (this.$root.$children[0] as any).setEmailServiceVisibility()
  }

  visibilityAccountTestRoute(): void {
    (this.$root.$children[0] as any).setAccountVisibility()
  }

  visibilityGenericComponent(): void {
    (this.$root.$children[0] as any).setGenericComponentVisibility()
  }

  visibilityProfileComponent(): void {
    (this.$root.$children[0] as any).setUserProfileComponentVisibility()
  }
  
  visibilityLeaderboardComponent(): void {
    (this.$root.$children[0] as any).setLeaderboardComponentVisibility()
  }

  mounted (): void {

    (this.$root as any).$material.theming.theme='Dark'
    this.$set(this, 'tyfetchVisibility', false)
    this.$set(this, 'loginBtnVisibility', true)
    this.$set(this, 'switchThemeBtnLabel', 'Dark')

  }

  createPayPalDonateButton() {

    var root = this
    var myPaypal = document.createElement("script")
    myPaypal.src = "https://www.paypal.com/sdk/js?client-id=AT1RiWCQ0vlgUA7ZC0Qnvu1p_pfqrD-AIYSRw0fAweI0FBJJgt1n4yiwhdxjEwMBWxaAIUFS8Ixu1vMc&currency=USD"
    myPaypal.setAttribute("data-sdk-integration-source", "button-factory")
    document.head.appendChild(myPaypal)

    myPaypal.onload = function() {
      root.windowGlobal.paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'blue',
          layout: 'vertical',
          label: 'paypal',
        },
        createOrder: function(data, actions) {
          return actions.order.create({
              purchase_units: [{
                  amount: {
                      value: '20'
                  }
              }]
          });
      },
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
              console.warn('Transaction completed by ' + details.payer.name.given_name + '!');
          });
        }
      }).render('#paypal-button-container')
    }
  }

  public showAboutDialogClick() {
    this.showAboutDialog = true
    this.createPayPalDonateButton()
  }

}
</script>
