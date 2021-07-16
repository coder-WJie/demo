
 <template>
  <div class="box" v-show="this.hidden" @click.stop="clo_box">
    <div class="popup_content">
      <div class="popup_title">{{ this.title }}</div>
      <div class="popup_center">
        <div v-if="this.content_text">{{ this.content_text }}</div>
        <slot></slot>
      </div>
      <div class="popup_bottom">
        <button @click="popup_sub">确定</button>
        <button @click="popup_clo">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "默认标题",
    },
    content_text: {
      type: String,
      default: "",
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    //点击确定事件
    popup_sub() {
      this.$emit("popup_sub");
    },
    //点击了取消事件
    popup_clo() {
      this.$emit("popup_clo");
    },
    //点击了弹出框以外区域
    clo_box(e) {
      if (e.target._prevClass == "box") {
        this.$emit("clo_box")
      }
    },
  },
};
</script>

<style scoped>
.box {
  background-color: rgba(128, 128, 128, 0.507);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
}
.popup_content {
  background-color: white;
  padding: 1%;
  border-radius: 20px;
  width: 40%;
  margin: 10% auto;
}
.popup_title {
  text-align: center;
  font-weight: 600;
  font-size: 30px;
}
.popup_center {
  padding: 10%;
  font-size: 20px;
}
.popup_bottom {
  display: flex;
  justify-content: space-around;
}
button {
  width: 25%;
  height: 20%;
  padding: 2%;
  border: 1px solid gray;
  border-radius: 10px;
}
button:nth-child(1) {
  background-color: orangered;
  color: white;
  font-size: 20px;
}
button:nth-child(2) {
  background-color: gray;
  color: black;
  font-size: 20px;
}
</style>
