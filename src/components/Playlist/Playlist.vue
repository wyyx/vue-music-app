<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <app-play-mode class="icon" :size="30"></app-play-mode>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <app-scroll ref="listContent" :data="playlist" class="list-content">
          <transition-group ref="list" name="list" tag="ul">
            <li :key="item.id" class="item" v-for="(item,index) in playlist" @click="selectItem(item,index)">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like">
                <i class="icon-favorite"></i>
              </span>
              <span class="delete" @click.stop="deleteSong(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </app-scroll>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
            <span class="text" @click="addSong">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <app-confirm @confirm="clearPlaylist" ref="confirm" text="是否清空播放列表" confirmBtnText="清空"></app-confirm>
      <app-add-song ref="addSong"></app-add-song>
    </div>
  </transition>
</template>

<script>
import { playMode } from 'common/js/config'
import AppScroll from 'base/Scroll/Scroll'
import AppConfirm from 'base/Confirm/Confirm'
import AppPlayMode from '@/base/PlayMode/PlayMode'
import AppAddSong from '@/components/AddSong/AddSong'
import { GETTER_TYPES as PLAYER_GETTER_TYPES } from '@/store/player/getters'
import { ACTION_TYPES as PLAYER_ACTION_TYPES } from '@/store/player/actions'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'playlist',
  data() {
    return {
      showFlag: false,
    }
  },
  computed: {
    ...mapGetters({ ...PLAYER_GETTER_TYPES }),
    modeText() {
      return this.playMode === playMode.sequence ? '顺序播放' : this.playMode === playMode.random ? '随机播放' : '单曲循环'
    }
  },
  created() {
  },
  methods: {

    ...mapActions({ ...PLAYER_ACTION_TYPES }),
    addSong() {
      this.$refs.addSong.show()
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    clearPlaylist() {
      this.deleteAllFromPlaylist()
    },
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return 'icon-play'
      }
      return ''
    },
    selectItem(item, index) {
      this.setCurrentIndex(index)
      this.setPlayingState(true)
    },
    deleteSong(item) {
      this.deleteFromPlaylist(item)

    },
    scrollToCurrentSong() {
      // console.log('this.$refs.list.$el.children[this.currentIndex]', this.$refs.list.$el.children[this.currentIndex])
      this.$refs.listContent.scrollToElement(this.$refs.list.$el.children[this.currentIndex], 300)
    }
  },
  watch: {
    showFlag(flag) {
      // console.log('flag', flag)
      // console.log('this.currentIndex', this.currentIndex)
      if (flag) {
        this.scrollToCurrentSong()
      }
    }

  },
  components: {
    AppConfirm,
    AppScroll,
    AppPlayMode,
    AppAddSong
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;

  &.list-fade-enter-active, &.list-fade-leave-active {
    transition: opacity 0.3s;

    .list-wrapper {
      transition: all 0.3s;
    }
  }

  &.list-fade-enter, &.list-fade-leave-to {
    opacity: 0;

    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }

  &.list-fade-enter, .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: $color-highlight-background;

    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;

      .title {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 10px;
          font-size: 30px;
          color: $color-theme-d;
        }

        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
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

    .list-content {
      max-height: 240px;
      overflow: hidden;

      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;

        &.list-enter-active, &.list-leave-active {
          transition: all 0.1s;
        }

        &.list-enter, &.list-leave-to {
          height: 0;
        }

        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme-d;
        }

        .text {
          flex: 1;
          no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }

        .like {
          extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;

          .icon-favorite {
            color: $color-sub-theme;
          }
        }

        .delete {
          extend-click();
          font-size: $font-size-small;
          color: $color-theme;
        }
      }
    }

    .list-operate {
      width: 140px;
      margin: 20px auto 30px auto;

      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;

        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }

        .text {
          font-size: $font-size-small;
        }
      }
    }

    .list-close {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>