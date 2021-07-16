<template>
  <div id="example">
    <div class="icon" v-tip.top="'背景色topDDDDDDDDDDDDDDDDDDDDDDDDDdddddddzcxcdsadad'"><i>top</i></div>
    <div class="icon" v-tip.right="'背景色right'"><i>right</i></div>
    <div class="icon" v-tip.left="'背景色left'"><i>left</i></div>
    <div class="icon" v-tip.bottom="'背景色bottom'"><i>bottom</i></div>
 
    <div class="card-wrap" v-clickoutside="bindClose">
      <input type="text" placeholder="请输入" @focus="cardIsShow = true">
      <ul class="card" v-show="cardIsShow">
        <li v-for="val of 3" :key="val" @click="cardIsShow = false">{{val}}</li>
      </ul>
    </div>
  </div>
</template>
 
<script>
var obj = {
  foo: 'bar'
}
 
export default {
  name: 'HelloWorld',
  data () {
    return {
      cardIsShow: false,
    }
  },
  components: {
  },
  computed:{
    
  },
  created() {
  },
  methods:{
    bindClose() {
      this.cardIsShow = false;
    },
    show() {}
  },
  directives: {
    tip: {
      inserted: function(el, binding) {
        let oTip = document.createElement('div'),
            modifiers = binding.modifiers;
        oTip.innerHTML = `<div>${binding.value}</div>`;
        oTip.className='v-tooltip__content';
        el.style.position = 'relative';
        el.className += " tip"
        console.log('el.className',el.className);
        el.appendChild(oTip);
        for(let attr in modifiers) {
          if(attr == 'top') {
            oTip.style.cssText = 'left: 50%; top: -10px;  transform: translate(-50%,-100%);';
          }else if(attr == 'right') {
            oTip.style.cssText = 'right: -10px; top: 50%; transform: translate(100%,-50%)';
          }else if( attr == 'left') {
              oTip.style.cssText = 'left: -10px; top: 50%; transform: translate(-100%,-50%)';
          }else {
              oTip.style.cssText = 'left: 50%; bottom: -10px; transform: translate(-50%,100%)';
          }
        }
        /* el.onmousemove = function() {
          // oTip.style.opacity = 1;
        } */
        el.onmouseout = function() {
          oTip.style.opacity = 0;
        }
      }
    },
    clickoutside: {
      bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是bindClose方法
                binding.value(e);
            }
          }
          // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
          el.__vueClickOutside__ = documentHandler;
          document.addEventListener('click', documentHandler);
      },
      unbind(el, binding) {//只调用一次，指令与元素解绑时调用,指的是DOM元素被VUE移除，如通过v-if判断移除
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    }
  }
      
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 
.v-tooltip__content {
    background: #616161;
    border-radius: 2px;
    color: #fff;
    font-size: 12px;
    line-height: 12px;
    padding: 5px 8px;
    position: absolute;
    transition: 0.95s cubic-bezier(0.25, 0.8, 0.5, 1);
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    display: block;
    /* width: auto; */
    white-space: normal;
    opacity: 0;
    max-width: 300px;
    min-width: 30px;
    
}
 
</style>
 
<style scoped>
  ul,li {
    margin: 0;
    list-style: none;
    padding: 0;
  }
  .icon {
    margin-bottom: 50px;
    position: relative;
    width: 100px;
    line-height: 35px;
    border: 1px solid #ccc;
    margin-left: 100px;
  }
  
  .card-wrap {
    position: relative;
    width: 200px;
    margin-top: 50px;
  }
  .card-wrap input {
    line-height: 32px;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    padding: 0 5px;
  }
  .card-wrap .card {
    position: absolute;
    left: 0;
    top: 36px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    padding: 20px 0;
  }
  .card-wrap .card li {
    line-height: 32px;
    margin-bottom: 20rpx;
 
  }
  .card-wrap .card li:hover {
    background: #f5f5f5;
  }
  .tip {
    background-color: red;
  }
  .tip:hover .v-tooltip__content{
    opacity: 1;
  }
</style>
 