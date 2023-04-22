
<template>
  <div ref="profileAvatarRef" class="myStyle">
    <md-menu>
      <md-button
        class="md-primary md-raised"
        ref="switchThemeBtn"
        @click="showProfileDialog = !showProfileDialog"
      >
        <md-icon class="fa fa-user"></md-icon>
        Set Avatar
      </md-button>
    </md-menu>

    <md-dialog :md-active.sync="showProfileDialog">
      <md-dialog-title>Route card Profile Image/Avatar</md-dialog-title>
      <md-tabs md-dynamic-height>
        <md-tab md-label="Profile">
          <md-content class="md-scrollbar">
            <md-content v-bind:style="optionsStyle">
              <h3>/profile</h3>
              <md-field class="md-content-options">
                <label class="labelText">User email address:</label>
                <md-input
                  @keyup.enter="runProfileCall('profile/upload')"
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
                  @keyup.enter="runProfileCall('profile/upload')"
                  v-model="system.adminAccountToken"
                  class="md-primary md-raised"
                  placeholder="Default token:"
                  maxlength="200"
                >
                </md-input>
              </md-field>
            <md-field>
               <label>Single</label>
               <input type="file" @change="handleFileUpload( $event )"/>
            </md-field>
              <md-button
                class="md-primary md-raised"
                @click="runProfileCall('profile/upload')"
              >
                /rocket/profile/
              </md-button>
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
import {
  mdFile,
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
    mdFile,
    mdButton,
    mdMenu,
    mdIcon,
    mdProgressSpinner,
    mdContent,
  },
})
@Component
export default class profileAvatar extends CompProps {
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

  handleFileUpload( e ){
    this.$data.avatar = e.target.files[0];

    const reader = new FileReader()

    let rawImg;
    reader.onloadend = () => {
      rawImg = reader.result;
      console.log(rawImg);
      console.log("aaaaaaaaaaaaaaaaaaa")
      this.$set(this, 'avatar', rawImg)
    }
    reader.readAsDataURL(this.$data.avatar);
    console.log(this.$data.avatar)

    
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

 

  async runProfileCall() {
    let route = this.$props.domain;

console.log('>>>>>>>>>>>>>>>>>')
    const args = {
      email: this.$data.system.emailAddress.toString(),
      token: this.$data.system.adminAccountToken.toString(),
      photo: this.$data.avatar
    };

    const rawResponse = await fetch(route + this.$props.prefix + "/profile/upload", {
      method: "POST",
      headers: API.JSON_HEADER,
      body: JSON.stringify(args),
    });

    this.$data.profileResponse = await rawResponse.json();
  }

  newUser() {
    console.log("test");
  }

  data() {
    return {
      avatar: null,
      system: {
        emailAddress: this.$store.state.system.hardCodeAccount.getEmailAddress(),
        adminAccountToken: this.$store.state.system.hardCodeAccount.adminAccountToken(),
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
