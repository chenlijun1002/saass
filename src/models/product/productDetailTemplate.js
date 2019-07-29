import {
    FindTemplateListWithPage, 
    CreateTemplate  
} from '@/services/product/productDetailTemplate';

export default {
    namespace: 'productDetailTemplate',

    state: {
        templateList:[],
        
    },
    effects: {
        *FindTemplateListWithPage({ payload, callback }, { call, put }) {           
          const data = yield call(FindTemplateListWithPage, payload)
          if (data.Code === 0) {
            yield put({
                type: 'saveFindTemplateListWithPage',
                payload: data.Data.DataList||[],
            });
            callback && callback.success && callback.success(data);
          }else{
            callback && callback.error && callback.error(data);
          }
        },            
        *CreateTemplate({ payload, callback }, { call, put }) {           
            const data = yield call(CreateTemplate, payload)
            if (data.Code === 0) {                
                callback && callback.success && callback.success(data);
            }else{
                callback && callback.error && callback.error(data);
            }
        },         
    },
    reducers: {

        saveFindTemplateListWithPage(state, { payload }) {            
            return {
                ...state,
                templateList: payload,
            };
        },
                   
    },
}