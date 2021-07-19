<template>
  <div>
    <button v-tip="'sdasdsafdfdssdvcsxsaxs弹出框'" @click="tz">
      点击1
    </button>
    
    <br />
    <br />
    <br />
    <button v-tip.right="rightText" @click="tz">
      点击2
    </button>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <button v-tip.left="status ? 'aad' : 'ddsa'" @click="tz">
      点击3
    </button>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <button v-tip.bottom="'动dsada'" @click="tz">
      点击3
    </button>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <button v-tip.bottom="'萨芬范德aasadf萨'" @click="tz">
      点击3
    </button>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <button v-tip.bottom="'safasdsad'" @click="tz">
      点击3
    </button>
    <br />
    <br />
    <br />
    <br />
    <br />
    <button v-tip="'我i急急急急ssss哈哈哈的'" @click="tz">
      点击5
    </button>
  </div>
</template>

<script>
import { createHmac } from 'crypto';
import { encrypt } from '../utils/encrypt';
export default {
  data() {
    return {
      message: '我是弹出框',
      count: 2,
      status: true,
      rightText: '我是弹出框我i实多家分店你啊三角地和操作，',
      visible: false,
    };
  },
  methods: {
    tz() {
      this.status = !this.status;
      this.rightText += 'w';
      console.log('this.rightText', this.rightText);
      console.log('this.status', this.status);
      // this.$router.replace('/home');
    },
  },
};
</script>

<style scoped>
div {
  /* display: flex; */
  /* justify-content: space-between; */
  width: 100%;
  height: 800px;
  background-color: skyblue;
}
button {
  width: 40px;
  height: 40px;
  padding:5px 0px 0px 10px;
  margin: 0;
}
</style>
