
<template>
  <div id="app">
    <myHeader slogan='Rocket-craft server - admin web application'></myHeader>
    <div ref="mybodycontent" v-bind:style="styleObject">

      <div class="loader" ref="loader" style="display: block;">
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      </div>

      <emailService v-show="visibility.emailServiceComponent"
                    slogan="Gmail service used.">
      </emailService>

      <rocketAccounts slogan="API admin/tester" 
                      prefix="rocket"
                      :domain="$props.AppDomainHost">
      </rocketAccounts>

      <country-selector>
      </country-selector>

    </div>
    <myFooter textContent='https://maximumroulette.com:30100 Rocket-Craft-Server 2021'></myFooter>
  </div>
</template>

<script lang="ts">

  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import myHeader from './components/myHeader.vue'
  import myFooter from './components/myFooter.vue'
  import RocketAccounts from './components/administrator/accounts.vue'
  import { mapState, mapMutations } from 'vuex'
  import IApp from './IApp'
  import LocalStorageMemory from './local-storage/local-storage'
  import VueMaterial from 'vue-material'
  import 'vue-material/dist/vue-material.min.css'
  import './styles/style.scss'
  import EmailService from './components/administrator/email-service.vue'
  import CountrySelector from './components/countries-selector/countrySelector.vue'
  Vue.use(VueMaterial as any)

  /**
   *  We declare the props separately
   *  to make props types inferable.
   */
  const AppProps = Vue.extend({
    props: {
      AppPropVersion: String,
      AppDomainHost: String
    }
  });

  // Register for components
  @Component({
    components: {
      myHeader,
      myFooter,
      RocketAccounts,
      EmailService,
      CountrySelector
    },
    computed: mapState([
      'permission'
    ]),
    methods: mapMutations([
      'cookieAccept'
    ])
  })

  export default class App extends AppProps {

    /**
     * @description  Annotate refs type
     * typescript addition.
     */
    $refs!: {
      myHeader: myHeader,
      emailService: EmailService,
      mybodycontent: HTMLDivElement,
      loader: HTMLDivElement
    }

    /**
     * @description `ls` is instance for localstorage operation
     * I will use it like singletone for injection in places
     * where is needed.
     */
    public ls: LocalStorageMemory = new LocalStorageMemory()

    /**
     * @description Additional declaration is needed.
     * When you declare some properties in `Component` decorator.
     * count!: number
     * increment!: () => void
     */
    count!: number
    increment!: () => void
    saveResponse!: () => void
    permission!: Object

    public styleObject;

    /**
     * @description options are main object
     * for user in fly setup. If user clear
     * cache memory(localStorege) everything
     * goes back to the default values.
     */
    public options: Object = {}
    public currentRoute

    /**
     * @description Initial method construct.
     */
    constructor() {
      super()
      
      this.styleObject = {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        itemsAlign: 'center',
        height: '100%',
        width: '100%'
      }

      /**
       * @description  Check page localStorage
       * Note: Only lower chars for naming ls objects.
       */
      if (this.ls.load("first_time") === null) {

        console.info("App starts first time. Prepare storage data...")

        /**
         * In future enumerate for global config...
         */
        // this.ls.save("o_camera", false)


        /**
         * @description Permission staff
         * Cant be read or write
         */
        this.ls.save("permission_level", "read")
        this.options = {
          permissionLevel: this.ls.load("permission_level"),
        };
        this.ls.save("first_time", 'storage-loaded')

      } else {

        console.info("App loading storage data...")
        this.options = {
          permissionLevel: this.ls.load("permission_level")
        }

      }

      this.$root.$on('gapiReady', (args: any) => {

        try {
          console.info("Event gapiReady => ", args)
        } catch(err) {
          console.warn(err)
        }

      })

    }

    data() {
      return {
        visibility: {
          account: true,
          emailServiceComponent: true
        }
      }
    }

    public setEmailServiceVisibility() {
      this.$data.visibility.emailServiceComponent = !this.$data.visibility.emailServiceComponent
    }

    public setAccountVisibility() {
      this.$data.visibility.account = !this.$data.visibility.account
    }

    setupInstance = () => {
      this.currentRoute = window.location.pathname
      
      this.$refs.loader.style.display = 'none'
      // console.log('Test Application refs mybodycontent => ', this.$refs.mybodycontent)
      // console.log('Attach Application event this.currentRoute => ', this.currentRoute)
    }

    get computedMsg (): string {
      return 'computed'
    }

    mounted (): void {
      this.setupInstance()
    }

  }
</script>

<style>

  body {
     overflow: hidden;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  .loader {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 99999;
    text-align: center;
    /* justify-items: center; */
    /* align-items: center; */
    /* align-self: center; */
    /* vertical-align: middle; */
    margin: 0;
    padding-top: 21%;
  }

</style>
