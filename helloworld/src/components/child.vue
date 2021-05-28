<template>
  <div class="child">
    <label for="test">请输入文件路径</label>
    <input ref="input_ref" type="text" name="test" :value="innerValue" @change="valueChange" />
  </div>
</template>

<script>
export default {
    
  props: {
      innerValue:{
          type:String,
          default:''
      }
  },
  data() {
    return {
      // inputValue: this.innerValue || '',
    };
  },
  methods:{
      valueChange(event){
        // console.log(event)
          this.$emit('update:innerValue',event.target.value)
          console.log(this.$refs.input_ref.value)
      }
  }
};
</script>

<style>
.child{
    width: 300px;
    height: 40px;
    margin: 10px;
}
</style>