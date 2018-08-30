<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(dot, index) in dots" :class="{ active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'

export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      slider: {},
      sliderGroupChildren: {},
      dots: [],
      currentPageIndex: 0,
      autoPlayTimer: {}
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._autoPlay()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }

      this._setSliderWidth()
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth() {
      this.sliderGroupChildren = this.$refs.sliderGroup.children

      let totalWidth = 0
      let sliderWidth = this.$refs.slider.clientWidth

      for (let i = 0; i < this.sliderGroupChildren.length; i++) {
        let child = this.sliderGroupChildren[i]
        addClass(child, 'slider-item')

        child.style.width = sliderWidth + 'px'
        totalWidth += sliderWidth

      }

      // add a sliderWidth on the each side
      if (this.loop) {
        totalWidth += 2 * sliderWidth
      }

      this.$refs.sliderGroup.style.width = totalWidth + 'px'
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.2,
          speed: 400
        }
      })

      this.slider.on('scrollEnd', () => {
        this.currentPageIndex = this.slider.getCurrentPage().pageX

        if (this.autoPlay) {
          this._autoPlay()
        }
      })

      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.autoPlayTimer)
        }
      })
    },
    _initDots() {
      this.dots = new Array(this.sliderGroupChildren.length)
    },
    _autoPlay() {
      this.autoPlayTimer = setTimeout(() => {
        if (this.currentPageIndex + 1 >= this.sliderGroupChildren.length - 2) {
          // go to first slider when it's end
          this.slider.goToPage(0, 0, 400)
        } else {
          // go to next slider
          this.slider.goToPage(this.currentPageIndex + 1, 0, 400)
        }
      }, this.interval)
    }
  },
  destroyed() {
    clearTimeout(this.autoPlayTimer)
  }

}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>