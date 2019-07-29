import { stringify } from 'qs';
import request from '@/utils/request';

export async function GetStoreInfo() {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/AppConfig/GetStoreInfo`);
}
export async function GetIndustryList() {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/AppConfig/GetIndustryList`);
}

export async function SaveStoreInfo(params) {
  console.log(params,'====')
  return request(`/${window.storeId}/AppConfig/SaveStoreInfo`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function UndocodeAudit(params) {
  return request(`${window.storeId}/XcxVersion/UndocodeAudit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
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
