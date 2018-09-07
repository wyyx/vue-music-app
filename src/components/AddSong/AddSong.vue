<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <app-search-box ref="searchBox" @queryChange="onQueryChange" placeholder="搜索歌曲"></app-search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <app-multi-tab @tab="switchTab" :currentIndex="currentIndex" :tabs="tabs"></app-multi-tab>
        <div class="list-wrapper">
          <app-scroll ref="songList" v-if="currentIndex === 0" class="list-scroll" :data="playHistory">
            <div class="list-inner">
              <app-song-list :songs="playHistory" @select="selectItem">
              </app-song-list>
            </div>
          </app-scroll>
          <app-scroll ref="searchList" v-if="currentIndex===1" class="list-scroll" :data="searchHistory">
            <div class="list-inner">
              <app-search-list @delete="deleteHistory" @select="setQuery" :searches="searchHistory"></app-search-list>
            </div>
          </app-scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <app-suggest ref="suggest" :query="query" @select="onSelect"></app-suggest>
      </div>
    </div>

  </transition>
</template>

<script >
import AppSearchBox from '@/base/SearchBox/SearchBox'
import AppSuggest from '@/components/Suggest/Suggest'
import SearchMixin from '@/mixins/SearchMixin'
import AppMultiTab from '@/base/MultiTab/MultiTab'
import AppSongList from '@/base/SongList/SongList'
import AppScroll from '@/base/Scroll/Scroll'
import AppSearchList from '@/base/SearchList/SearchList'
import { GETTER_TYPES as COMMON_GETTER_TYPES } from '@/store/common/getters'
import { ACTION_TYPES as COMMON_ACTION_TYPES } from '@/store/player/actions'
import { mapGetters, mapActions } from 'vuex'
import Song from 'common/js/song'

export default {
  mixins: [SearchMixin],
  data() {
    return {
      showFlag: false,
      query: '',
      tabs: [
        { title: '最近播放' },
        { title: '搜索历史' }
      ],
      currentIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'playHistory',
      'searchHistory'
    ])
  },
  created() {

  },
  methods: {
    ...mapActions(['setPlayHistory', 'addToPlaylist']),
    onSelect() {
      this.hide()
    },
    selectItem(item) {
      this.addToPlaylist(item)
    },
    switchTab(index) {
      this.currentIndex = index
    },
    show() {
      this.showFlag = true
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.songList.refresh()
        } else {
          this.$refs.searchList.refresh()
        }
      }, 20)
    },
    hide() {
      this.showFlag = false
    }
  },
  components: {
    AppSearchBox,
    AppSuggest,
    AppMultiTab,
    AppSongList,
    AppScroll,
    AppSearchList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  background: $color-background;

  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter, &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .header {
    position: relative;
    height: 44px;
    text-align: center;

    .title {
      line-height: 44px;
      font-size: $font-size-large;
      color: $color-text;
    }

    .close {
      position: absolute;
      top: 0;
      right: 8px;

      .icon-close {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }

  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut {
    .list-wrapper {
      position: absolute;
      top: 165px;
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
  }

  .search-result {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }

  .tip-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;

    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }

    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
}
</style>