import {
  GetStoreInfo,
  GetIndustryList,
  SaveStoreInfo,
  GetPreAuthUrl,
  GoToWeixin,
  GetAuthStoreInfo,
} from '@/services/storeinfo';

export default {
  namespace: 'storeinfo',

  state: {
    storeInfo: {},
    industryList: [],
  },
  effects: {
    *GetStoreInfo({ payload, callback }, { call, put }) {
      const data = yield call(GetStoreInfo);
      if (data) {
        yield put({
          type: 'saveGetStoreInfo',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *GetIndustryList({ payload, callback }, { call, put }) {
      const data = yield call(GetIndustryList);
      if (data) {
        let list=data.Data.Industry;
        // list.forEach((item,index)=>{
        //  // item.value=`${item.value}`;
        //   if(item.children){
        //     //item.children=[item.children];
        //     item.children.forEach((v,i)=>{
        //       v.value=`${v.value}`;
        //     })
        //   }else{
        //     delete item.children;
        //   }
        // })
        yield put({
          type: 'saveGetIndustryList',
          payload: list,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *SaveStoreInfo({ payload, callback }, { call, put }) {
      const data = yield call(SaveStoreInfo,payload);
      if (data) {
        yield put({
          type: 'saveSaveStoreInfo',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
  },

  reducers: {
    saveGetStoreInfo(state, { payload }) {
      return {
        ...state,
        storeInfo: payload,
      };
    },
    saveGetIndustryList(state, { payload }) {
      return {
        ...state,
        industryList: payload,
      };
    },
    savegetLink(state, { payload }) {
      return {
        ...state,
        authLink: payload,
      };
    },
  },
};
