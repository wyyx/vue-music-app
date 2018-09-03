<template>
  <div class="play-mode">
    <div @click="changeMode">
      <i :class="iconMode" :style="getStyle"></i>
    </div>
  </div>
</template>

<script>
import { GETTER_TYPES as PLAYER_GETTER_TYPES } from '@/store/player/getters'
import { ACTION_TYPES as PLAYER_ACTION_TYPES } from '@/store/player/actions'
import { mapGetters, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

export default {
  props: {
    size: {
      type: Number,
      default: 30
    }
  },
  computed: {
    ...mapGetters({ ...PLAYER_GETTER_TYPES }),
  },
  methods: {
    ...mapActions({ ...PLAYER_ACTION_TYPES }),
    changeMode() {
      const mode = (this.playMode + 1) % 3
      this.setPlayMode(mode)

      let currentSongId = this.currentSong.id
      if (mode === playMode.random) {
        this.setPlaylist(shuffle(this.playlist))
      }

      this.resetCurrentIndex(currentSongId)
    },
    resetCurrentIndex(id) {
      let newIndex = this.playlist.findIndex(item => item.id === id)
      this.setCurrentIndex(newIndex)
    }


  },
  computed: {
    ...mapGetters({ ...PLAYER_GETTER_TYPES }),
    getStyle() {
      return `font-size: ${this.size}px;`
    },
    iconMode() {
      for (const key in playMode) {
        if (this.playMode === playMode[key]) {
          return 'icon-' + key
        }
      }
    }
  }
}
</script>

<style  lang="stylus"  scoped rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';
</style>
