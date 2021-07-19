import Vue from 'vue';
import { encrypt } from './utils/encrypt';
import { debounce } from 'throttle-debounce';
/**
 * TipManager类
 * @class TipManager
 * @param {HTMLElement} el - TipManager实例的父级DOM元素.
 * @param {Object} binding
 * @param {String} binding.value - 指令的绑定值，即提示文本
 * @param {Object} binding.modifiers - 一个包含修饰符的对象，用来确定tooltip显示位置
 * @return {Object} instance - 返回一个 TipManager 的实例
 * @example
 * <button v-tip="'我是提示框'"> </button>  默认在绑定DOM元素下方显示
 * @example
 * <button v-tip.left="'我是提示框'"></button>  传入修饰符，自定义提示框显示位置，可传入 top|right|bottom|left
 */
class TipManager {
  constructor(el, binding) {
    this.el = el;
    this.binding = binding;
    this.tipTextEncoded = encrypt(binding.value);
    this.isKnown = TipManager.tipStatus.includes(this.tipTextEncoded);
    this.initCreateTip();
  }
  initCreateTip() {
    this.textTipArea = document.createElement('div');
    this.circleTipArea = document.createElement('div');
    this.tipText = document.createElement('span');
    this.button = document.createElement('button');
    this.tipText.innerHTML = `${this.binding.value}`;
    this.button.innerHTML = '确认';
    this.el.style.position = 'relative';
    this.textTipArea.className += '_tipArea';
    this.circleTipArea.className += 'circleTip';
    this.tipText.className += 'inner_text';
    this.button.className += 'inner_button';
    this.textTipArea.appendChild(this.tipText);
    this.textTipArea.appendChild(this.button);
    this.el.appendChild(this.textTipArea);
    this.el.appendChild(this.circleTipArea);
    TipManager.activeTipTextArr.push(this.tipTextEncoded);
    // 判断是否显示红圈提醒
    if (this.isKnown) {
      this.circleTipArea.style.display = 'none';
    } else {
      TipManager.tipCount++;
      if (TipManager.tipCount > 5) {
        this.circleTipArea.style.display = 'none';
      }
    }
    // 提示框淡入淡出效果
    this.textTipArea.addEventListener('transitionend', () => {
      this.textTipArea.style.display = 'none';
    });
    this.button.addEventListener('click', (event) => {
      event.stopPropagation();
      this.isKnown = true;
      this.hideTip();
      addconfirmedItem(this.tipTextEncoded);
      removeInvalidItem(TipManager.tipStatus, TipManager.activeTipTextArr);
    });
  }
  setStyle() {
    Vue.nextTick(() => {
      this.setPlacement();
    }, 0);
  }
  // 设置文本提示显示位置
  setPlacement() {
    // 获取包含修饰符的对象
    let modifiers = this.binding.modifiers;
    // 获取 el 元素宽高及内外边距用于计算位置
    let elStyle = getStyle(this.el);
    let el_border_width = Number(elStyle.borderWidth.slice(0, -2));
    let el_width = Number(elStyle.width.slice(0, -2));
    let el_height = Number(elStyle.height.slice(0, -2));
    // 计算tooltip的基础数据
    let tipStyle = getStyle(this.textTipArea);
    let tip_paddingTop = Number(tipStyle.paddingTop.slice(0, -2));
    let tip_paddingBottom = Number(tipStyle.paddingBottom.slice(0, -2));
    let tip_paddingLeft = Number(tipStyle.paddingLeft.slice(0, -2));
    let tip_paddingRight = Number(tipStyle.paddingRight.slice(0, -2));
    let tip_width =
      Number(tipStyle.width.slice(0, -2)) + tip_paddingRight + tip_paddingLeft;  // 有问题
    let tip_height =
      Number(tipStyle.height.slice(0, -2)) + tip_paddingBottom + tip_paddingTop;
    // 是否传入显示位置修饰符，默认下方显示
    if (Object.keys(modifiers).length !== 0) {
      for (let attrs in modifiers) {
        if (attrs == 'top') {
          let left = (el_width - tip_width) / 2 + 'px';
          this.textTipArea.style.cssText = `top: 0px;left: 0px;transform: translate(${left},-105%);`;
        } else if (attrs == 'right') {
          let left = el_width + 'px';
          let top = (el_height - tip_height) / 2 + 'px';
          this.textTipArea.style.cssText = `top: 0px;left: 0px;transform: translate(${left},${top})`;
        } else if (attrs == 'left') {
          let left = -(tip_width + el_border_width * 2) + 'px';
          let top = (el_height - tip_height) / 2 + 'px';
          this.textTipArea.style.cssText = `top: 0px;left: 0px;transform: translate(${left},${top});`;
        } else if (attrs == 'bottom') {
          let top = el_height + 'px';
          let left = (el_width - tip_width) / 2 + 'px';
          this.textTipArea.style.cssText += `top: 0px;left: 0px;transform: translate(${left},${top});`;
        }
      }
    } else {
      let top = el_height + 'px';
      let left = (el_width - tip_width) / 2 + 'px';
      this.textTipArea.style.cssText = `top: 0px;left: 0px;transform: translate(${left},${top});`;
    }
    // 设置红点提示的样式
    this.circleTipArea.style.cssText += `top: 0px; right: 0px`;
  }

