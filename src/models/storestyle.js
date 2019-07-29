import {
    GetStoreStyle,
    GetThemeList,
    SaveStoreStyle,    
  } from '@/services/storestyle';
  
  export default {
    namespace: 'storestyle',
  
    state: {
        storeStyle: {}, 
        themeList:[]       
    },
    effects: {
      *GetStoreStyle({callback,payload}, { call, put }) {
        const data = yield call(GetStoreStyle,payload);
        if (data) {
          yield put({
            type: 'saveGetStoreStyle',
            payload: data.Data,
          });
          callback && callback.success && callback.success(data);
        }
      },
      *GetThemeList({callback,payload}, { call, put }) {
        const data = yield call(GetThemeList,payload);
        if (data) {
          yield put({
            type: 'saveGetThemeList',
            payload: data.Data.ThemeList,
          });
          callback && callback.success && callback.success(data);
        }
      },
      *SaveStoreStyle({ payload, callback }, { call, put }) {
        const data = yield call(SaveStoreStyle,payload);
        if (data) {
          yield put({
            type: 'saveSaveStoreNav',
            payload: data.Data,
          });
          callback && callback.success && callback.success(data);
        }
      },                
    },
  
    reducers: {
        saveGetStoreStyle(state, { payload }) {
        return {
          ...state,
          storestyle: payload,
        };
      },
      saveGetThemeList(state, { payload }) {
        return {
          ...state,
          themeList: payload,
        };
      },
      SettingStoreNavigator(state, { payload }) {
          console.log(payload,777)
        return {
          ...state,
          tabBarList: payload.tabBarList,
        };
      },
      saveGetList(state, { payload }) {
        return {
          ...state,
          microPageList: payload,
        };
      },
    },
  };
  