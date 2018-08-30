<template>
  <div id="app">
    <app-header></app-header>
    <app-tab></app-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <app-player></app-player>
  </div>
</template>

<script>
import AppHeader from 'components/Header/Header'
import AppTab from 'components/Tab/Tab'
import AppPlayer from 'components/Player/Player'
import { CODE_OK } from '@/api/config'
import { ACTION_TYPES as COMMON_ACTION_TYPES } from '@/store/common/actions'
import { mapActions } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { createSong } from 'common/js/song'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppTab,
    AppPlayer
  },
  methods: {
    ...mapActions({ ...COMMON_ACTION_TYPES }),
    // as demo data when some apis are not available
    _getSampleSongList() {
      // show Jay Chou's top 50 songs
      const singerId = '0025NhlN2yWrP4'
      getSingerDetail(singerId).then((res) => {
        if (res.code === CODE_OK) {
          let sampleList = []
          sampleList = this._normalizeSongs(res.data.list).slice(0, 50)
          // console.log('songs', sampleList)
          this.setSampleList(sampleList)

        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  created() {
    this._getSampleSongList()
  }
}
</script>

<style lang="stylus" scoped>
</style>
