import { stringify } from 'qs';
import request from '@/utils/request';

export async function GetAuthInfo() {
   //console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/WXAuth/GetAuthInfo`);
}
export async function getLink() {
  return request(`/${window.storeId}/WXAuth/GetAuthStatus`);
}
export async function GetAuthStatus() {
  return request(`/${window.storeId}/WXAuth/GetAuthStatus`);
}

export async function GetPreAuthUrl() {
  return request(`/${window.storeId}/WXAuth/GetPreAuthUrl`);
}
export async function GetAuthStoreInfo() {
  return request(`/${window.storeId}/WXAuth/GetAuthStoreInfo`);
}
export async function GoToWeixin(params) {
  console.log(`${params.MpUrl}/WXAuth/GoToWeixin`);
  return request(`${params.MpUrl}/WXAuth/GoToWeixin`, {
    method: 'POST',
    body: {
      NotifyUrl: params.NotifyUrl,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
