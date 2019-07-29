import { stringify } from 'qs';
import request from '@/utils/request';

// 新增标签
export async function AddLabel(params) {
    return request(`/${window.storeId}/Product/CreateProductTag`, {
      method: 'POST',
      body: {
        ...params
      },
    });
  }

  // 获取标签列表
 export async function GetLabelList(params) {
      return request(`/${window.storeId}/Product/GetTagListWithPage?${stringify(params)}`);
 }

 // 修改
 export async function EditLebalName(params) {
    return request(`/${window.storeId}/Product/UpdateProductTag`, {
      method: 'POST',
      body: {
        ...params
      },
    });
  }

  // 删除
  export async function DeleteLebal(params) {
    return request(`/${window.storeId}/Product/DeleteTag`, {
      method: 'POST',
      body: {
        ...params
      },
    })
  }