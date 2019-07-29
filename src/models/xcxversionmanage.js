import {
  GetVersionInfo,
  Commit,
  UndocodeAudit,
  SubmitAudit,
  Release,
  BindTester,
  GetWxaCode
} from '@/services/xcxversionmanage';

export default {
  namespace: 'xcxversionmanage',

  state: {
    versionInfo: {},
  },
  effects: {
    *GetVersionInfo(_, { call, put }) {
      const data = yield call(GetVersionInfo);
      if (data) {
        yield put({
          type: 'saveGetVersionInfo',
          payload: data.Data,
        });
      }
    },
    *Commit({ payload, callback }, { call, put }) {
      const data = yield call(Commit,payload);
      if (data) {
        yield put({
          type: 'saveCommit',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *UndocodeAudit({ payload, callback }, { call, put }) {
      const data = yield call(UndocodeAudit,payload);
      if (data) {
        yield put({
          type: 'saveUndocodeAudit',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *SubmitForAudit({ payload, callback }, { call, put }) {
      const data = yield call(SubmitAudit,payload);
      if (data) {
        yield put({
          type: 'saveSubmitAudit',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *Release({ payload, callback }, { call, put }) {
      const data = yield call(Release,payload);
      if (data) {
        yield put({
          type: 'saveRelease',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *BindTester({ payload, callback }, { call, put }) {
      const data = yield call(BindTester,payload);
      if (data) {
        yield put({
          type: 'saveBindTester',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *GetWxaCode({ payload, callback }, { call, put }) {
      const data = yield call(GetWxaCode,payload);
      if (data) {
        yield put({
          type: 'saveGetWxaCode',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
  },

  reducers: {
    saveGetVersionInfo(state, { payload }) {
      return {
        ...state,
        versionInfo: payload,
      };
    },
    saveGetAuthStoreInfo(state, { payload }) {
      return {
        ...state,
        authStoreInfo: payload,
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
