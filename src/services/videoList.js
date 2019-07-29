import { stringify } from 'qs';
import request from '@/utils/request';

// mock 获取视频分组
// export async function GetVideoGroup() {
//   return request(`/${window.storeId}/api/GetVideoGroup`);
// }
// mock 获取视频列表
// export async function GetVideoList(params) {
//   return request(`/${window.storeId}/api/GetVideoList?${stringify(params)}`);
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
      ...params
    },
  });
}
// 获取视频统计概况
export async function GetVideoOverView() {
  return request(`/${window.storeId}/VideoCenter/GetVideoOverView`);
}
// 视屏库获取视频分组(带视频数量返回)
export async function GetVideoCategoryCount() {
  return request(`/${window.storeId}/VideoCenter/GetVideoCategoryCount`);
}
// 新增视频分组
export async function AddCategory(params) {
  return request(`/${window.storeId}/VideoCenter/AddCategory`, {
    method: 'POST',
    body: {
      ...params
    },
  });
}
// 获取视频列表(视频库)
export async function GetList(params) {
  return request(`/${window.storeId}/VideoCenter/GetList?${stringify(params)}`);
}
// 删除视频分组
export async function DelCategory(params) {
  return request(`/${window.storeId}/VideoCenter/DelCategory`, {
    method: 'POST',
    body: {
      ...params
    },
  })
}
// 修改视频分组名称
export async function ReNameCategory(params) {
  return request(`/${window.storeId}/VideoCenter/ReNameCategory`, {
    method: 'POST',
    body: {
      ...params
    },
  })
}
// 删除视频
export async function DelVideo(params) {
  return request(`/${window.storeId}/VideoCenter/DelVideo`, {
    method: 'POST',
    body: {
      ...params
    },
  })
}
// 批量修改视频的分组
export async function MoveCategory(params) {
  return request(`/${window.storeId}/VideoCenter/MoveCategory`, {
    method: 'POST',
    body: {
      ...params
    },
  })
}
// 编辑视频信息
export async function EditVideo(params) {
  return request(`/${window.storeId}/VideoCenter/EditVideo`, {
    method: 'POST',
    body: {
      ...params
    },
  })
}
