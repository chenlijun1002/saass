import { queryNotices, getConfigApp } from '@/services/api';

export default {
  namespace: 'global',

  state: {
    isStop:false,//是否阻止框架层提示
    showTop:true,//是否显示顶部栏
    topChildren:'',
    collapsed: false,
    notices: [],
    menuData: [],
    oemInfo: {
      cdnUrl:'',
      storeLogo: '',
      stroeName: '',
      telPhone: '',
      mchcenterUrl: '',
      passPortUrl: '',
      defaultIndex: '',
    },
  },
  effects: {
    *getConfigApp(_, { call, put }) {
      const data = yield call(getConfigApp);
      if (data) {       
        yield put({
          type: 'setConfigData',
          payload: data.Data,
        });
      }
    },
  },

  reducers: {
    setConfigData(state, { payload }) {      
      return {
        ...state,
        ...payload,
      };
    },
    settingShowTop(state, { payload,children }) {     
      return {
        ...state,
        showTop:payload||true,
        topChildren:children||''
      };
    },
    updateStoreLogo(state, { payload }) {
      return {
        ...state,
        oemInfo:{
          ...payload
        },
      };
    },
    changeIsStop(state, { payload }) {      
      if(payload){
        return {
          ...state,
          isStop:false
        };
      }
      return {
        ...state,
        isStop:true
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
