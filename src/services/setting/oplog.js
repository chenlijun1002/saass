import { stringify } from 'qs';
import request from '@/utils/request';
export async function GetUserList(params) {
  return request(`/${window.storeId}/AccountManagement/GetAccountList?${stringify(params)}`);
}
export async function GetModuleList() {
  return request(`/${window.storeId}/DiaryManager/GetModuleList`);
}
export async function GetLogDetail(params) {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/DiaryManager/GetDiaryById?${stringify(params)}`);
}

export async function GetLogList(params) {
  return request(`/${window.storeId}/DiaryManager/GetList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
