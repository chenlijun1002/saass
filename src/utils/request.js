import fetch from 'dva/fetch';
import { notification, Modal } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import hash from 'hash.js';
import { isAntdPro, getToken, clearTokenCookie } from './utils';
import showErrorMsg from '../utils/error';
import requestConfig from '@/pages/request-config';
const SERVICE_TYPE = APP_TYPE; //process.env.SERVICE_TYPE;
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status == 403) {
    response
      .clone()
      .text()
      .then(function(res) {
        if (!res) return;
        res = JSON.parse(res);
        if (res.Code == 403 && typeof res.Data == 'string' && res.Data.indexOf('http') > -1) {
          document.cookie = 'token=0;domain=xiaokeduo.net;expires=' + new Date(0).toUTCString();
          window.location.href = res.Data;
          return false;
        }
      });
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};
async function awaitDemo(res, second) {
  let result = await sleep(second);
  //console.log(result);// 两秒之后会被打印出来
  return res;
}
function sleep(second) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(' enough sleep~');
    }, second);
  });
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
// @connect(({ global }) => ({
//   global,
// }))
export default function request(
  url,
  options = {
    expirys: isAntdPro(),
  }
) {
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */

  if (window.authorization && getToken() != window.authorization) {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: '系统提示',
      content: `检测到已重新登录，页面将刷新 ${secondsToGo} s后将自动刷新`,
      onOk: () => {
        location.reload();
      },
    });
    setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `检测到已重新登录，页面将刷新 ${secondsToGo} s后将自动刷新.`,
      });
    }, 1000);
    setTimeout(() => {
      location.reload();
    }, secondsToGo * 1000);
    return false;
  }
  if (url.indexOf('WXAuth/GoToWeixin') <= -1) {
    url = DOMAIN + url;
  }
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const defaultOptions = {
    credentials: 'omit',
  };
  if (options.headers) {
    options.headers.Authorization = authorization;
    // options.headers.Authorization =
    //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjE1NzY3LCJ1bmFtZSI6IjE0NzgyMzg4OTg1Iiwib2VtaWQiOiIwIiwicmlkIjoiMCIsIm5iZiI6MTU0NDI0NjI0OSwiZXhwIjoxNTQ0MjkyMDAwLCJpc3MiOiJIaXNob3BYa2RQYXNzUG9ydCIsImF1ZCI6Ik1DSCJ9.R-_xImvWlRIKCB1EftTPWp5l4qo5UGD4DGy5WDDNCRI';
    //  options.headers['Req-Host'] = "xiaokeduo.com";
    options.headers['Req-Host'] = location.host;
  } else {
    options.headers = {
      // Authorization: authorization,
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaWQiOjE1NzY3LCJ1bmFtZSI6IjE0NzgyMzg4OTg1Iiwib2VtaWQiOiIwIiwicmlkIjoiMCIsIm5iZiI6MTU0NjkxOTMyOSwiZXhwIjoxNTQ2OTcwNDAwLCJpc3MiOiJIaXNob3BYa2RQYXNzUG9ydCIsImF1ZCI6Ik1DSCJ9.I0WG44eAlioIHeJizykk-XSOmQPWRKxyYnOf0uW9VtY',
      'Req-Host': 'xiaokeduo.com',
      //'Req-Host': location.host,
    };
  }
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        //"Cache-Control": "no-cache",
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        //"Cache-Control":" no-cache",
        ...newOptions.headers,
      };
    }
  }

  const expirys = options.expirys || 10;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }
  url = url.indexOf('?') > -1 ? `${url}&rend=${Math.random()}` : `${url}?rend=${Math.random()}`;
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      response
        .clone()
        .text()
        .then(function(res) {
          //全局抛出接口错误 错误信息对应errorjs文件
          if (!res) return;
          res = JSON.parse(res);
          if (res.Code == 30007 || res.Code == 30006 || res.Code == 30009 || res.Code == 30012) {
            location.href = res.Data;
          } else if (res.Code == 30008) {
            let secondsToGo = 5;
            const modal = Modal.success({
              title: '系统提示',
              content: `店铺未任何功能授权 ${secondsToGo} s后将自动跳转商家中心`,
              onOk: () => {
                location.href = res.Data;
              },
            });
            setInterval(() => {
              secondsToGo -= 1;
              modal.update({
                content: `店铺未任何功能授权 ${secondsToGo} s后将自动跳转商家中心.`,
              });
            }, 1000);
            setTimeout(() => {
              location.href = res.Data;
            }, secondsToGo * 1000);
            return false;
          }
          let codes = [];
          if (newOptions.body) {
            if (JSON.parse(newOptions.body).codes) codes = JSON.parse(newOptions.body).codes || [];
          }
          if (codes.indexOf(res.code) < 0) {
            // let isStop=window.g_app._store.getState().global.isStop;
            // if (res.Code != 0) showErrorMsg(res, codes);
            // if(!isStop){
            //   window.g_app._store.dispatch({
            //     type:'global/changeIsStop',
            //     payload:true
            //   })
            // }
          }
        });
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      if (SERVICE_TYPE && SERVICE_TYPE != 'pro') {
        return response.json();
      } else {
        return awaitDemo(response.json(), 1000);
      }
    })
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      // environment should not be used
      if (status === 403) {
        router.push(`/${100000000001}/exception/403`);
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push(`/${100000000001}/exception/500`);
        return;
      }
      if (status >= 404 && status < 422) {
        router.push(`/${100000000001}/exception/404`);
      }
    });
}