  showTip() {
    setTimeout(() => {
      this.textTipArea.style.display = 'block';
    }, 0);

    this.textTipArea.style.opacity = 1;
  }
  
  hideTip() {
    this.textTipArea.style.opacity = 0;
    if (this.isKnown) {
      this.circleTipArea.style.display = 'none';
    }
  }
}
TipManager.tipStatus = getTipStatus();
TipManager.activeTipTextArr = [];
TipManager.tipCount = 0;

function getTipStatus() {
  return JSON.parse(localStorage.getItem('tipStatus'))
    ? JSON.parse(localStorage.getItem('tipStatus'))
    : [];
}

// 将用户已“确认”的提示存入记忆数组
function addconfirmedItem(tipTextEncoded) {
  TipManager.tipStatus.push(tipTextEncoded);
  localStorage.setItem('tipStatus', JSON.stringify(TipManager.tipStatus));
}

// 清理掉“过期”的tooltip提示文本
const removeInvalidItem = debounce(550, (tipStatus, activeTipTextArr) => {
  for (var i = 0; i < tipStatus.length; i++) {
    if (!activeTipTextArr.includes(tipStatus[i])) {
      tipStatus.splice(i, 1); 
      i--; // 如果不减，将漏掉一个元素
    }
  }
  localStorage.removeItem('tipStatus');
  localStorage.setItem('tipStatus', JSON.stringify(tipStatus));
});

// 获取 DOM 元素的宽高及内外边距
function getStyle(dom) {
  let el_style = window.getComputedStyle(dom);
  let elStyle = {};
  elStyle.width = el_style.width;
  elStyle.height = el_style.height;
  elStyle.paddingBottom = el_style.paddingBottom;
  elStyle.paddingLeft = el_style.paddingLeft;
  elStyle.paddingRight = el_style.paddingRight;
  elStyle.paddingTop = el_style.paddingTop;
  elStyle.borderWidth = el_style.borderWidth;
  return elStyle;
}

let options = {
  bind(el, binding) {
    // 对传入值 binding.value 进行编码，将通过编码后的值是否存在于用户已“确认”的数组中来判断是否提示用户更新
    let tipManager = new TipManager(el, binding);
    tipManager.setStyle();

    el.onmousemove = () => {
      if (!tipManager.isKnown) {
        tipManager.showTip();
      } else {
        tipManager.hideTip();
      }
    };
    el.onmouseout = () => {
      tipManager.hideTip();
    };
  },
};
export default options;
