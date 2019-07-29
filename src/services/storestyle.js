import { stringify } from 'qs';
import request from '@/utils/request';

export async function GetStoreStyle() {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/AppConfig/GetStoreStyle`);
}
export async function GetThemeList() {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/AppConfig/GetThemeList`);
}

export async function SaveStoreStyle(params) {
    // console.log(storeId,88)
    // storeId=10000000001;
   // return request(`/${window.storeId}/AppConfig/SaveStoreStyle`);
    return request(`/${window.storeId}/AppConfig/SaveStoreStyle`, {
      method: 'POST',
      body: {
        ...params,
      },
    });
  }


export async function SaveStoreNav(params) {
  return request(`/${window.storeId}/AppConfig/SaveStoreNav`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
