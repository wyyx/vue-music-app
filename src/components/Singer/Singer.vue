<template>
  <div class="singer" ref="singer">
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { CODE_OK } from 'api/config'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === CODE_OK) {
          console.log('this.singers', res.data.list)

        }
      })
    },

  }

}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
