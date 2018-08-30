<template>
  <transition name="slide">
    <app-music-list v-if="disc" :title="title" :bg-image="bgImage" :songs="songs"></app-music-list>
  </transition>
</template>

<script>
import AppMusicList from 'components/MusicList/MusicList'
import { mapGetters } from 'vuex'
import { GETTER_TYPES as COMMON_GETTER_TYPES } from '@/store/common/getters'
import { getSongList } from '@/api/recommend'
import { CODE_OK } from '@/api/config'
import { getSingerDetail } from 'api/singer'
import { createSong } from 'common/js/song'
import { playlistMixin } from '@/common/js/mixin'

export default {
  computed: {
    ...mapGetters({ ...COMMON_GETTER_TYPES }),
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    }
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.disc) {
        this.$router.push('/recommend')
        return
      }
      // getSongList(this.disc.dissid).then((data) => {
      //   if (data.code === CODE_OK) {
      //     // need available url to get data
      //     console.log('songList', data)
      //   } 
      // })

      // use sample song list for not available api
      this.songs = this.sampleList
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
  components: {
    AppMusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>