
<template>
  <div ref="profileRef" class="myStyle">
    <md-menu>
      <md-button
        class="md-primary md-raised"
        ref="switchThemeBtn"
        @click="showProfileDialog = !showProfileDialog"
      >
        <md-icon class="fa fa-user"></md-icon>
        Get Profile
      </md-button>
    </md-menu>

    <md-dialog :md-active.sync="showProfileDialog">
      <md-dialog-title>Route card Profile</md-dialog-title>
      <md-tabs md-dynamic-height>
        <md-tab md-label="Profile">
          <md-content class="md-scrollbar">
            <md-content v-bind:style="optionsStyle">
              <h3>/profile</h3>
              <md-field class="md-content-options">
                <label class="labelText">User email address:</label>
                <md-input
                  @keyup.enter="runProfileCall('profile')"
                  v-model="system.emailAddress"
                  class="md-primary md-raised"
                  placeholder="Please enter your email"
                  maxlength="25"
                >
                </md-input>
              </md-field>
              <md-field class="md-content-options">
                <label class="labelText">Token:</label>
                <md-input
                  @keyup.enter="runProfileCall('profile')"
                  v-model="system.adminAccountToken"
                  class="md-primary md-raised"
                  placeholder="Default token:"
                  maxlength="200"
                >
                </md-input>
              </md-field>
              <md-button
                class="md-primary md-raised"
                @click="runProfileCall('profile')"
              >
                /rocket/profile/
              </md-button>
            </md-content>
            <md-content
              ref="responseLoginContainer"
              v-bind:style="optionsStyle"
            >
              <div v-for="item in profileResponse" :key="item.message">
                <div
                  v-if="typeof item != 'object'"
                  style="
                    padding: 1px;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                  "
                  class="level1"
                >
                  <div style="display: flex; padding: 0px; margin: 0px">
                    <md-button class="md-accent md-raised">
                      {{
                        Object.keys(profileResponse)[
                          Object.values(profileResponse).indexOf(item)
                        ]
                      }}
                      <md-icon class="fa fa-caret-right"></md-icon>
                    </md-button>
                    <md-button
                      class="md-primary md-raised"
                      v-on:click="copyToClipboard($event)"
                    >
                      {{ item }}
                    </md-button>
                  </div>
                </div>

                <div
                  v-if="typeof item === 'object'"
                  style="
                    padding: 2px;
                    margin: 0;
                    height: 200px;
                    display: flex;
                    flex-direction: column;
                    overflow: scroll;
                    overflow-x: hidden;
                  "
                >
                  <div
                    v-for="(subItem, name, index) in item"
                    :key="index"
                    style="display: flex"
                  >
                    <md-button
                      v-if="index === 0"
                      class="md-accent md-raised"
                      style="width: 150px; padding-top: -5px"
                    >
                      {{
                        Object.keys(profileResponse)[
                          Object.values(profileResponse).indexOf(item)
                        ]
                      }}
                      <md-icon class="fa fa-sitemap"></md-icon>
                    </md-button>
                    <p v-else class="positive" style="width: 204px"></p>
                    <md-button class="md-accent md-raised" style="width: 150px">
                      {{
                        Object.keys(item)[Object.values(item).indexOf(subItem)]
                      }}
                      <md-icon class="fa fa-caret-right"></md-icon>
                    </md-button>
                    <md-button
                      class="md-primary md-raised"
                      v-on:click="copyToClipboard($event)"
                      >{{ subItem }}</md-button
                    >
                  </div>
                </div>

                <md-icon
                  v-if="item == 'USER_ALREADY_REGISTERED'"
                  class="fa fa-exclamation-triangle md-accent"
                />
              </div>
            </md-content>
          </md-content>
        </md-tab>

        <md-tab md-label="Route Info">
          <md-content class="md-scrollbar">
            <!--img style="width:200px;margin: -5px -5px -5px -5px;" src="assets/logo.png" /-->
            <h3>Description: This is public get profile route. </h3>
              <p>@param email</p>
              <p>@param token</p>
            <md-content class="md-scrollbar myscroll">
              <p>Fetch[js]</p>
              <md-content class="md-raised md-primary" v-on:click="copyToClipboard($event)">
               fetch("http://maximumroulette.com/rocket/profile", { \ <br>
                  "headers": { \ <br>
                    "accept": "application/json", \ <br>
                    "accept-language": "en-US,en;q=0.9,ru;q=0.8", \ <br>
                    "cache-control": "no-cache", \ <br>
                    "content-type": "application/json", \ <br>
                    "pragma": "no-cache" \ <br>
                  }, \ <br>
                  "referrer": "http://localhost:3000/", \ <br>
                  "referrerPolicy": "strict-origin-when-cross-origin", \ <br>
                  "body": "{\"email\":\"zlatnaspirala@gmail.com\",\"token\":\"LDUlf\"}", \ <br>
                  "method": "POST", \ <br>
                  "mode": "cors", \ <br>
                  "credentials": "omit" \ <br>
                }); \ <br>
              </md-content>
              <p>CURL</p>
              <md-content class="md-primary md-raised" v-on:click="copyToClipboard($event)">
                curl 'http://maximumroulette.com/rocket/profile' \ <br>
                  -H 'Accept: application/json' \ <br>
                  -H 'Accept-Language: en-US,en;q=0.9,ru;q=0.8' \ <br>
                  -H 'Cache-Control: no-cache' \ <br>
                  -H 'Connection: keep-alive' \ <br>
                  -H 'Content-Type: application/json' \ <br>
                  -H 'Origin: http://localhost:3000' \ <br>
                  -H 'Pragma: no-cache' \ <br>
                  -H 'Referer: http://localhost:3000/' \ <br>
                  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36' \ <br>
                  --data-raw '{"email":"zlatnaspirala@gmail.com","token":"LDUlf"}' \ <br>
                  --compressed \ <br>
                  --insecure <br>
             </md-content>

              <p>Response</p>
              <md-content class="md-accent">
                <p>
                  "message":"Welcome to your profile dashboard",\ <br>
                  "rocketStatus":"AUTHORIZED",\ <br>
                  "user":{
                    "id":"6442e45395af81fa78663c5b",\ <br>
                    "nickname":"nidza", \ <br>
                    "points":361,\ <br>
                    "rank":"junior",\ <br>
                    "online":true,\ <br>
                    "email":"zlatnaspirala@gmail.com",\ <br>
                    "confirmed":true,\ <br>
                    "profileImage":"/BcMr0015Mu/profile.png"}
                </p>
              </md-content>

            </md-content>
          </md-content>
        </md-tab>

      </md-tabs>
      <md-dialog-actions>
        <md-button color="md-primary" @click="showProfileDialog = false"
          >HIDE</md-button
        >
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
  width: 100%;
  height: 100%;
  -webkit-box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.5);
}

