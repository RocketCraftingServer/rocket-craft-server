
<template>
  <div ref="emailService" class="myStyle">
    <md-menu>
      <md-button
        class="md-primary md-raised"
        ref="switchThemeBtn"
        @click="visibility = !visibility"
      >
        <md-icon class="fa fa-user"></md-icon>
        Get Users
      </md-button>
    </md-menu>
    <md-dialog :md-active.sync="visibility">
      <md-dialog-title>Users Collections</md-dialog-title>
      <md-tabs md-dynamic-height>
        <md-tab md-label="Get Users">
          <md-content class="md-scrollbar">
            <div style="display: flex">
              <md-button
                class="md-primary md-raised"
                ref="getUserBtn"
                @click="runApiUsers('users')"
              >
                <md-icon class="fa fa-cog fa-spin"></md-icon>
                Users
              </md-button>
              <md-field style="width: 50%; margin-left: 5%">
                <md-input
                  class="md-primary"
                  placeholder="Enter you token."
                  v-model="system.adminAccountToken"
                />
                <md-button @click="setNewToken(system.adminAccountToken)"
                  >Set new token!</md-button
                >
              </md-field>
            </div>
            <!-- table.searched -->
            <md-table
              v-model="usersCurrentPage"
              md-sort="email"
              md-sort-order="asc"
              md-card
              md-fixed-header
              style="height: 450px"
            >
              <md-table-toolbar>
                <div
                  class="md-toolbar-section-start"
                  style="display: flex; flex-direction: row"
                >
                  <h1 class="md-title">
                    Users {{ this.$data.usersPaginatorIndex }}
                  </h1>
                </div>
                <md-field
                  md-clearable
                  class="md-toolbar-section-end"
                  md-label="Token access paste here"
                >
                  <md-input
                    placeholder="Search by email..."
                    v-model="table.search"
                    @input="searchOnTable"
                  />
                </md-field>
                <div
                  class="md-toolbar-section-start"
                  style="display: flex; flex-direction: row"
                >
                  <p
                    v-if="this.$data.usersPaginatorIndex !== 0"
                    class="md-small"
                  >
                    Page {{ this.$data.usersPaginatorIndex }}
                  </p>
                </div>
              </md-table-toolbar>

              <md-table-empty-state
                md-label="No users found"
                :md-description="`No user found for this '${table.search}' query. Try a different search term or create a new user.`"
              >
                <md-button class="md-primary md-raised" @click="newUser"
                  >No results</md-button
                >
              </md-table-empty-state>
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Id" md-sort-by="id">{{
                  item.id
                }}</md-table-cell>
                <md-table-cell md-label="Nickname" md-sort-by="nickname">{{
                  item.nickname
                }}</md-table-cell>
                <md-table-cell md-label="Email" md-sort-by="email">{{
                  item.email
                }}</md-table-cell>
                <md-table-cell md-label="Confirmed" md-sort-by="confirmed">{{
                  item.confirmed
                }}</md-table-cell>
                <md-table-cell
                  md-label="Points"
                  md-sort-by="points"
                  md-numeric
                  >{{ item.points }}</md-table-cell
                >
                <md-table-cell md-label="Rank" md-sort-by="rank">{{
                  item.rank
                }}</md-table-cell>
                <md-table-cell md-label="Delete"
                  ><button @click="runApiProfileDelete(item.id)">X</button
                ></md-table-cell>
              </md-table-row>
            </md-table>
          </md-content>
        </md-tab>
        <md-tab md-label="Route Info">
          <md-content class="md-scrollbar">
            <!--img style="width:200px;margin: -5px -5px -5px -5px;" src="assets/logo.png" /-->
            <h3>Description: This is get users route.</h3>
            <p>@param emailField</p>
            <p>@param passwordField</p>
            <md-content class="md-scrollbar myscroll">
              <p>Fetch[js]</p>
              <md-content
                class="md-raised md-primary"
                v-on:click="copyToClipboard($event)"
              >
                fetch("http://maximumroulette.com/rocket/users", { <br />
                "headers": {<br />
                "accept": "application/json",<br />
                "accept-language": "en-US,en;q=0.9,ru;q=0.8",<br />
                "cache-control": "no-cache",<br />
                "content-type": "application/json",<br />
                "pragma": "no-cache"<br />
                },<br />
                "referrer": "http://localhost:3000/",<br />
                "referrerPolicy": "strict-origin-when-cross-origin",<br />
                "body":
                "{\"email\":\"zlatnaspirala@gmail.com\",\"token\":\"36toO\",
                \"criterium\":{\"description\":\"list-all\",\"moreExploreUsers\":0}}",<br />
                "method": "POST",<br />
                "mode": "cors",<br />
                "credentials": "omit"<br />
                });<br />
              </md-content>
              <p>CURL</p>
              <md-content
                class="md-primary md-raised"
                v-on:click="copyToClipboard($event)"
              >
                curl 'http://maximumroulette.com/rocket/users' \<br />
                -H 'Connection: keep-alive' \<br />
                -H 'Pragma: no-cache' \<br />
                -H 'Cache-Control: no-cache' \<br />
                -H 'Accept: application/json' \<br />
                -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
                AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110
                Safari/537.36' \<br />
                -H 'Content-Type: application/json' \<br />
                -H 'Origin: http://localhost:3000' \<br />
                -H 'Referer: http://localhost:3000/' \<br />
                -H 'Accept-Language: en-US,en;q=0.9,ru;q=0.8' \<br />
                --data-raw
                '{"email":"zlatnaspirala@gmail.com","token":"36toO","criterium":{"description":"list-all","moreExploreUsers":0}}'
                \<br />
                --compressed \<br />
                --insecure<br />
              </md-content>

              <p>Response</p>
              <md-content class="md-accent">
                <p>
                  {"message":"get users response", "rocketStatus":"AUTHORIZED",
                  "users":[
                  {
                    "id":"600c307f4475b16683435dea", \ <br>
                    "nickname":"no-nick-name0", \ <br>
                    "points":1000, \ <br>
                    "rank":"junior", \ <br>
                    "online":false, \ <br>
                    "email":"fake_user0@localhost.com", \ <br>
                    "confirmed":false, \ <br>
                    "profileImage":"users-shared-data/no-image.jpg"},
                  ...
                </p>
              </md-content>
            </md-content>
          </md-content>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button class="md-primary md-raised" @click="setUsersPage('prev')"
          >Prev Page</md-button
        >
        <md-button class="md-primary md-raised" @click="setUsersPage('next')"
          >Next Page</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<style lang="scss" scoped>
.myscroll {
  height: calc(45vh);
  overflow: auto;
}

.md-menu {
  margin: 1px;
}

.md-button {
  min-width: 200px;
  font-weight: 400;
}

.myStyle {
  width: 100%;
  height: 100%;
  -webkit-box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.5);
}

.md-content {
  font-size: 100%;
}
</style>

<script lang="ts">
import { API } from "../../my-common/literal";
import Vue from "vue";
import store from "../../store";
import Component from "vue-class-component";
import {
  mdMenu,
  mdButton,
  mdIcon,
  mdContent,
  mdProgressSpinner,
} from "vue-material";
import { copyToClipboard, switchTheme } from "../../my-common/common-func";
import IAccounts from "./IAccounts";

const CompProps = Vue.extend({
  props: {
    slogan: String,
    prefix: String,
    domain: String,
  },
});

@Component({
  components: {
    mdButton,
    mdMenu,
    mdIcon,
    mdProgressSpinner,
    mdContent,
  },
})
@Component
export default class usersRocketTable extends CompProps {
  private visibility = false;

  public optionsStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingBottom: "10px",
    itemsAlign: "left",
    height: "auto",
    border: "1px solid gray",
    borderRadius: "2px",
    padding: "10px",
    margin: "1px 1px 1px 1px",
  };

  public copyToClipboard;

  public setNewToken(t) {
    store.commit("setNewToken", { token: this.$data.system.adminAccountToken });
  }

  constructor() {
    super();
    this.copyToClipboard = copyToClipboard.bind(this);
  }

  mounted(): void {
    console.log("Users Service.");

    // Emit flow
    addEventListener("onNewToken", (e) => {
      this.$data.system.adminAccountToken = this.$store.state.permission.token;
    });
  }

  async runApiUsers(apiCallFlag) {
    let route = this.$props.domain;

    const args = {
      email: this.$data.system.emailAddress,
      token: this.$data.system.adminAccountToken,
      criterium: {
        description: "list-all",
        moreExploreUsers: this.$data.moreExploreUsers,
      },
    };

    const rawResponse = await fetch(
      route + this.$props.prefix + "/" + apiCallFlag,
      {
        method: "POST",
        headers: API.JSON_HEADER,
        body: JSON.stringify(args),
      }
    );

    var r = await rawResponse.json();
    this.$data.usersResponse = r.users;
    this.setUsersPage("new-buffer-data");
  }

  async runApiProfileDelete(profileId) {
    let route = this.$props.domain;

    const args = {
      email: this.$data.system.emailAddress,
      token: this.$data.system.adminAccountToken,
      deleteUserId: profileId
    };

    const rawResponse = await fetch(
      route + this.$props.prefix + "/profile-delete",
      {
        method: "POST",
        headers: API.JSON_HEADER,
        body: JSON.stringify(args),
      }
    );

    var r = await rawResponse.json();
    if (r.message == "User profile deleted") {
      this.$data.usersCurrentPage.forEach((element, index, array) => {
        if (element.id == profileId) {
          array.splice(index, 1)
        }
      });
    }
  }

  newUser() {
    console.log("test");
  }

  data() {
    console.log('test ' ,  this.$store.state.permission.emailAddress)
    return {
      system: {
        emailAddress:
          this.$store.state.permission.emailAddress,
        adminAccountToken:
          this.$store.state.system.hardCodeAccount.adminAccountToken(),
      },
      table: {
        search: null,
        searched: [],
      },
      usersResponse: [],
      usersPaginatorIndex: 0,
      usersCurrentPage: [],
      usersPerPaginatorPage: 8,

      moreExploreUsers: 0,
    };
  }

  setUsersPage(arg: string) {
    if (!arg) {
      console.error("You need to pass arg with type of `string` for Users.setUsersPage.");
    }
    console.log(" arg =>  ", arg);
    var currentPage = 0;

    if (arg === "next") {
      this.$data.usersPaginatorIndex++;
    } else if (arg === "prev") {
      if (this.$data.usersPaginatorIndex == 1) {
        return;
      }
      this.$data.usersPaginatorIndex--;
    } else if (arg === "new-buffer-data") {
      this.$data.usersPaginatorIndex = 1;
    }

    currentPage = this.$data.usersPaginatorIndex;

    // currentPage
    this.$data.usersCurrentPage = this.$data.usersResponse.slice(
      0 + (currentPage - 1) * this.$data.usersPerPaginatorPage,
      this.$data.usersPerPaginatorPage * currentPage
    );
  }

  searchOnTable() {
    this.$data.table.searched = this.searchByName(
      this.$data.usersResponse,
      this.$data.table.search
    );
    this.$data.usersCurrentPage = this.$data.table.searched;
    // console.log("<<<<<2<<<<<<", this.$data.table.searched)
  }

  created() {
    this.$data.table.searched = this.$data.usersResponse;
  }

  /**
   * @description
   * Table sort
   */
  toLower = (text) => {
    return text.toString().toLowerCase();
  };

  searchByName = (items, term) => {
    if (term) {
      return items.filter((item) =>
        this.toLower(item.email).includes(this.toLower(term))
      );
    }
    return items;
  };
}
</script>
