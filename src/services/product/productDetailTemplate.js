import { stringify } from 'qs';
import request from '@/utils/request';

// 新增商品页模板
export async function CreateTemplate(params) {
    return request(`/${window.storeId}/Product/CreateTemplate`, {
      method: 'POST',
      body: {
        ...params
      },
    });
  }

  // 获取商品模板列表
 export async function FindTemplateListWithPage(params) {
      return request(`/${window.storeId}/Product/FindTemplateListWithPage?${stringify(params)}`);
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