.myscroll {
  height: calc(50vh) !important;
  overflow: auto;
}

.md-content {
  min-width: 400px;
  font-size: 110%;
  height: fit-content;
}
</style>

<script lang="ts">
import { API } from "../../my-common/literal";
import Vue from "vue";
import Component from "vue-class-component";
import store from "../../store"
import {
  mdMenu,
  mdButton,
  mdIcon,
  mdContent,
  mdProgressSpinner,
} from "vue-material";
import {
  copyToClipboard,
  switchTheme,
} from "../../my-common/common-func";

// Interface
// import IAccounts from './IAccounts'

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
export default class userRocketProfile extends CompProps {
  private visibility = true;

  public showProfileDialog = false;

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

  private copyToClipboard;

  constructor() {
    super();

    this.copyToClipboard = copyToClipboard.bind(this);
  }

  mounted(): void {
    console.log("Users Service. adminAccountToken ", this.$data.system.adminAccountToken);

    addEventListener('onNewToken', (e) => {
      e.preventDefault()
      this.$data.system.adminAccountToken = this.$store.state.permission.token
    })

    addEventListener('onNewEmailAddress', (e) => {
      this.$data.system.emailAddress = this.$store.state.permission.emailAddress
    })
  }

  public setNewToken(t) {
    store.commit("setNewToken", { token: this.$data.system.adminAccountToken });
  }

  async runApiUsers() {
    console.log("TEST ROUTE ");
    let route = this.$props.domain;
    const args = {
      email: this.$data.system.emailAddress,
      token: this.$data.system.adminAccountToken,
    };

    const rawResponse = await fetch(route + this.$props.prefix + "/profile", {
      method: "POST",
      headers: API.JSON_HEADER,
      body: JSON.stringify(args),
    });

    var r = await rawResponse.json();
    this.$data.profileResponse = r.user;
    console.log("GOOOD");
    // this.setUsersPage('new-buffer-data')
  }

  async runProfileCall() {
    let route = this.$props.domain;

    const args = {
      email: this.$data.system.emailAddress.toString(),
      token: this.$data.system.adminAccountToken.toString(),
    };

    const rawResponse = await fetch(route + this.$props.prefix + "/profile", {
      method: "POST",
      headers: API.JSON_HEADER,
      body: JSON.stringify(args),
    });

    this.$data.profileResponse = await rawResponse.json();
    // this.registerResponse = await rawResponse.json();
  }

  newUser() {
    console.log("test");
  }

  data() {
    return {
      system: {
        emailAddress:
          this.$store.state.system.hardCodeAccount.getEmailAddress(),
        adminAccountToken:
          this.$store.state.system.hardCodeAccount.adminAccountToken(),
      },
      profileResponse: [],
    };
  }

  setUsersPage(arg: string) {
    if (!arg) {
      console.error(
        "You need to pass arg with type of `string` for Users.setUsersPage."
      );
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
    this.$data.usersCurrentPage = this.$data.profileResponse;
  }

  searchOnTable() {
    // this.$data.table.searched = this.searchByName(this.$data.profileResponse , this.$data.table.search)
    // this.$data.usersCurrentPage = this.$data.table.searched
    // console.log("<<<<<2<<<<<<", this.$data.table.searched)
  }

  created() {
    // this.$data.table.searched = this.$data.profileResponse
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
