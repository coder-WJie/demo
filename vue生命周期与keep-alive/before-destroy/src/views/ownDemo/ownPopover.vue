<template>
  <span>
      <div class="popper" v-el:popper v-show="visible">
        <span v-text="content"></span>
      </div>
      <div class="rel" v-el:reference>
        <slot></slot>
      </div>
    </span>
</template>

<script>
import Popper from 'vue-popper'

export default {
  mixins: [Popper],

  props: {
    content: String,
    visibleArrow: {
      default: true
    }
  },

  template: `
    <span>
      <div class="popper" v-el:popper v-show="visible">
        <span v-text="content"></span>
      </div>
      <div class="rel" v-el:reference>
        <slot></slot>
      </div>
    </span>
  `
}
</script>

<style scoped>
div {
    background-color: blue;
}
</style>