<template>
  <div class="recommend" ref="recommend">
    <app-scroll ref="scroll" :data="discList" class="recommend-content">
      <div>
        <div class="slider-wrapper" v-if="recommends.length > 0">
          <app-slider>
            <div v-for="recommend in recommends">
              <a :href="recommend.linkUrl">
                <img :src="recommend.picUrl">
              </a>
            </div>
          </app-slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item" @click="selectItem(item)">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="discList.length === 0">
        <app-loading></app-loading>
      </div>
    </app-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import AppSlider from 'base/Slider/Slider'
import AppScroll from 'base/Scroll/Scroll'
import AppLoading from 'base/Loading/Loading'
import { getRecommends, getDiscList } from 'api/recommend'
import { CODE_OK } from 'api/config'
import { playlistMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'
import { ACTION_TYPES as COMMON_ACTION_TYPES } from '@/store/common/actions';


export default {
  mixins: [playlistMixin],
  data() {
    return {
      recommends: [],
      discList: [],
      checkloaded: false
    }
  },
  created() {
    this._getDiscList()
    this._getRecommends()
  },
  components: {
    AppSlider,
    AppScroll,
    AppLoading
  },
  methods: {
    ...mapMutations({ ...COMMON_ACTION_TYPES }),
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    selectItem(item) {
      // console.log('item', item)
      this.setDisc(item)
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
    },
    _getRecommends() {
      getRecommends().then((res) => {
        if (res.code === CODE_OK) {
          // console.log('data', res)
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === CODE_OK) {
          // console.log('res', res)
          this.discList = res.data.list
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    position: relative;
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
    }
  }
}
</style>
