import {
    GetStoreNavigator,
    SaveStoreNav,
    SaveStoreNavAndPub,
    GetIconList,
    GetFunctionPathList,
    GetProductPathList,
    GetMicroPagePathList,
    GetActivityPathList,
    GetProductGroup,
    GetActivityType
  } from '@/services/storenavigation';
  
  export default {
    namespace: 'storenavigation',
  
    state: {
        tabBarList: [],
        microPagePathList:[],
        iconObj:{},
        functionPathList:[],
        productPathList:[],
        activityPathList:[],
        groupList:[],
        activityTypeList:[]
    },
    effects: {
      *GetStoreNavigator({callback}, { call, put }) {
        const data = yield call(GetStoreNavigator);
        if (data) {
          yield put({
            type: 'saveGetStoreNavigator',
            payload: data.Data.NavigatorData,
          });
          callback && callback.success && callback.success(data);
        }
      },
      *SaveStoreNav({ payload, callback }, { call, put }) {
        const data = yield call(SaveStoreNav,payload);
        if (data) {
          yield put({
            type: 'saveSaveStoreNav',
            payload: data.Data,
          });
          callback && callback.success && callback.success(data);
        }
      },
      *SaveStoreNavAndPub({ payload, callback }, { call, put }) {
        const data = yield call(SaveStoreNavAndPub,payload);
        if (data) {
          yield put({
            type: 'saveSaveStoreNavAndPub',
            payload: data.Data,
          });
          
          if(data.Code==0){
            callback && callback.success && callback.success(data);
          }else{
            callback && callback.error && callback.error(data);
          }
        }
      },
      *GetFunctionPathList({ payload, callback }, { call, put }) {
        const data = yield call(GetFunctionPathList,payload);
        if (data) {
          yield put({
            type: 'saveGetFunctionPathList',
            payload: data.Data.PageList,
          });
          callback && callback.success && callback.success(data);
        }
      },
      *GetProductPathList({ payload, callback }, { call, put }) {
        const data = yield call(GetProductPathList,payload);
        if (data) {
          yield put({
            type: 'saveGetProductPathList',
            payload: data.Data.ProductList,
          });
          callback && callback.success && callback.success(data);
        }
      },
      *GetMicroPagePathList({ payload, callback }, { call, put }) {
        const data = yield call(GetMicroPagePathList,payload);
        if (data) {
          yield put({
            type: 'saveGetMicroPagePathList',
            payload: data.Data.MicroPagePathList,
          });
          callback && callback.success && callback.success(data);
        }
      },
      *GetActivityPathList({ payload, callback }, { call, put }) {
        const data = yield call(GetActivityPathList,payload);
        if (data) {
          yield put({
            type: 'saveGetActivityPathList',
            payload: data.Data.ActivityPathList,
          });
          callback && callback.success && callback.success(data);
        }
      },
      *GetIconList({ payload, callback }, { call, put }) {
        const data = yield call(GetIconList,payload);
        if (data) {
          yield put({
            type: 'saveGetIconList',
            payload: data.Data.IconList,
          });
          callback && callback.success && callback.success(data);
        }
      }, 
      *GetProductGroup ({ payload, callback }, { call, put }) {
        const data = yield call(GetProductGroup,payload);
        if (data) {
          yield put({
            type: 'saveGetProductGroup',
            payload: data.Data.GroupList,
          });
          callback && callback.success && callback.success(data);
        }
      }, 
      *GetActivityType({ payload, callback }, { call, put }) {
        const data = yield call(GetActivityType,payload);
        if (data) {
          yield put({
            type: 'saveGetActivityType',
            payload: data.Data.ActivityTypeList,
          });
          callback && callback.success && callback.success(data);
        }
      },           
    },
  
    reducers: {
        saveGetStoreNavigator(state, { payload }) {
        return {
          ...state,
          tabBarList: payload,
        };
      },
      saveGetProductGroup(state, { payload }) {
        return {
          ...state,
          groupList: payload,
        };
      },
      saveGetActivityType(state, { payload }) {
        return {
          ...state,
          activityTypeList: payload,
        };
      },
      SettingStoreNavigator(state, { payload }) {          
        return {
          ...state,
          tabBarList: payload.tabBarList,
        };
      },
      saveGetIconList(state, { payload }) {
        return {
          ...state,
          iconObj: payload,
        };
      },
      saveGetFunctionPathList(state, { payload }) {
        return {
          ...state,
          functionPathList: payload,
        };
      },
      saveGetProductPathList(state, { payload }) {
        return {
          ...state,
          productPathList: payload,
        };
      },
      saveGetMicroPagePathList(state, { payload }) {
        return {
          ...state,
          microPagePathList: payload,
        };
      },
      saveGetActivityPathList(state, { payload }) {
        return {
          ...state,
          activityPathList: payload,
        };
      },
      // saveGetIconList(state, { payload }) {
      //   return {
      //     ...state,
      //     microPageList: payload,
      //   };
      // },
    },
  };
  