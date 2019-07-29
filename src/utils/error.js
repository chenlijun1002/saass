import { message } from 'antd';
let errorCode = {
  31010: '产品规格参数错误，系统未找到',
  50003: '获取验证码失败',
  50009: '获取店铺信息失败',
  50010: '修改失败',
  50011: '获取安全设置失败',
  50012: '获取空间信息失败',
  50013: '旧密码不正确',
  50014: '验证码不正确',
  50001: '账户信息不完整',
  50010: '验证码错误',
  50011: '登录超时，请重新登录',
};

/** 
 * 需要业务层来确定是否需要跳转的状态码集合
*/

let errorlink=[500,503,504];
export function showErrorMsg(res) {
    message.error(res.Msg, 2);
}

export function commonCallbak(code,isLink,callback) {
  let index=errorlink.indexOf(code);
  if(index>-1&&isLink){
    return;
  }
  let index2=errorCode.hasOwnProperty(code);
  if(index2){
    return message.error(errorCode[code], 2);
  }
  if(callback&&typeof callback ==='function') callback(code);
}

export function baseCallbak(res,callback) {
  console.log(callback)
    if(callback&&typeof callback ==='function') callback(res);
}