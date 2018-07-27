<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length > 0" class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <app-scroll @scroll="scroll" :data="songs" :listen-scroll="listenScroll" :probe-type="probeType" class="list" ref="list">
      <div class="song-list-wrapper">
        <app-song-list :songs="songs"></app-song-list>
      </div>
      <div v-show="!songs.length" class="loading-container">
        <app-loading></app-loading>
      </div>
    </app-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import AppLoading from 'base/Loading/Loading'
import AppSongList from 'base/SongList/SongList'
import AppScroll from 'base/Scroll/Scroll'
import { mapActions } from 'vuex'
import { ACTIONS_TYPES as SINGER_ACTIONS_TYPES } from '@/store/singer/actions'

const RESERVED_HEIGHT = 40

export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      probeType: 3,
      listenScroll: true,
      scrollY: 0,
      imageHeight: 0
    }
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  methods: {
    ...mapActions({ ...SINGER_ACTIONS_TYPES }),
    scroll(pos) {
      this.scrollY = pos.y
    },
    back() {
      this.$router.back()
    }
  },
  watch: {
    scrollY(value) {
      let showHeight = this.imageHeight + this.scrollY
      let zIndex = 0

      if (showHeight < RESERVED_HEIGHT) {
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        zIndex = 10

        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.playBtn.style.display = ''
      }

      if (showHeight > RESERVED_HEIGHT && showHeight < this.imageHeight) {
        this.$refs.layer.style['transform'] = `translate3d(0,${this.scrollY}px,0)`

        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        zIndex = 0
      }

      if (showHeight > this.imageHeight) {
        let scale = (showHeight) / this.imageHeight
        this.$refs.bgImage.style['transform'] = `scale(${scale})`
        zIndex = 10
      }

      this.$refs.bgImage.style.zIndex = zIndex
    }
  },
  components: {
    AppLoading,
    AppSongList,
    AppScroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;

      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;

        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
    // background-color: red;
  }

  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;

    // overflow: hidden;
    .song-list-wrapper {
      padding: 20px 30px;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>