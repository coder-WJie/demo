import Vue from 'vue';
import { encrypt } from './utils/encrypt';
import { debounce } from 'throttle-debounce';
// tipStatus 已“确认”的tooltip文本组成的数组
let tipStatus = JSON.parse(localStorage.getItem('tipStatus'))
  ? JSON.parse(localStorage.getItem('tipStatus'))
  : [];
console.log('清除过期项之前的tipStatus', tipStatus);

// 目前正绑定的tooltip文本组成的数组
let activeTipTextArr = [];

// 当前有更新的tooltip数
let tipCount = 0;

// 将用户已“确认”的提示存入记忆数组
function addconfirmedItem(tipTextEncoded) {
  tipStatus.push(tipTextEncoded); // 用户已知
  // localStorage.removeItem('tipStatus');
  localStorage.setItem('tipStatus', JSON.stringify(tipStatus));
}

// 清理掉“过期”的tooltip提示文本
const removeInvalidItem = debounce(550, (tipStatus, activeTipTextArr) => {
  for (var i = 0; i < tipStatus.length; i++) {
    if (!activeTipTextArr.includes(tipStatus[i])) {
      tipStatus.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
      i--; // 如果不减，将漏掉一个元素
    }
  }
  localStorage.removeItem('tipStatus');
  localStorage.setItem('tipStatus', JSON.stringify(tipStatus));
  console.log(`----------清除之后的------------`, tipStatus);
});

// tooltip数++
function increaseTipCount() {
  tipCount++;
}

// 根据placement设置样式
function setStyle(el, binding, textTipArea, circleTipArea) {
  Vue.nextTick(() => {
    // 计算位置
    setTextTipAreaPlacement(el, binding, textTipArea);
    setCircleTipAreaPlacement(el, binding, circleTipArea);
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

// 设置文本提示框显示位置
function setTextTipAreaPlacement(el, binding, textTipArea) {
  // 获取包含修饰符的对象
  let modifiers = binding.modifiers;
  // 获取 el 元素宽高及内外边距用于计算位置
  let elStyle = getStyle(el);
  let el_border_width = Number(elStyle.borderWidth.slice(0, -2));
  let el_width = Number(elStyle.width.slice(0, -2));
  let el_height = Number(elStyle.height.slice(0, -2));
  // 计算tooltip的基础数据
  let tipStyle = getStyle(textTipArea);
  let tip_paddingTop = Number(tipStyle.paddingTop.slice(0, -2));
  let tip_paddingBottom = Number(tipStyle.paddingBottom.slice(0, -2));
  let tip_paddingLeft = Number(tipStyle.paddingLeft.slice(0, -2));
  let tip_paddingRight = Number(tipStyle.paddingRight.slice(0, -2));
  let tip_border_width = Number(tipStyle.borderWidth.slice(0, -2));
  let tip_width =
    Number(tipStyle.width.slice(0, -2)) + tip_paddingRight + tip_paddingLeft;
  let tip_height =
    Number(tipStyle.height.slice(0, -2)) + tip_paddingBottom + tip_paddingTop;
  // 是否传入显示位置修饰符，默认下方显示
  if (Object.keys(modifiers).length !== 0) {
    for (let attrs in modifiers) {
      if (attrs == 'top') {
        let left = (el_width - tip_width) / 2 + 'px';
        textTipArea.style.cssText = `top: 0px;left: 0px;transform: translate(${left},-105%);`;
      } else if (attrs == 'right') {
        let left = el_width + 'px';
        let top = (el_height - tip_height) / 2 + 'px';
        textTipArea.style.cssText = `top: 0px;left: 0px;transform: translate(${left},${top})`;
      } else if (attrs == 'left') {
        let left = -(tip_width + el_border_width * 2) + 'px';
        let top = (el_height - tip_height) / 2 + 'px';
        textTipArea.style.cssText = `top: 0px;left: 0px;transform: translate(${left},${top});`;
      } else if (attrs == 'bottom') {
        let top = el_height + 'px';
        let left = (el_width - tip_width) / 2 + 'px';
        textTipArea.style.cssText += `top: 0px;left: 0px;transform: translate(${left},${top});`;
      }
    }
  } else {
    let top = el_height + 'px';
    let left = (el_width - tip_width) / 2 + 'px';
    textTipArea.style.cssText = `top: 0px;left: 0px;transform: translate(${left},${top});`;
  }
}
// 设置圆圈提示显示位置
function setCircleTipAreaPlacement(el, binding, circleTipArea) {
  circleTipArea.style.cssText += `top: 0px; right: 0px`;
}

let options = {
  bind(el, binding, vnode) {
    console.log(`----------bind------------`);
    // 初始化
    let textTipArea = document.createElement('div');
    let circleTipArea = document.createElement('div');
    let tipText = document.createElement('span');
    let button = document.createElement('button');
    tipText.innerHTML = `${binding.value}`;
    button.innerHTML = '确认';
    el.style.position = 'relative';
    textTipArea.className += '_tipArea';
    circleTipArea.className += 'circleTip';
    tipText.className += 'inner_text';
    button.className += 'inner_button';
    textTipArea.appendChild(tipText);
    textTipArea.appendChild(button);
    el.appendChild(textTipArea);
    el.appendChild(circleTipArea);
    // 设置样式
    setStyle(el, binding, textTipArea, circleTipArea);
    // 对传入值 binding.value 进行编码，判断是否提示用户更新
    let tipTextEncoded = encrypt(binding.value);
    let isKnown = tipStatus.includes(tipTextEncoded);
    // 是否红点提示更新
    if (isKnown) {
      console.log(`----------${isKnown}------------`);
      hideCircleTipArea();
    } else {
      tipCount++;
      if (tipCount > 5) {
        hideCircleTipArea();
      }
    }
    // 把当前绑定的值存入一个数组，用来筛选出要删除的项
    activeTipTextArr.push(tipTextEncoded);

    // 点击确认，不再显示 isKnown 标识需要记忆
    button.addEventListener('click', function confirm(event) {
      event.stopPropagation();
      hideTip();
      // 点击“确认”，存入状态
      addconfirmedItem(tipTextEncoded);
      isKnown = true;
      // 删除过期文本
      console.log('tipStatus', tipStatus);
      console.log('activeTipTextArr', activeTipTextArr);
      removeInvalidItem(tipStatus, activeTipTextArr);
    });
    // 给vnode赋予唯一的key,实时渲染
    // vnode.key = tipTextEncoded
    // console.log('vnode.key', vnode.key);

    // 显示隐藏tooltip
    function showTip() {
      textTipArea.style.display = 'block';
      textTipArea.style.opacity = 1;
    }
    function hideTip() {
      textTipArea.style.opacity = 0;
      textTipArea.style.display = 'none';
      if (isKnown) {
        hideCircleTipArea();
      }
    }
    function hideCircleTipArea() {
      circleTipArea.style.display = 'none';
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
};
export default options;
