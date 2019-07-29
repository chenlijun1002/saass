import { stringify } from 'qs';
import request from '@/utils/request';

export async function GetStoreNavigator() {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/AppConfig/GetStoreNavigator`);
}
export async function GetProductGroup() {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/AppConfig/GetProductGroup`);
}
export async function GetActivityType() {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/AppConfig/GetActivityType`);
}

export async function GetIconList(params) {
    // console.log(storeId,88)
    // storeId=10000000001;
    return request(`/${window.storeId}/AppConfig/GetIconList?Type=${params.Type}`);
  }
export async function GetList() {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/MicroPage/GetList`);
}

export async function SaveStoreNav(params) {
  return request(`/${window.storeId}/AppConfig/SaveStoreNav`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function SaveStoreNavAndPub(params) {
  return request(`/${window.storeId}/AppConfig/SaveStoreNavAndPub`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}



export async function GetFunctionPathList(params) {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/AppConfig/GetFunctionPathList?${stringify(params)}`);
}
export async function GetProductPathList(params) {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/AppConfig/GetProductPathList?${stringify(params)}`);
}
export async function GetMicroPagePathList(params) {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/AppConfig/GetMicroPagePathList?${stringify(params)}`);
}
export async function GetActivityPathList(params) {
  // console.log(storeId,88)
  // storeId=10000000001;
  return request(`/${window.storeId}/AppConfig/GetActivityPathList?${stringify(params)}`);
}
// //撤回审核
// export async function UndocodeAudit(params) {
//   return request(`/${window.storeId}/XcxVersion/UndocodeAudit`, {
//     method: 'POST',
//     body: {
//       ...params,
//     },
//   });
// }

// //提交审核
// export async function SubmitAudit(params) {
//   return request(`/${window.storeId}/XcxVersion/SubmitAudit`, {
//     method: 'POST',
//     body: {
//       ...params,
//     },
//   });
// }

// //发布
// export async function Release(params) {
//   return request(`/${window.storeId}/XcxVersion/Release`, {
//     method: 'POST',
//     body: {
//       ...params,
//     },
//   });
// }
// //绑定体验者
// export async function BindTester(params) {
//   return request(`/${window.storeId}/XcxVersion/BindTester`, {
//     method: 'POST',
//     body: {
//       ...params,
//     },
//   });
// }

// //更新小程序码
// export async function GetWxaCode(params) {
//   return request(`/${window.storeId}/XcxVersion/GetWxaCode`);
// }




export async function GoToWeixin(params) {
  return request(`${params.MpUrl}/WXAuth/GoToWeixin`, {
    method: 'POST',
    body: {
      NotifyUrl: params.NotifyUrl,
      method: 'delete',
    },
  });
}
