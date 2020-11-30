<template>
  <div ref="emailService" class="myStyle">

    <md-menu>
      <md-button class="md-primary md-raised" ref="switchThemeBtn" @click="visibility = !visibility">
        <md-icon class="fa fa-user" ></md-icon>
        Get Users
      </md-button>
    </md-menu>

    <md-dialog :md-active.sync="visibility">
      <md-dialog-title>Users Collections</md-dialog-title>
      <md-tabs md-dynamic-height>
        <md-tab md-label="Get Users">
          <md-content class="md-scrollbar">
            <div style="display: flex;">
              <md-button class="md-primary md-raised" ref="getUserBtn" @click="runApiUsers('users')">
                <md-icon class="fa fa-cog fa-spin" ></md-icon>
                Users
              </md-button>                     
              <md-field style="width:50%;margin-left:5%;" >
                <md-input placeholder="Enter you token." v-model="system.adminAccountToken" />
              </md-field>
            </div>
          <!-- table.searched -->
            <md-table v-model="this.$data.usersCurrentPage" md-sort="name" md-sort-order="asc" md-card md-fixed-header
                       style="height: 450px" >
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title">Users</h1>
                </div>
                <md-field md-clearable class="md-toolbar-section-end" md-label="Token access paste here">
                  <md-input placeholder="Search by name..." v-model="table.search" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>
              <md-table-empty-state
                md-label="No users found"
                :md-description="`No user found for this '${table.search}' query. Try a different search term or create a new user.`">
                <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Id" md-sort-by="id">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Nickname" md-sort-by="nickname">{{ item.nickname }}</md-table-cell>
                <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Confirmed" md-sort-by="confirmed">{{ item.confirmed }}</md-table-cell>
                <md-table-cell md-label="Points" md-sort-by="points" md-numeric>{{ item.points }}</md-table-cell>
                <md-table-cell md-label="Rank" md-sort-by="rank">{{ item.rank }}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-content>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button color="md-primary" @click="visibility = false">HIDE</md-button>
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
import { setupLocal, switchTheme } from '../../my-common/common-func'
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
export default class usersRocketTable extends CompProps {

  private visibility = true
  
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
    console.log('Users Service.')
  }

  async runApiUsers(apiCallFlag) {

    console.log("TTTTTTTTTTTT")
    let route = this.$props.domain
    route = setupLocal(route)

    const args = {
      email: this.$data.system.emailAddress,
      token: this.$data.system.adminAccountToken
    }

    const rawResponse = await fetch(route+ this.$props.prefix + '/' +  apiCallFlag, {
      method: 'POST',
      headers: API.JSON_HEADER,
      body: JSON.stringify(args)
    });

    
    var r =  await rawResponse.json();
    console.log(r)
    this.$data.usersResponse = r.users
    this.setUsersPage(1)
    // this.$data.usersResponse = await rawResponse.json();
    
  }

  newUser(){

  }

  data() {
    return {
      system: {
        emailAddress: 'zlatnaspirala@gmail.com',
        adminAccountToken: ''
      },
      table: {
        search: null,
        searched: [],
      },
      usersResponse: [],
      usersPaginatorIndex: 1,
      usersCurrentPage: [],
      usersPerPaginatorPage: 8
    }
  }
  
  setUsersPage(currentPage) {
    // currentPage
    this.$data.usersCurrentPage = this.$data.usersResponse.slice(0,this.$data.usersPerPaginatorPage)
  }

  searchOnTable () {
    this.$data.table.searched = this.searchByName(this.$data.usersResponse , this.$data.table.search)
  }

  created () {
    this.$data.table.searched = this.$data.usersResponse
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
      return items.filter(item => this.toLower(item.name).includes(this.toLower(term)))
    }
    return items
  }

}
</script>
