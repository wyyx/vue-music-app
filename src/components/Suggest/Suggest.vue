<template>
  <app-scroll ref="list" :data="result" :pullToRefresh="pullToRefresh" @scrollToEnd="searchMore" class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="play(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <app-loading v-show="hasMore" title="Searching..."></app-loading>
    </ul>
  </app-scroll>
</template>

<script >
import { search } from 'api/search'
import AppLoading from 'base/Loading/Loading'
import AppScroll from '@/base/Scroll/Scroll'
import { CODE_OK } from 'api/config'
import { mapGetters, mapActions } from 'vuex'
import { GETTER_TYPES as COMMON_GETTER_TYPES } from '@/store/common/getters'
import { ACTION_TYPES as PLAYER_ACTION_TYPES } from '@/store/player/actions'


const TYPE_SINGER = 'singer'
const PERPAGE = 20

export default {
  components: {
    AppScroll,
    AppLoading
  },
  props: {
    showSinger: {
      type: Boolean,
      default: true
    },
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      result: [],
      page: 1,
      pullToRefresh: true,
      hasMore: true
    }
  },
  computed: {
    ...mapGetters({ ...COMMON_GETTER_TYPES })
  },
  methods: {
    ...mapActions({ ...PLAYER_ACTION_TYPES }),
    play(item) {
      this.selectOnePlay(item)
      this.setFullScreen(true)
      this.$emit('select', item)
    },
    searchMore() {
      this.page++
      let totalPage = 3

      if (this.page < totalPage) {
        this.result = this.sampleList.slice(0, (this.page) * PERPAGE)
      } else {
        this.hasMore = false
        this.result = this.sampleList.slice()
        this.$refs.list.refresh()
      }
    },
    _search() {
      search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
        // api not available
        // if (res.code === CODE_OK) {
        //   console.log('search result', res)
        //   this.result = this._genResult(res.data)
        // }

        // use sample song list
        this.result = this.sampleList.slice(0, 20)
      })
    },
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
  },
  watch: {
    query(newQuery) {
      this._search(newQuery)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: $color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;

      .text {
        no-wrap();
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