<template>
  <div class="favorite">
    <i @click="toggleFavorite" class="icon" :class="getFavoriteIcon()" :style="getStyle()"></i>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    size: {
      type: Number,
      default: 30
    },
    song: {}
  },
  computed: {
    ...mapGetters(['favoriteList']),
    isFavorite() {
      for (const fav of this.favoriteList) {
        if (fav.id === this.song.id) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    ...mapActions(['addFavorite', 'removeFavorite']),
    toggleFavorite() {
      console.log('xxx', )
      if (this.isFavorite) {
        this.removeFavorite(this.song)
      } else {
        this.addFavorite(this.song)
      }
    },
    getFavoriteIcon() {
      if (this.isFavorite) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    getStyle() {
      return `font-size: ${this.size}px;`
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

