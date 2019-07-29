import { stringify } from 'qs';
import request from '@/utils/request';

export async function GetVersionInfo() {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/XcxVersion/GetVersionInfo`);
}

//上传代码
export async function Commit(params) {
  return request(`/${window.storeId}/XcxVersion/Commit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
//撤回审核
export async function UndocodeAudit(params) {
  return request(`/${window.storeId}/XcxVersion/UndocodeAudit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//提交审核
export async function SubmitAudit(params) {
  return request(`/${window.storeId}/XcxVersion/SubmitAudit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//发布
export async function Release(params) {
  return request(`/${window.storeId}/XcxVersion/Release`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
//绑定体验者
export async function BindTester(params) {
  return request(`/${window.storeId}/XcxVersion/BindTester`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//更新小程序码
export async function GetWxaCode(params) {
  return request(`/${window.storeId}/XcxVersion/GetWxaCode`);
}




export async function GoToWeixin(params) {
  return request(`${params.MpUrl}/WXAuth/GoToWeixin`, {
    method: 'POST',
    body: {
      NotifyUrl: params.NotifyUrl,
      method: 'delete',
    },
  });
}
