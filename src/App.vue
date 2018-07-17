<template>
  <div id="app">
    <app-header></app-header>
    <app-tab></app-tab>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from 'components/Header/Header'
import AppTab from 'components/Tab/Tab'


export default {
  name: 'App',
  components: {
    AppHeader,
    AppTab
  }
}
</script>

<style lang="stylus" scoped>
</style>
