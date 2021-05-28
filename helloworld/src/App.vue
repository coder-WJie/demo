<template>
  <div id="app">
   <!-- <child @update:innerValue="outerValue = $event" :innerValue="outerValue" ></child> -->
   <!-- :innerValue.sync = "outerValue" -->
   <child :innerValue.sync="outerValue" ></child>
   <button @click="changeValue">点击</button>
   <div class="display" ref="dis_ref">{{outerValue}}</div>
   <child-2 :value.sync="outerValue2"></child-2>
    <p>{{outerValue2}}</p>
    <test-vuex></test-vuex>
  </div>
</template>

<script>
import Child from "./components/child.vue";
import Child2 from './components/child2.vue';
import TestVuex from './components/TestVuex'
export default {
  name: "App",
  data(){
    return {
      outerValue:'默认值',
      outerValue2:'morenzhi'
    }
  },
  watch:{
    outerValue(newV){
      console.log('新值：'+ newV)
    }
  },
  components: {
    Child,
    Child2,
    TestVuex
  },
  // updated(){
  //   this.outerChange()
  // },
 
  methods:{
    changeValue(){
      this.outerValue+= 'AAA'
      this.outerValue2+='BBB'
    }
    // outerChange(value){
    //   console.log(value)
    //   this.$refs.dis_ref.innerHTML = value
    //   this.outerValue = value
    // }
   }
};
</script>

<style>

.display{
  width: 300px;
  height: 300px;
  background-color: skyblue;
}
button{
  width: 80px;
  height: 30px;
  background-color: pink;
}
</style>
