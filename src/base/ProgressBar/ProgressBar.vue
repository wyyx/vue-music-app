<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove" @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const progressBtnWidth = 16

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      touch: {}
    }
  },
  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.currentProgressWidth = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      const deltaX = e.touches[0].pageX - this.touch.startX
      const barWidth = this.$refs.progressBar.clientWidth
      console.log('this.touch.currentProgressWidth', this.touch.currentProgressWidth)
      const offsetWidth = Math.min(barWidth, Math.max(0, this.touch.currentProgressWidth + deltaX))
      this._offset(offsetWidth)
    },
    progressTouchEnd() {
      this.touch.initiated = false
      this._triggerPercent()
    },
    _offset(offsetWidth) {
      const btnWidth = this.$refs.progressBtn.clientWidth
      this.$refs.progress.style.width = `${offsetWidth}px`

      if (offsetWidth > 0) {
        offsetWidth = offsetWidth - btnWidth / 2 + 2
      }
      this.$refs.progressBtn.style['transform'] = `translate3d(${offsetWidth}px,0,0)`
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth
      const progressWidth = this.$refs.progress.clientWidth
      const percent = progressWidth / barWidth
      this.$emit('percentChange', percent)
    },
    progressClick(e) {
      const barWidth = this.$refs.progressBar.clientWidth
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = Math.min(barWidth, Math.max(0, e.pageX - rect.left))
      this._offset(offsetWidth)
      this._triggerPercent()
    },
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
      }

    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>