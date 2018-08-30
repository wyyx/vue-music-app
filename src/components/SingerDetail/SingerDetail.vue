<template>
  <transition name="slide">
    <app-music-list ref="list" v-if="singer" :title="title" :bg-image="bgImage" :songs="songs"></app-music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { GETTER_TYPES as SINGER_GETTER_TYPES } from '@/store/singer/getters'
import { CODE_OK } from 'api/config'
import { getSingerDetail } from 'api/singer'
import { createSong } from 'common/js/song'
import AppMusicList from 'components/MusicList/MusicList'

export default {
  components: {
    AppMusicList
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters({ ...SINGER_GETTER_TYPES }),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    }
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === CODE_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          // console.log('songs', this.songs)
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
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.singer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
