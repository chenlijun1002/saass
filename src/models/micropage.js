import {
  GetMicroPageList,
  DelMicroPage,
  AddPage,
  SetHomePage,
  GetPubDetail,
  GetDraftDetail,
  SaveDraft,
  GetWxaUrl,
} from '@/services/micropage';

export default {
  namespace: 'micropage',

  state: {
    data: {
      Id: 0,
      Name: '',
      Remark: '',
      BgColor: '',
      ShareImg: '',
      DataJson: [],
    },
    microPageList: [],
    wxaUrl:''
  },
  effects: {
    *GetMicroPageList({ payload, callback }, { call, put }) {
      const data = yield call(GetMicroPageList, payload);
      if (data) {
        yield put({
          type: 'saveGetList',
          payload: data.Data.PageList,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *DelMicroPage({ payload, callback }, { call, put }) {
      const data = yield call(DelMicroPage, payload);
      if (data) {
        yield put({
          type: 'saveDelMicoPage',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *AddPage({ payload, callback }, { call, put }) {
      const data = yield call(AddPage, payload);
      if (data) {
        yield put({
          type: 'saveAddPage',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *SaveDraft({ payload, callback }, { call, put }) {
      const data = yield call(SaveDraft, payload);
      if (data) {
        callback && callback.success && callback.success(data);
      }
    },
    *SetHomePage({ payload, callback }, { call, put }) {
      const data = yield call(SetHomePage, payload);
      if (data) {
        yield put({
          type: 'saveSetHomePage',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *Detail({ params, callback }, { call, put }) {
      const data = yield call(GetPubDetail, params);
      if (data) {
        // yield put({
        //   type: 'GetDetail',
        //   pageinfo: data.Data,
        // });
        let pageInfo = data.Data;
        let moudles = JSON.parse(pageInfo.DataJson);
        let resulf = { ...pageInfo, DataJson: moudles };
        callback && callback(resulf);
      }
    },
    *DraftDetail({ params, callback }, { call, put }) {
      const data = yield call(GetDraftDetail, params);
      if (data) {
        // yield put({
        //   type: 'GetDetail',
        //   pageinfo: data.Data,
        // });
        let pageInfo = data.Data;
        let moudles = JSON.parse(pageInfo.DataJson);
        let resulf = { ...pageInfo, DataJson: moudles };       
        callback && callback(resulf);
      }
    },
    *GetWxaUrl({ payload, callback }, { call, put }) {
      const data = yield call(GetWxaUrl, payload);
      if (data) {
        yield put({
          type: 'saveGetWxaUrl',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
  },

  reducers: {
    saveGetList(state, { payload }) {
      return {
        ...state,
        microPageList: payload,
      };
    },
    Changedata(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    GetDetail(state, { pageinfo }) {
      let moudles = JSON.parse(pageinfo.DataJson);
      return {
        ...state,
        data: { ...pageinfo, DataJson: moudles },
      };
    },
    saveGetWxaUrl(state, { payload }) {      
      return {
        ...state,
        wxaUrl: payload,
      };
    },
  },
};
