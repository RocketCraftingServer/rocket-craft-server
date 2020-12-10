
<template>
  <div ref="profileRef" class="myStyle">
    <md-menu>
      <md-button class="md-primary md-raised" ref="switchThemeBtn" @click="showProfileDialog = !showProfileDialog">
        <md-icon class="fa fa-user" ></md-icon>
        Get Profile
      </md-button>
    </md-menu>

    <md-dialog :md-active.sync="showProfileDialog">
      <md-dialog-title>Route card Profile</md-dialog-title>
      <md-tabs md-dynamic-height>

        <md-tab md-label="Profile">
          <md-content class="md-scrollbar">
            <md-content v-bind:style="optionsStyle">
               <h3> /profile  </h3>
              <md-field class="md-content-options">
                <label class="labelText" >User email address:</label>
                <md-input
                        @keyup.enter="runProfileCall('profile')"
                        v-model="system.emailAddress"
                        class="md-primary md-raised"
                        placeholder="Please enter your email"
                        maxlength="25">
                </md-input>
              </md-field>
              <md-field class="md-content-options">
                <label class="labelText" >Password:</label>
                <md-input
                        @keyup.enter="runProfileCall('profile')"
                        v-model="system.adminAccountToken"
                        class="md-primary md-raised"
                        placeholder="Default password:"
                        maxlength="200">
                </md-input>
              </md-field>
              <md-button class="md-primary md-raised" @click="runProfileCall('profile')"> /rocket/profile/ </md-button>
            </md-content>
              <md-content ref="responseLoginContainer" v-bind:style="optionsStyle">
                  <div v-for="(item) in profileResponse" :key="item.message">

                    <div v-if="typeof item != 'object'"
                          style="padding: 1px;margin: 0;display:flex;flex-direction:column" class="level1">
                          <div style="display:flex;padding: 0px;margin: 0px;">
                            <md-button class="md-accent md-raised">
                              {{ Object.keys(profileResponse)[Object.values(profileResponse).indexOf(item)] }} 
                              <md-icon class="fa fa-caret-right"></md-icon>
                            </md-button>
                            <md-button class="md-primary md-raised" v-on:click="copyToClipboard($event)" > {{ item }} </md-button>
                          </div>
                    </div>

                    <div v-if="typeof item === 'object'" 
                         style="padding: 2px;margin: 0;height:200px;display:flex;flex-direction:column;overflow:scroll;overflow-x:hidden;" >
                      <div  v-for="(subItem, name, index) in item" :key="index" style="display:flex;">
                        <md-button v-if="index === 0" 
                                   class="md-accent md-raised" 
                                   style="width:150px;padding-top:-5px;">
                          {{ Object.keys(profileResponse)[Object.values(profileResponse).indexOf(item)] }}
                          <md-icon class="fa fa-sitemap"></md-icon>
                        </md-button>
                        <p v-else class="positive" style="width:204px;" >   </p>
                        <md-button class="md-accent md-raised" style="width:150px;">
                          {{ Object.keys(item)[Object.values(item).indexOf(subItem)] }}
                          <md-icon class="fa fa-caret-right"></md-icon>
                        </md-button>
                        <md-button class="md-primary md-raised" v-on:click="copyToClipboard($event)">{{ subItem }}</md-button>
                      </div>
                    </div>
   
                    <md-icon v-if="item == 'USER_ALREADY_REGISTERED'" 
                             class="fa fa-exclamation-triangle md-accent" />
                  </div>
                
              </md-content>   
          </md-content>
        </md-tab>
        <md-tab md-label="Route Info">
          <md-content class="md-scrollbar">
            <md-content class="md-scrollbar backgroundRocketLand" v-bind:style="optionsStyle">
              <img style="width:200px;margin: -5px -5px -5px -5px;" src="/assets/images/rocket-image-land.jpg" />
            </md-content>
            <md-content class="md-scrollbar" v-bind:style="optionsStyle">
              <h3> Project name: rocket-craft-server service</h3>
              <p> @params { useremail } </p>
            </md-content>
          </md-content>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button color="md-primary" @click="showProfileDialog = false">HIDE</md-button>
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
    height: 100%;
    -webkit-box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.5);
    -moz-box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.5);
    box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.5);
  }

  .md-content {
    font-size: 110%;
    height: fit-content;
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
import { copyToClipboard, setupLocal, switchTheme } from '../../my-common/common-func'

// Interface
// import IAccounts from './IAccounts'

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
export default class userRocketProfile extends CompProps {

  private visibility = true
  
  public showProfileDialog = false

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

  private copyToClipboard;

  constructor() {
    super()
 
    this.copyToClipboard = copyToClipboard.bind(this)
  }

  mounted(): void {
    console.log('Users Service.')
  }

  async runApiUsers() {

    console.log("TEST ROUTE ")
    let route = this.$props.domain
    route = setupLocal(route)

    const args = {
      email: this.$data.system.emailAddress,
      token: this.$data.system.adminAccountToken
    }

    const rawResponse = await fetch(route+ this.$props.prefix + '/profile' , {
      method: 'POST',
      headers: API.JSON_HEADER,
      body: JSON.stringify(args)
    });

    var r =  await rawResponse.json() 
     this.$data.profileResponse = r.user
    console.log("GOOOD")
   // this.setUsersPage('new-buffer-data')
  
  }

      async runProfileCall() {
  
      let route = this.$props.domain
      route = setupLocal(route)

      const args = {
        email: this.$data.system.emailAddress.toString(),
        token: this.$data.system.adminAccountToken.toString()
      }

      const rawResponse = await fetch(route+ this.$props.prefix + '/profile' , {
        method: 'POST',
        headers: API.JSON_HEADER,
        body: JSON.stringify(args)
      });

       this.$data.profileResponse = await rawResponse.json();
      // this.registerResponse = await rawResponse.json();
      
    }


  newUser() {
    console.log("test")
  }

  data() {
    return {
      system: {
        emailAddress: this.$store.state.system.hardCodeAccount.getEmailAddress(),
        adminAccountToken: this.$store.state.system.hardCodeAccount.adminAccountToken()
      },
      profileResponse: [],
    }
  }
  
  setUsersPage(arg: string) {

    if (!arg) {
      console.error("You need to pass arg with type of `string` for Users.setUsersPage.")
    }
    console.log(" arg =>  ", arg)
    var currentPage = 0
    
    if (arg === "next") {
      this.$data.usersPaginatorIndex++         
    } else if (arg === "prev") {
      if (this.$data.usersPaginatorIndex == 1) {
        return;
      }
      this.$data.usersPaginatorIndex--
    } else if (arg === "new-buffer-data") {
       this.$data.usersPaginatorIndex = 1;
       
    }
    
    currentPage = this.$data.usersPaginatorIndex

    // currentPage
    this.$data.usersCurrentPage = this.$data.profileResponse
    
  }

  searchOnTable () {
    // this.$data.table.searched = this.searchByName(this.$data.profileResponse , this.$data.table.search)
    // this.$data.usersCurrentPage = this.$data.table.searched
    // console.log("<<<<<2<<<<<<", this.$data.table.searched)
  }

  created () {
    // this.$data.table.searched = this.$data.profileResponse
  }

  /**
   * @description
   * Table sort
   */
  toLower = text => {
    return text.toString().toLowerCase()
  }

  searchByName = (items, term) => {
    if (term) {
      return items.filter(item => this.toLower(item.email).includes(this.toLower(term)))
    }
    return items
  }

}
</script>
