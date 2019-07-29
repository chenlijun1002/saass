import {
  GetImageOverView,
  GetImageCategoryCount,
  GetList,
  AddImageCategory,
  DelImageCategory,
  ReNameImageCategory,
  DelPic,
  MoveImageCategory,
  PicReName,
} from '@/services/imageList';

export default {
  namespace: 'imageList',

  state: {
    OverView: {},
    imageGroupCount: [],
    imageList: [],
  },

  effects: {
    // 获取图片统计概况
    *GetImageOverView({ callBack }, { call, put }) {
      const data = yield call(GetImageOverView);
      if (data.Code === 0) {
        yield put({
          type: 'saveGetImageOverView',
          payload: data.Data,
        });
      } else {
        callBack && callBack.error(data);
      }
    },
    // 获取图片分组列表
    *GetImageCategoryCount({ callBack }, { call, put }) {
      const data = yield call(GetImageCategoryCount);
      if (data.Code === 0) {
        yield put({
          type: 'saveGetImageCategoryCount',
          payload: data.Data.PageList,
        });
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data);
      }
    },
    // 获取图片列表
    *GetList({ payload, callBack }, { call, put }) {
      const data = yield call(GetList, payload);
      if (data.Code === 0) {
        // yield put({
        //   type: 'saveGetList',
        //   payload: data.Data.PageList,
        // });
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data);
      }
    },
    // 新增图片分组
    *AddImageCategory({ payload, callBack }, { call, put }) {
      const data = yield call(AddImageCategory, payload);
      if (data.Code === 0) {
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data);
      }
    },
    // 删除图片分组
    *DelImageCategory({ payload, callBack }, { call }) {
      const data = yield call(DelImageCategory, payload);
      if (data.Code === 0) {
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data);
      }
    },
    // 修改图片分组名称
    *ReNameImageCategory({ payload, callBack }, { call }) {
      const data = yield call(ReNameImageCategory, payload);
      if (data.Code === 0) {
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data);
      }
    },
    // 删除图片
    *DelPic({ payload, callBack }, { call }) {
      const data = yield call(DelPic, payload);
      if (data.Code === 0) {
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data);
      }
    },
    // 批量修改图片的分组
    *MoveImageCategory({ payload, callBack }, { call }) {
      const data = yield call(MoveImageCategory, payload);
      if (data.Code === 0) {
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data);
      }
    },
    // 修改图片的名称
    *PicReName({ payload, callBack }, { call }) {
      const data = yield call(PicReName, payload);
      if (data.Code === 0) {
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data);
      }
    },
  },

  reducers: {
    saveGetImageOverView(state, { payload }) {
      return {
        ...state,
        OverView: payload,
      };
    },
    saveGetImageCategoryCount(state, { payload }) {
      return {
        ...state,
        imageGroupCount: payload,
      };
    },
    // saveGetList(state, { payload }) {
    //   return {
    //     ...state,
    //     imageList: payload,
    //   };
    // },
  },
};
