import axios from 'axios';

import { NODE_ENV, HOST, PUBLIC_PATH } from '../../config';

function helperQs (el) {
  return document.querySelector(el);
}

function helperQsa (el) {
  return document.querySelectorAll(el);
}

function helperRwdImgPath (filename = [], breakpoints = []) {

  const screenWidth = window.innerWidth;
  const ArrSortBreakpoints = [...breakpoints, screenWidth].sort((a, b) => b - a);
  const breakpoint = screenWidth >= ArrSortBreakpoints[0]
    ? 1
    : ArrSortBreakpoints.findIndex((point) => screenWidth === point);

  return NODE_ENV === 'production'
    ? `${PUBLIC_PATH}${HOST}${PUBLIC_PATH}/static/images${filename[breakpoint - 1]}`
    : `static/images/${filename[breakpoint - 1]}`;

}

function helperStripTag (str) {
  const reTag = /<[^>]+>|&[^>]+;/g;
  return str.replace(reTag, '').trim();
}

function helperCheckVal (str, type = 'user') {
  let regExp;
  switch (type) {
    case 'user':
      regExp = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      break;
    case 'mobile':
      regExp = /^09\d{8}$/;
      break;
    case 'email':
    default:
      regExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  }
  if (regExp.test(str)) return true;
  return false;
}

function helperToggleClass (el, className, transitionClass = null) {

  const list = el.classList;
  const hasClassName = Array.from(list).some((el) => el === className);

  if (transitionClass) {
    list.add(transitionClass);
  }

  if (hasClassName) list.remove(className);
  else list.add(className);

}

function helperCryptoRandom (min, max) {
  const randomBuffer = new Uint32Array(1);
  (window.crypto || window.msCrypto).getRandomValues(randomBuffer);
  const randomNum = randomBuffer[0] / (0xffffffff + 1);
  return Math.floor(randomNum * (max - min + 1)) + min;
}

function helperGetScrollOffset () {
  if (window.pageYOffset != null) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset,
    };
  }
  if (document.compatMode === 'CSS1Compat') {
    return {
      left: document.documentElement.scrollLeft,
      top: document.documentElement.scrollTop,
    };
  }
  return {
    left: document.body.scrollLeft,
    top: document.body.scrollTop,
  };
}

function helperRefreshViewHeight (variable) {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty(variable, `${vh}px`);
}

async function helperGetAxios (
  url,
  params = {},
  options = {},
) {
  return await axios({
    method: 'get',
    url,
    responseType: 'json',
    ...options,
  });
}

async function helperPostAxios (
  url,
  params = {},
  options = {},
) {
  return await axios({
    method: 'post',
    url,
    data: params,
    ...options,
  });
}

export {
  helperQs,
  helperQsa,
  helperRwdImgPath,
  helperStripTag,
  helperCheckVal,
  helperToggleClass,
  helperCryptoRandom,
  helperGetScrollOffset,
  helperRefreshViewHeight,
};
