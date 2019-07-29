import { stringify } from 'qs';
import request from '@/utils/request';

export async function GetMicroPageList(params) {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/MicroPage/GetList?${stringify(params)}`);
}
export async function SetHomePage(params) {
  return request(`/${window.storeId}/MicroPage/SetHomePage`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function GetDraftDetail(params) {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/MicroPage/GetDraftDetail?${stringify(params)}`);
}
export async function GetPubDetail(params) {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/MicroPage/GetPubDetail?${stringify(params)}`);
}

export async function DelMicroPage(params) {
  console.log(params, '====');
  return request(`/${window.storeId}/MicroPage/Del`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function AddPage(params) {
  //params={...params,id:0};
  console.log(params, '====');
  return request(`/${window.storeId}/MicroPage/SavePub`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function SaveDraft(params) {
  //params={...params,id:0};
  console.log(params, '====');
  return request(`/${window.storeId}/MicroPage/SaveDraft?rend=${Math.random()}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function UpdatePage(params) {
  return request(`/${window.storeId}/MicroPage/SavePub`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function GetWxaUrl(params) {  
  return request(`/${window.storeId}/MicroPage/GetWxaUrl?${stringify(params)}`);
}
