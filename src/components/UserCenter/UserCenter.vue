<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <app-multi-tab @tab="switchTab" :tabs="tabs" :currentIndex="currentIndex"></app-multi-tab>
      </div>
      <div ref="playBtn" class="play-btn">
        <i class="icon-play"></i>
        <span class="text" @click="randomPlayAll">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <app-scroll ref="favoriteList" class="list-scroll" v-if="currentIndex===0" :data="favoriteList">
          <div class="list-inner">
            <app-song-list :songs="favoriteList" @select="selectItem"></app-song-list>
          </div>
        </app-scroll>
        <app-scroll ref="playList" class="list-scroll" v-if="currentIndex===1" :data="playHistory">
          <div class="list-inner">
            <app-song-list :songs="playHistory" @select="selectItem"></app-song-list>
          </div>
        </app-scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <app-no-result :title="noResultDesc"></app-no-result>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import AppMultiTab from 'base/MultiTab/MultiTab'
import AppScroll from 'base/Scroll/Scroll'
import AppSongList from 'base/SongList/SongList'
import AppNoResult from 'base/NoResult/NoResult'
import { mapGetters, mapActions } from 'vuex'
import PlaylistMixin from '@/mixins/PlaylistMixin'


export default {
  mixins: [PlaylistMixin],
  data() {
    return {
      currentIndex: 0,
      tabs: [
        {
          title: '我喜欢的'
        },
        {
          title: '最近听的'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'playHistory',
      'favoriteList'
    ]),
    noResult() {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length
      } else {
        return !this.playHistory.length
      }
    },
    noResultDesc() {
      if (this.currentIndex === 0) {
        return '暂无收藏歌曲'
      } else {
        return '你还没有听过歌曲'
      }
    },
  },
  methods: {
    ...mapActions([
      'randomPlay',
      'selectOnePlay',
      'randomPlay'
    ]),
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.listWrapper.style.bottom = bottom

      this.$refs.favoriteList && this.$refs.favoriteList.refresh()
      this.$refs.playList && this.$refs.playList.refresh()
    },

    randomPlayAll() {
      if (this.currentIndex === 0) {
        if (this.favoriteList.length) {
          this.randomPlay(this.favoriteList)
        }
      }

      if (this.currentIndex === 1) {
        if (this.playHistory) {
          this.randomPlay(this.playHistory)
        }
      }
    },
    selectItem(song) {
      this.selectOnePlay(song)
    },
    switchTab(index) {
      this.currentIndex = index
    },
    back() {
      this.$router.back()
    }
  },
  watch: {
    currentIndex() {
      this.$refs.favoriteList && this.$refs.favoriteList.refresh()
      this.$refs.playList && this.$refs.playList.refresh()
    }
  },
  components: {
    AppMultiTab,
    AppScroll,
    AppSongList,
    AppNoResult
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.user-center {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: $color-background;

  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter, &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

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

  .switches-wrapper {
    margin: 10px 0 30px 0;
  }

  .play-btn {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid $color-text-l;
    color: $color-text-l;
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

  .list-wrapper {
    position: absolute;
    top: 110px;
    bottom: 0;
    width: 100%;

    .list-scroll {
      height: 100%;
      overflow: hidden;

      .list-inner {
        padding: 20px 30px;
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>