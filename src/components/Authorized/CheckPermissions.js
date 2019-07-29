import React from 'react';
import PromiseRender from './PromiseRender';
import { CURRENT } from './renderAuthorize';
import pathToRegexp from 'path-to-regexp';
import router from 'umi/router';
function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
const checkPermissions = (
  authority,
  currentAuthority,
  target,
  Exception,
  AuthorityRouters,
  currentRouter,
  allRouters
) => {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;
  // if (
  //   allRouters.indexOf(currentRouter.substr(13)) < 0 &&
  //   AuthorityRouters.indexOf(currentRouter.substr(13)) < 0
  // ) {
  //   return Exception;
  // }
  let isExist = false; //判断路由是否在系统路由存在
  allRouters.forEach(item => {
    let result = pathToRegexp(item).exec(currentRouter);
    if (result) {
      isExist = true;
    }
  })

  //系统路由不存在 直接跳转到404
  if (!isExist) {
    router.replace({
      pathname: `/exception/404`,
    });
    return false;
  }
  //查询后台返回的菜单 是否具有当前页面的权限 如果没有 则抛出异常 页面跳转到403
  if (AuthorityRouters.length > 1) {
    if (AuthorityRouters.filter(t =>pathToRegexp(t.path).exec(currentRouter)).length > 0) {
      let menu= AuthorityRouters.filter(t =>pathToRegexp(t.path).exec(currentRouter))[0]     
      if(menu.isAuth){
        return target;
      }else {
        return Exception;
      }
    }else{
      return Exception;
    }
  } 
  if (!authority) {
    return target;
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (authority.indexOf(currentAuthority) >= 0) {
      return target;
    }
    if (Array.isArray(currentAuthority)) {
      for (let i = 0; i < currentAuthority.length; i += 1) {
        const element = currentAuthority[i];
        if (authority.indexOf(element) >= 0) {
          return target;
        }
      }
    }
    return Exception;
  }

  // string 处理
  if (typeof authority === 'string') {
    if (authority === currentAuthority) {
      return target;
    }
    if (Array.isArray(currentAuthority)) {
      for (let i = 0; i < currentAuthority.length; i += 1) {
        const element = currentAuthority[i];
        if (authority.indexOf(element) >= 0) {
          return target;
        }
      }
    }
    return Exception;
  }

  // Promise 处理
  if (isPromise(authority)) {
    return <PromiseRender ok={target} error={Exception} promise={authority} />;
  }

  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority);
      // 函数执行后返回值是 Promise
      if (isPromise(bool)) {
        return <PromiseRender ok={target} error={Exception} promise={bool} />;
      }
      if (bool) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported parameters');
};

export { checkPermissions };

const check = (authority, target, Exception, AuthorityRouters, currentRouter, allRouters) =>
  checkPermissions(
    authority,
    CURRENT,
    target,
    Exception,
    AuthorityRouters,
    currentRouter,
    allRouters
  );

export default check;
