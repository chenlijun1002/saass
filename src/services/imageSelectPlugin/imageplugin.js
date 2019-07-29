import { stringify } from 'qs';
import request from '@/utils/request';
export async function GetImageStsConfig(params) {
  return request(`/${window.storeId}/ImageCenter/GetImageStsConfig?${stringify(params)}`);
}
export async function GetImageList(params) {
  return request(`/${window.storeId}/ImageCenter/GetImageList?${stringify(params)}`);
}
// export async function GetImageCategory(params) {
     
//   return request(`/${window.storeId}/ImageCenter/GetImageCategory?${stringify(params)}`);
// }
export async function GetImageCategory(params) {
     
  return request(`/${window.storeId}/ImageCenter/GetImageCategoryCount?${stringify(params)}`);
}

//

export async function GetLogList(params) {
  return request(`/${window.storeId}/DiaryManager/GetList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
