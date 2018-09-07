<template>
  <ul class="multi-tab">
    <li class="tab-item" v-for="(item,index) in tabs" :class="{'active':currentIndex === index}" @click="switchTab(index)">
      <span>{{item.title}} </span>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    tabs: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchTab(index) {
      this.$emit('tab', index)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.multi-tab {
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid $color-highlight-background;
  border-radius: 5px;

  .tab-item {
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-text-d;

    &.active {
      background: $color-highlight-background;
      color: $color-text;
    }
  }
}
</style>