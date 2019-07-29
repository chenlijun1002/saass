import { stringify } from 'qs';
import request from '@/utils/request';

// 获取图片统计概况
export async function GetImageOverView() {
  return request(`/${window.storeId}/ImageCenter/GetImageOverView`);
}

// 图片库获取图片分组(带图片数量返回)
export async function GetImageCategoryCount() {
  return request(`/${window.storeId}/ImageCenter/GetImageCategoryCount`);
}

// 获取图片列表(图片库)
export async function GetList(params) {
  return request(`/${window.storeId}/ImageCenter/GetList?${stringify(params)}`);
}

// 新增图片分组
export async function AddImageCategory(params) {
  return request(`/${window.storeId}/ImageCenter/AddCategory`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 删除图片分组
export async function DelImageCategory(params) {
  return request(`/${window.storeId}/ImageCenter/DelCategory`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 修改图片分组名称
export async function ReNameImageCategory(params) {
  return request(`/${window.storeId}/ImageCenter/ReNameCategory`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 删除图片
export async function DelPic(params) {
  return request(`/${window.storeId}/ImageCenter/DelPic`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 批量修改图片的分组
export async function MoveImageCategory(params) {
  return request(`/${window.storeId}/ImageCenter/MoveCategory`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 修改图片的名称
export async function PicReName(params) {
  return request(`/${window.storeId}/ImageCenter/PicReName`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}





// 获取图片上传STS令牌信息(图片库)
// export async function GetImageStsConfig(params) {
//   return request(`/${window.storeId}/ImageCenter/GetImageStsConfig?${stringify(params)}`);
// }

// 获取视频分组
export async function GetVideoGroup() {
  return request(`/${window.storeId}/VideoCenter/GetVideoCategory`);
}
// 获取视频列表(视频插件)
export async function GetVideoList(params) {
  return request(`/${window.storeId}/VideoCenter/GetVideoList?${stringify(params)}`);
}
// 上传视频
export async function GetVideoStsConfig(params) {
  return request(`/${window.storeId}/VideoCenter/GetVideoStsConfig?${stringify(params)}`);
}
// 上传视频
export async function SaveVideo(params) {
  return request(`/${window.storeId}/VideoCenter/SaveVideo`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}







// 编辑视频信息
export async function EditVideo(params) {
  return request(`/${window.storeId}/VideoCenter/EditVideo`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
