<template>
  <div class="search">
    <div class="search-box-wrapper">
      <app-search-box ref="searchBox" @queryChange="onQueryChange"></app-search-box>
    </div>

    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">

      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li @click="setQuery(item.k)" class="item" v-for="item in hotKey">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>

        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <app-search-list :searches="searchHistory" @delete="deleteHistory"></app-search-list>
        </div>

      </div>

    </div>

    <div class="search-result" v-show="query" ref="searchResult">
      <app-suggest ref="suggest" :query="query"></app-suggest>
    </div>
    <app-confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></app-confirm>
  </div>
</template>

<script>
import AppSearchBox from '@/base/SearchBox/SearchBox'
import AppSuggest from '@/components/Suggest/Suggest'
import AppSearchList from '@/base/SearchList/SearchList'
import AppConfirm from '@/base/Confirm/Confirm'
import AppScroll from '@/base/Scroll/Scroll'
import { getHotKey } from '@/api/search'
import { CODE_OK } from '@/api/config'
import { GETTER_TYPES as COMMON_GETTER_TYPES } from '@/store/common/getters'
import { ACTION_TYPES as COMMON_ACTION_TYPES } from '@/store/common/actions'
import { mapGetters, mapActions } from 'vuex'
import { playlistMixin } from 'common/js/mixin'


export default {
  mixins: [playlistMixin],
  data() {
    return {
      hotKey: [],
      query: '',
    }
  },
  computed: {
    ...mapGetters({ ...COMMON_GETTER_TYPES }),
    computedSearchHistory() {
      console.log('this.searchHistory', this.searchHistory)
      return this.searchHistory
    }
  },
  components: {
    AppSearchBox,
    AppSuggest,
    AppSearchList,
    AppConfirm,
    AppScroll
  },
  created() {
    this._getHotKey()
  },
  methods: {
    ...mapActions({ ...COMMON_ACTION_TYPES }),
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''

      this.$refs.searchResult.style.bottom = bottom

      this.$refs.shortcutWrapper.style.bottom = bottom
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    deleteHistory(history) {
      let searchHistory = this.searchHistory.slice()
      let index = searchHistory.findIndex(item => item === history)
      searchHistory.splice(index, 1)

      this.setSearchHistory(searchHistory)
    },
    clearSearchHistory() {
      this.removeAllSearchHistory()
    },
    onQueryChange(query) {
      this.query = query

      if (query) {
        this.addToSearchHistory(query)
      }
    },
    addToSearchHistory(query) {
      let searchHistory = this.searchHistory.slice()
      searchHistory.push(query)
      this.setSearchHistory(searchHistory)
    },
    setQuery(query) {
      this.$refs.searchBox.setQuery(query)
      this.query = query
      this.addToSearchHistory(query)
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === CODE_OK) {
          // console.log('data', res.data)
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.search {
  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 20px 20px 20px;

        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }

      .search-history {
        position: relative;
        margin: 0 20px;

        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;

          .text {
            flex: 1;
          }

          .clear {
            extend-click();

            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>