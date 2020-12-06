
<template>
  <div v-bind:style="styleObject"
       class="md-primary myshadows"
       @contextmenu="contextmenuHandler($event)">

    <div  ref="contextMenu"
          v-show="contextMenuVisibility"
          v-bind:style="styleObjectContextMenu"
          class="md-primary myshadows"
          @contextmenu="cmCreateRouteHandler($event)">
      <md-button class="md-raised md-primary" @click="triggerClickComponent" > Create Route </md-button>

    </div>
    
    <md-button class="md-raised" style="width:100%"> ROCKET CRAFT GENERIC PANEL </md-button>
   <!--
    <md-field>
      <label>Select Type</label>
      <md-select v-model="selectedCountry">
        <md-option v-for="item in countries" :value="item.name" :key="item.code"> {{ item.name }} </md-option>
      </md-select>
    </md-field>

  
    

    -->

<md-table v-model="containerRoutes" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Generic route</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Code" md-sort-by="code">{{ item.code }}</md-table-cell>
      </md-table-row>
    </md-table> 


  </div>
</template>

<style lang="scss" scoped>

  .myshadows {
    -webkit-box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.5);
    -moz-box-shadow: 2px 2px 3px 3px rgba(0,0,0,0.5);
    box-shadow: 2px 2px 3px 3px rgba(0,0,0,0.5);
  }

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

  import { countries } from "./../../data/countries"
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
  export default class GenericComponent extends CompProps {

    data () {
      return {
          contextMenuVisibility: false,
          countries: countries,
          selectedCountry: 'Serbia'
 
      }
    }

    private styleObject: Partial<CSSStyleDeclaration> | any = {
      display: 'flex',
      flexWrap: 'wrap',
      position: 'absolute',
      left: '15%',
      top: '10%',
      width: '85%',
      height: '80%',
      padding: '10px',
      border: 'solid red 1px'
    }

    private styleObjectContextMenu: Partial<CSSStyleDeclaration> | any = {
      display: 'flex',
      position: 'absolute',
      left: '15%',
      top: '10%',
      width: '15%',
      height: '20%',
      padding: '10px',
      border: 'solid orange 1px'
    }

    private containerRoutes = [];

    private triggerClickComponent(e): void {
      console.log(e)

      this.containerRoutes.push( this.$createElement(
        'div',   // tag name
        ['i am dinamic ']
      ))
      
    }

    private setCMPosition(x, y) {
      (this.$refs.contextMenu as HTMLDivElement).style.left = x + "px";
      (this.$refs.contextMenu as HTMLDivElement).style.top = y + "px";
      console.log( this.$refs['contextMenu'] )
    }

    private contextmenuHandler(e) {
      e.preventDefault()
      this.setCMPosition(e.layerX, e.layerY)
      this.$data.contextMenuVisibility = !this.$data.contextMenuVisibility 
      // console.log("Good", e)
    }

  }
</script>
