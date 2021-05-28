<template>
  <div class="test">
      <div>{{count}}</div>
      <button @click="add">add</button>
  </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    computed:{
        count(){
            return this.$store.state.count
        }
    },
    methods:{
        add(){
            this.$store.commit('add')
        }
    }
}
</script>

<style scoped>
.test{
    width: 200px;
    height: 200px;
    background-color: blue;
}
button{
    position:absolute;
    left: 200;
}
</style>