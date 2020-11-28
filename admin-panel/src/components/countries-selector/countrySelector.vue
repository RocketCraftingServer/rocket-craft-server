
<template>
  <div v-bind:style="styleObject" class="md-primary myshadows" >

    <md-field>
      <label>Select country</label>
      <md-select v-model="selectedCountry">
        <md-option v-for="item in countries" :value="item.name" :key="item.code"> {{ item.name }} </md-option>
      </md-select>
    </md-field>

    <!--
    <md-table v-model="countries" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Code" md-sort-by="code">{{ item.code }}</md-table-cell>
      </md-table-row>
    </md-table> -->

  </div>
</template>

<style scoped>
  .myshadows {
    -webkit-box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.5);
    -moz-box-shadow: 2px 2px 3px 3px rgba(0,0,0,0.5);
    box-shadow: 2px 2px 3px 3px rgba(0,0,0,0.5);
  }
</style>

<style lang="scss" scoped>
  .md-dialog /deep/.md-dialog-container {
    max-width: 1000px;
  }

  .md-content {
    max-width: 1000px;
    max-height: 520px;
    overflow: auto;
  }

  .md-field {
    width: 200px;
  }

</style>

<script lang="ts">

  /*global IFooter*/

  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {
    mdTabs,
    mdTab,
    mdButton,
    mdDialogActions,
    mdContent,
    mdTable,
    mdSelect,
    mdInput,
    MdField
   }  from 'vue-material'

  import { countries } from '../../data/countries'
  // eslint-disable-line no-unused-vars
  // import IFooter from './IFooter';

  const CompProps = Vue.extend({
    props: {
      textContent: String
    }
  });

  // Register for components
  @Component({
    components: {
      mdButton,
      mdTabs,
      mdTab,
      mdDialogActions,
      mdContent
    }
  })

  @Component
  export default class CountrySelector extends CompProps {

    data () {
      return {
        countries: countries,
        selectedCountry: ''
      }
    }

    styleObject: Partial<CSSStyleDeclaration> | any = {
      padding: '10px'
    }

  }
</script>
