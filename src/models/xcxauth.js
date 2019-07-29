import {
  GetAuthInfo,
  getLink,
  GetAuthStatus,
  GetPreAuthUrl,
  GoToWeixin,
  GetAuthStoreInfo,
} from '@/services/xcxauth';

export default {
  namespace: 'xcxauth',

  state: {
    authInfo: {},
    authStoreInfo: {},
    authLink: '',
    menuData: [],
  },
  effects: {
    *GetAuthInfo(_, { call, put }) {
      const data = yield call(GetAuthInfo);
      if (data) {
        let selected = data.Data.Select.split(',');
        let Permission = data.Data.Permission;
        selected.forEach(item => {
          Permission.forEach(v => {
            if (item == v.Id) {
              v.Auth = true;
            }
          });
        });
        console.log(data.Data, 123);
        yield put({
          type: 'saveGetAuthInfo',
          payload: data.Data,
        });
      }
    },
    *getLink(_, { call, put }) {
      const data = yield call(getLink);
      if (data) {
        yield put({
          type: 'savegetLink',
          payload: data.Data,
        });
      }
    },
    *GetAuthStatus({ payload, callback }, { call, put }) {
      const data = yield call(GetAuthStatus);
      if (data) {
        yield put({
          type: 'saveGetAuthStatus',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *GetPreAuthUrl({ payload, callback }, { call, put }) {
      const data = yield call(GetPreAuthUrl);
      if (data) {
        yield put({
          type: 'saveGetPreAuthUrl',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *GoToWeixin({ payload, callback }, { call, put }) {
      const go = () => GoToWeixin(payload);
      const data = yield call(go);
      if (data) {
        yield put({
          type: 'saveGoToWeixin',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
    *GetAuthStoreInfo({ payload, callback }, { call, put }) {
      const data = yield call(GetAuthStoreInfo);
      if (data) {
        yield put({
          type: 'saveGetAuthStoreInfo',
          payload: data.Data,
        });
        callback && callback.success && callback.success(data);
      }
    },
  },

  reducers: {
    saveGetAuthInfo(state, { payload }) {
      console.log(payload, 456);
      return {
        ...state,
        authInfo: payload,
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
