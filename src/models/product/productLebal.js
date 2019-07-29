import {
  AddLabel,
  GetLabelList,
  EditLebalName,
  DeleteLebal,
} from '@/services/product/productLebal';


export default {
    namespace: 'pruductLebal',

    state: {
        pruductLebal: [],
    },

    effects: {
        // 新增
        *AddLabel({payload, callBack}, {call, put}) {
            const data = yield call(AddLabel, payload)
            if(data.Code ===0) {
                callBack && callBack.success(data);
            } else {
                callBack && callBack.error(data)
            }
        },

        // 获取
        *GetLabelList({payload, callBack}, {call, put}) {
            const data = yield call(GetLabelList, payload);
            if(data.Code ===0) {
                yield put({
                    type: 'saveGetLabelList',
                    payload: {
                        DataList: data.Data.DataList,
                        Total: data.Data.Total
                    },
                });
                callBack && callBack.success(data);
            } else {
                callBack && callBack.error(data)
            }
        },

        // 修改
        *EditLebalName({payload, callBack}, {call}) {
            const data = yield call(EditLebalName, payload);
            if(data.Code === 0) {
                callBack && callBack.success(data);
            } else {
                callBack && callBack.error(data)
              }
        },

        //删除
        *DeleteLebal({payload, callBack},{call}) {
            const data = yield call(DeleteLebal, payload);
            if (data.Code === 0) {
                callBack && callBack.success(data);
              } else {
                callBack && callBack.error(data)
              }
        }

    },

    reducers: {
        saveGetLabelList(state, {payload}) {
            return {
                ...state,
                pruductLebal: payload.DataList,               
            };
        },
    }
};