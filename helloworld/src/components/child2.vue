<template>
  <div class="child2">
    <el-input
      placeholder="请选择日期"
      suffix-icon="el-icon-date"
      :value="value"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      ref="input_ref"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    
    onInput(value) {
    //   this.$forceUpdate()
    // this.value = value;
    //   this.$emit('input',value)
    this.$emit('update:value',value)
    },
    onFocus(event) {
      this.$emit("focus", event);
    },
    onBlur(event) {
      this.$emit("blur", event);
    },
    focus() {
      if (this.$refs && this.$refs.input_ref) {
        this.$refs.input_ref.focus();
      }
    },
    blur() {
      if (this.$refs && this.$refs.input_ref) {
        this.$refs.input_ref.blur();
      }
    },
  },
};
</script>

<style>
</style>