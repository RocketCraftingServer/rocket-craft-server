
<template>
  <div ref="leaderboardDom" class="myStyle">
    <md-menu>
      <md-button class="md-primary md-raised" ref="switchThemeBtn" @click="visibility = !visibility">
        <md-icon class="fa fa-user" ></md-icon>
        Leaderboard
      </md-button>
    </md-menu>
    <md-dialog :md-active.sync="visibility">
      <md-dialog-title>Users Leaderboard Collections</md-dialog-title>
      <md-tabs md-dynamic-height>
        <md-tab md-label="Get Users">
          <md-content class="md-scrollbar">
            <div style="display: flex;">
              <md-button class="md-primary md-raised" ref="getUserBtn" @click="runApiUsers('leaderboard')">
                <md-icon class="fa fa-cog fa-spin" ></md-icon>
                Users Leaderboard
              </md-button>
              <md-field style="width:50%;margin-left:5%;" >
                <md-input class="md-primary" placeholder="Enter you token." v-model="system.adminAccountToken" />
              </md-field>
            </div>
          <!-- table.searched -->
            <md-table v-model="usersCurrentPage" md-sort="email" md-sort-order="asc" md-card md-fixed-header
                       style="height: 450px" >
              <md-table-toolbar>
                <div class="md-toolbar-section-start" style="display:flex;flex-direction:row">
                  <h1 class="md-title">Users {{ this.$data.usersPaginatorIndex }} </h1>
                </div>
                <md-field md-clearable class="md-toolbar-section-end" md-label="Token access paste here">
                  <md-input placeholder="Search by email..." v-model="table.search" @input="searchOnTable" />
                </md-field>
                <div class="md-toolbar-section-start" style="display:flex;flex-direction:row">
                   <p v-if="this.$data.usersPaginatorIndex !== 0" class="md-small">Page {{ this.$data.usersPaginatorIndex }} </p>
                </div>
              </md-table-toolbar>
        
              <md-table-empty-state
                md-label="No users found"
                :md-description="`No user found for this '${table.search}' query. Try a different search term or create a new user.`">
                <md-button class="md-primary md-raised" @click="newUser">No results</md-button>
              </md-table-empty-state>
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nickname" md-sort-by="nickname">{{ item.nickname }}</md-table-cell>
                <md-table-cell md-label="Points" md-sort-by="points" md-numeric>{{ item.points }}</md-table-cell>
                <md-table-cell md-label="Rank" md-sort-by="rank">{{ item.rank }}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-content>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button class="md-primary md-raised" @click="setUsersPage('prev')">Prev Page</md-button>
        <md-button class="md-primary md-raised" @click="setUsersPage('next')">Next Page</md-button>
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
export default class leaderboardRocketTable extends CompProps {

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
    console.log('Users Service.')
  }

  async runApiUsers(apiCallFlag) {

    let route = this.$props.domain

    const args = {
      email: this.$data.system.emailAddress,
      token: this.$data.system.adminAccountToken,
      criterium: {
        description: 'list-all',
        moreExploreUsers: this.$data.moreExploreUsers
      }
    }

    const rawResponse = await fetch(route+ this.$props.prefix + '/' +  apiCallFlag, {
      method: 'POST',
      headers: API.JSON_HEADER,
      body: JSON.stringify(args)
    });

    var r =  await rawResponse.json();
    this.$data.usersResponse = r.leaderboard
    this.setUsersPage('new-buffer-data')

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
      table: {
        search: null,
        searched: [],
      },
      usersResponse: [],
      usersPaginatorIndex: 0,
      usersCurrentPage: [],
      usersPerPaginatorPage: 8,

      moreExploreUsers: 0
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
    this.$data.usersCurrentPage = 
      this.$data.usersResponse.slice(
        0 + (currentPage - 1) * this.$data.usersPerPaginatorPage,
        this.$data.usersPerPaginatorPage * currentPage
      )

  }

  searchOnTable () {
    this.$data.table.searched = this.searchByName(this.$data.usersResponse , this.$data.table.search)
    this.$data.usersCurrentPage = this.$data.table.searched
    // console.log("<<<<<2<<<<<<", this.$data.table.searched)
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
      return items.filter(item => this.toLower(item.email).includes(this.toLower(term)))
    }
    return items
  }

}
</script>
