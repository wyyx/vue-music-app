<template>
  <app-scroll :data="data" :listen-scroll="listenScroll" :probeType="3" @scroll="onScroll" class="listview" ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li v-for="item in group.items" @click="selectItem(item)" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul>
        <li @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" v-for="(item, index) in shortcutList" :data-index="index" class="item" :class="{current: index === currentIndex}">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <app-loading></app-loading>
    </div>
  </app-scroll>
</template>

<script type="text/ecmascript-6">
import AppScroll from 'base/Scroll/Scroll'
import AppLoading from 'base/Loading/Loading'
import { getData } from 'common/js/dom'


const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 18

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY < 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  data() {
    return {
      currentIndex: 0,
      touch: {},
      listenScroll: true,
      probeType: 3,
      groupHeightList: [],
      scrollY: 0,
      diff: 0
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    onShortcutTouchStart(e) {

      let anchorIndex = getData(e.target, 'index')

      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = Math.round((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT)
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta

      this._scrollTo(anchorIndex)
    },
    _scrollTo(index) {
      if (index == 0) {
        this.scrollY = 0
      } else {
        this.scrollY = this.groupHeightList[index - 1]
      }

      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    onScroll(position) {
      this.scrollY = -position.y
    },
    calculateGroupHeight() {
      let height = 0
      let groupRefList = this.$refs.listGroup
      for (const groupRef of groupRefList) {
        height += groupRef.clientHeight
        this.groupHeightList.push(height)
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.calculateGroupHeight()
      }, 20)
    },
    scrollY() {
      // console.log('y', this.scrollY)
      let height1 = 0
      let height2 = 0

      for (let i = 0; i < this.groupHeightList.length; i++) {
        height1 = 0
        height2 = this.groupHeightList[i]

        if (this.scrollY >= height1 && this.scrollY < height2) {
          this.currentIndex = i

          this.diff = height2 - this.scrollY
          return
        }
      }
    },
    diff() {
      if (this.diff >= 0 && this.diff < TITLE_HEIGHT) {
        let translateY = -(TITLE_HEIGHT - this.diff)
        this.$refs.fixed.style.transform = `translate3d(0,${translateY}px,0)`
      } else {
        this.$refs.fixed.style.transform = `translate3d(0,0px,0)`
      }
    }

  },
  components: {
    AppScroll,
    AppLoading
  }
}


</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
