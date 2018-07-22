<template>
  <div id="app">
    <app-header></app-header>
    <app-tab></app-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
