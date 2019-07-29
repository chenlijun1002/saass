import moment from 'moment';
import React from 'react';
import nzh from 'nzh/cn';
import { parse, stringify } from 'qs';

function getCookieName(service_type) {
  let cookieName = '';
  switch (service_type) {
    case 'pro':
      cookieName = 'token';
      break;
    case 'fat':
      cookieName = 'fat_token';
      break;
    case 'dev':
      cookieName = 'dev_token';
      break;
    case 'uat':
      cookieName = 'uat_token';
      break;
  }
  return cookieName;
}
export function getToken() {
  let token = '';
  let cookieName = getCookieName(SERVICE_TYPE);
  if (document.cookie) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let itemCookie = cookies[i].split('=');
      if (itemCookie[0] == cookieName || itemCookie[0] == ' ' + cookieName) {
        token = itemCookie[1];
      }
    }
  }
  return token;
}
export function getMainHost() {
  let key = `mh_${Math.random()}`;
  let keyR = new RegExp(`(^|;)\\s*${key}=12345`);
  let expiredTime = new Date(0);
  let domain = document.domain;
  let domainList = domain.split('.');

  let urlItems = [];
  // 主域名一定会有两部分组成
  urlItems.unshift(domainList.pop());
  // 慢慢从后往前测试
  while (domainList.length) {
      urlItems.unshift(domainList.pop());
      let mainHost = urlItems.join('.');
      let cookie = `${key}=${12345};domain=.${mainHost}`;

      document.cookie = cookie;

      //如果cookie存在，则说明域名合法
      if (keyR.test(document.cookie)) {
          document.cookie = `${cookie};expires=${expiredTime}`;
          return mainHost;
      }
  }
}
export function clearTokenCookie(mainHost) {
  let cookieName = getCookieName(SERVICE_TYPE);
  document.cookie = `${cookieName}=0;domain=${mainHost};expires=${new Date(0).toUTCString()}`;
}
export function getAuthorityRouters(menus) {
  let routers = ['/index'];
  if (menus) {
    menus.forEach(item => {
      routers.push(item.path);
      if (item.menus && item.menus.length > 0) {
        item.menus.forEach(cItem => {
          if (cItem.menus && cItem.menus.length > 0) {
            cItem.menus.forEach(cCItem => {
              routers.push(cCItem.path);
            });
          }
        });
      }
    });
  }
  return [...new Set(routers)];
}
//获取所有菜单 将多级菜单转换为一级 并拼上店铺ID
export function getAllMenus(multiMenus,storeId) {
  let menus = [];
  function screenRouter(menu) {
    menu.forEach(item => {
      if (item.menus) {
        screenRouter(item.menus,storeId);
      }
      if (item.path) {
        let menu={...item,path:'/'+storeId+item.path,menus:[]}
        menus.push(menu);
      }
   
    });
  }
  screenRouter(multiMenus);
  return menus;
}

export function getMenuList(menus, level) {
  let routers = [];
  if (menus) {
    if (level == 'one') {
      menus.forEach(item => {
        routers.push({
          path: item.path,
          name: item.name,
        });
      });
    } else if (level == 'two') {
      menus.forEach(item => {
        if (item.menus && item.menus.length > 0) {
          item.menus.forEach(cItem => {
            if (cItem.menus && cItem.menus.length > 0) {
              cItem.menus.forEach(cCItem => {
                routers.push({
                  path: cCItem.path,
                  name: cCItem.name,
                });
              });
            }
          });
        }
      });
    }
  }
  return routers;
}
export function getSystemRouters(router) {
  let routers = [];
  function screenRouter(menus) {
    menus.forEach(item => {
      if (item.path) {
          routers.push(item.path);
      }
      if (item.routes) {
        screenRouter(item.routes);
      }
    });
  }
  screenRouter(router);
  return routers;
}
export function getAllRouters(menuData) {
  let routers = [];
  function screenRouter(menus) {
    menus.forEach(item => {
      if (item.path) {
          routers.push(item.path);
      }
      if (item.children) {
        screenRouter(item.children);
      }
    });
  }
  screenRouter(menuData);
  return [...new Set(routers)];
}
/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}

export function transformChinese  (num) {
  let text='';
  if(num==1){
    text='一';
  }else if(num==2){
    text='二';
  }else if(num==3){
    text='三';
  }else if(num==4){
    text='四';
  }else if(num==5){
    text='五';
  }else if(num==6){
    text='六';
  }else if(num==7){
    text='七';
  }else if(num==8){
    text='八';
  }else if(num==9){
    text='九';
  }else{
    text='十';
  }
  return text;
}

export function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min){ 
      h = s = 0; // achromatic
  } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }

  return [h, s, l];
}

export function hslToRgb(h, s, l) {
  var r, g, b;

  if(s == 0) {
      r = g = b = l; // achromatic
  } else {
      var hue2rgb = function hue2rgb(p, q, t) {
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function colorRgb (){
  var sColor = this.toLowerCase();
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i=1; i<4; i+=1) {
              sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
          }
          sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var i=1; i<7; i+=2) {
          sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
      }
      return "RGB(" + sColorChange.join(",") + ")";
  }
  return sColor;
};

export function colorHex(){
  var that = this;
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(that)) {
      var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      var strHex = "#";
      for (var i=0; i<aColor.length; i++) {
          var hex = Number(aColor[i]).toString(16);
          if (hex.length < 2) {
              hex = '0' + hex;    
          }
          strHex += hex;
      }
      if (strHex.length !== 7) {
          strHex = that;    
      }
      return strHex;
  } else if (reg.test(that)) {
      var aNum = that.replace(/#/,"").split("");
      if (aNum.length === 6) {
          return that;    
      } else if(aNum.length === 3) {
          var numHex = "#";
          for (var i=0; i<aNum.length; i+=1) {
              numHex += (aNum[i] + aNum[i]);
          }
          return numHex;
      }
  }
  return that;
};
