import Vue from 'vue';
import { encrypt } from './utils/encrypt';
// 根据placement设置样式
function setStyle(el, binding, tooltip) {
  Vue.nextTick(() => {
    // 计算位置
    setPlacement(el, binding, tooltip);
  }, 0);
}

// 获取 DOM 元素的宽高及内外边距
function getStyle(dom) {
  // getComputedStyle()方法获取的宽高不包括内边距
  let el_style = window.getComputedStyle(dom);
  let elStyle = {};
  elStyle.width = el_style.width;
  elStyle.height = el_style.height;
  elStyle.paddingBottom = el_style.paddingBottom;
  elStyle.paddingLeft = el_style.paddingLeft;
  elStyle.paddingRight = el_style.paddingRight;
  elStyle.paddingTop = el_style.paddingTop;
  elStyle.borderWidth = el_style.borderWidth;
  // console.log('------------getStyle---------------');
  return elStyle;
}

// 设置tooltip显示位置
function setPlacement(el, binding, tooltip) {
  // 获取包含修饰符的对象
  let modifiers = binding.modifiers;
  // 获取 el 元素宽高及内外边距用于计算位置
  let elStyle = getStyle(el);
  let el_border_width = Number(elStyle.borderWidth.slice(0, -2));
  let el_width = Number(elStyle.width.slice(0, -2));
  let el_height = Number(elStyle.height.slice(0, -2));
  // 计算tooltip的基础数据
  let tipStyle = getStyle(tooltip);
  let tip_paddingTop = Number(tipStyle.paddingTop.slice(0, -2));
  let tip_paddingBottom = Number(tipStyle.paddingBottom.slice(0, -2));
  let tip_paddingLeft = Number(tipStyle.paddingLeft.slice(0, -2));
  let tip_paddingRight = Number(tipStyle.paddingRight.slice(0, -2));
  let tip_border_width = Number(tipStyle.borderWidth.slice(0, -2));
  let tip_width =
    Number(tipStyle.width.slice(0, -2)) + tip_paddingRight + tip_paddingLeft;
  let tip_height =
    Number(tipStyle.height.slice(0, -2)) + tip_paddingBottom + tip_paddingTop;
  // 计算使用值
  for (let attrs in modifiers) {
    if (attrs == 'top') {
      let left = (el_width - tip_width) / 2 + 'px';
      tooltip.style.cssText = `top: 0px;left: 0px;transform: translate(${left},-105%);`;
    } else if (attrs == 'right') {
      let left = el_width + 'px';
      let top = (el_height - tip_height) / 2 + 'px';
      tooltip.style.cssText = `top: 0px;left: 0px;transform: translate(${left},${top})`;
    } else if (attrs == 'bottom') {
      let top = el_height + 'px';
      let left = (el_width - tip_width) / 2 + 'px';
      tooltip.style.cssText = `top: 0px;left: 0px;transform: translate(${left},${top});`;
    } else if (attrs == 'left') {
      let left = -(tip_width + el_border_width * 2) + 'px';
      let top = (el_height - tip_height) / 2 + 'px';
      tooltip.style.cssText = `top: 0px;left: 0px;transform: translate(${left},${top});`;
    }
  }
}

let options = {
  bind(el, binding, vnode) {
    console.log('vnode', vnode);
    // 初始化
    // let tooltip = document.createElement('div');
    let oTip = document.createElement('div');
    let tipText = document.createElement('span');
    let button = document.createElement('button');
    tipText.innerHTML = `${binding.value}`;
    button.innerHTML = '确认';
    el.style.position = 'relative';
    oTip.className += '_tipArea';
    tipText.className += 'inner_text';
    button.className += 'inner_button';
    oTip.appendChild(tipText);
    oTip.appendChild(button);
    el.appendChild(oTip);
    // 设置样式
    setStyle(el, binding, oTip);
    // 取出 localstorage 里 存储的 tipStatus 对象
    let tipStatus = JSON.parse(localStorage.getItem('tipStatus'))
      ? JSON.parse(localStorage.getItem('tipStatus'))
      : {};
    // 对传入值 binding.value 进行编码，判断是否提示用户更新
    let tipTextEncoded = encrypt(binding.value);
    let isKnown = Object.keys(tipStatus).includes(tipTextEncoded)
      ? tipStatus[tipTextEncoded]
      : false;
    // 点击确认，不再显示 isKnown 标识需要记忆
    button.addEventListener('click', function confirm(event) {
      event.stopPropagation();
      hideTip();
      // 点击“确认”，存入状态
      tipStatus[tipTextEncoded] = true; // 用户已知
      localStorage.setItem('tipStatus', JSON.stringify(tipStatus));
      isKnown = true;
    });
    // 给vnode赋予唯一的key,实时渲染
    // vnode.key = tipTextEncoded
    console.log('vnode.key', vnode.key);
    // 显示隐藏tooltip
    function showTip() {
      oTip.style.display = 'block';
      oTip.style.opacity = 1;
    }
    function hideTip() {
      oTip.style.opacity = 0;
      oTip.style.display = 'none';
    }
    function isShow() {
      if (!isKnown) {
        showTip();
      } else {
        hideTip();
      }
    }
    // 鼠标移入移出显示隐藏tooltip
    el.onmousemove = () => {
      isShow();
    };
    el.onmouseout = () => {
      hideTip();
    };
  },
  update(el, binding) {
    // 指令绑定的值发生改变，tooltip提示更新
    // 更新时删除localStorage里存储的上一个键值对
    console.log('binding.value', binding.value);
    console.log('binding.oldValue', binding.oldValue);
    let oldValueEncoded = encrypt(binding.oldValue);
    let tipStatus = JSON.parse(localStorage.getItem('tipStatus'))
      ? JSON.parse(localStorage.getItem('tipStatus'))
      : {};
    if (Object.keys(tipStatus).includes(oldValueEncoded)) {
      delete tipStatus[oldValueEncoded];
      localStorage.removeItem('tipStatus');
      localStorage.setItem('tipStatus', JSON.stringify(tipStatus));
    }
  },
};

export default options;
