<template>
  <div class="singer" ref="singer">
    <app-list-view :data="singers" @select="onSelectSinger" ref="list"></app-list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { CODE_OK } from 'api/config'
import Singer from 'common/js/singer'
import AppListView from 'base/ListView/ListView'
import { mapActions, mapGetters } from 'vuex'
import { ACTION_TYPES as SINGER_ACTION_TYPES } from '@/store/singer/actions'
import PlaylistMixin from '@/mixins/PlaylistMixin'


const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  mixins: [PlaylistMixin],
  components: {
    AppListView
  },
  data() {
    return {
      singers: []
    }
  },
  computed: {
    ...mapGetters(['playlist'])

  },
  created() {
    this._getSingerList()
  },
  methods: {
    ...mapActions({ ...SINGER_ACTION_TYPES }),
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    onSelectSinger(singer) {
      // console.log('singer', singer)
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === CODE_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      // 为了得到有序列表，我们需要处理 map
      let hot = []
      let remain = []

      for (let key in map) {
        let value = map[key]
        if (value.title.match(/[a-zA-Z]/)) {
          remain.push(value)
        } else if (value.title === HOT_NAME) {
          hot.push(value)
        }
      }
      remain.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(remain)
    },

  }

}

</script>

<style scoped lang="stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
