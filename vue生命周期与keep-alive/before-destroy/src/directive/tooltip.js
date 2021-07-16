import Vue from 'vue';
import { encrypt } from './utils/encrypt';
import { debounce } from 'throttle-debounce';
/**
 *
 */
class TipManager {
  constructor(el, binding, tipTextEncoded) {
    this.el = el;
    this.binding = binding;
    this.tipTextEncoded = tipTextEncoded;
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

    this.addActiveTipItem();
    // 判断是否显示红圈提醒
    if (this.isKnown) {
      this.circleTipArea.style.display = 'none';
    } else {
      TipManager.tipCount++;
      if (TipManager.tipCount > 5) {
        this.circleTipArea.style.display = 'none';
      }
    }
    // 点击确认，不再显示 isKnown 标识需要记忆
    // let this = this;
    // 给文本提示框添加 transitionend事件
    this.textTipArea.addEventListener('transitionend', () => {
      console.log(`----------transitionend------------`);
      this.textTipArea.style.display = 'none';
    });
    this.button.addEventListener('click', (event) => {
      console.log('this', this);
      event.stopPropagation();
      this.isKnown = true;
      this.hideTip();
      // 点击“确认”，存入状态
      addconfirmedItem(this.tipTextEncoded);
      removeInvalidItem(TipManager.tipStatus, TipManager.activeTipTextArr);
    });
  }
  // 向activeTipTextArr 添加当前tooltip的文本
  addActiveTipItem() {
    TipManager.activeTipTextArr.push(this.tipTextEncoded);
  }
  // 用户是否已知此次更新
  isKnown() {
    console.log(`----------isKnown------------`);
    return TipManager.tipStatus.includes(this.tipTextEncoded);
  }
  // 设置tooltip样式
  setStyle() {
    Vue.nextTick(() => {
      // 计算位置
      this.setTextTipAreaPlacement();
      this.setCircleTipAreaPlacement();
    }, 0);
  }
  // 设置文本提示显示位置
  setTextTipAreaPlacement() {
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
      Number(tipStyle.width.slice(0, -2)) + tip_paddingRight + tip_paddingLeft;
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
  }
  setCircleTipAreaPlacement() {
    this.circleTipArea.style.cssText += `top: 0px; right: 0px`;
  }
  // 隐藏红圈提示
  hideCircleTipArea() {
    console.log(`----------hideCircleTipArea------------`, this.circleTipArea);
  }
  // 显示tooltip提示框
  showTip() {
    setTimeout(() => {
      this.textTipArea.style.display = 'block';
    }, 0);

    this.textTipArea.style.opacity = 1;
  }
  // 隐藏tooltip提示框
  hideTip() {
    console.log(`----------hidetip------------`);
    this.textTipArea.style.opacity = 0;
    if (this.isKnown) {
      this.circleTipArea.style.display = 'none';
    }
  }
}
TipManager.tipStatus = getTipStatus();
TipManager.activeTipTextArr = [];
TipManager.tipCount = 0;

// 获取localStorage中的tipStatus
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
      tipStatus.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
      i--; // 如果不减，将漏掉一个元素
    }
  }
  localStorage.removeItem('tipStatus');
  localStorage.setItem('tipStatus', JSON.stringify(tipStatus));
  console.log(`----------清除之后的------------`, tipStatus);
});

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

let options = {
  bind(el, binding) {
    // 对传入值 binding.value 进行编码，判断是否提示用户更新
    let tipTextEncoded = encrypt(binding.value);
    let tipManager = new TipManager(el, binding, tipTextEncoded);
    // 设置样式
    tipManager.setStyle();

    // 把当前绑定的值存入一个数组，用来筛选出要删除的项
    TipManager.activeTipTextArr.push(tipTextEncoded);

    // 鼠标移入移出显示隐藏tooltip
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
