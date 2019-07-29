import {
    GetUserList,
    GetModuleList,
    GetLogList,
    GetLogDetail
} from '@/services/setting/oplog';
export default {
    namespace: 'oplog',

    state: {
        //查询条件
        seachData: {
            userId: "",
            module: "",
            beginDate: "",
            endDate: "",
            pageSize: 20
        },
        users: [],//账号集合
        module: [],//模块集合
        resultData: {},//接口返回信息.
        detail: { }
    },
    effects: {
        *UserList({ payload, callback }, { call, put }) {
            const data = yield call(GetUserList, payload);
            if (data) {
                yield put({
                    type: 'getUserList',
                    userList: data.Data,
                });
                callback && callback.success && callback.success(data);
            }
        },
        *ModuleList({ payload, callback }, { call, put }) {
            const data = yield call(GetModuleList, payload);
            if (data) {
                yield put({
                    type: 'getModules',
                    modules: data.Data,
                });
                callback && callback.success && callback.success(data);
            }
        },
        *LogList({ params, callback }, { call, put }) {
            const data = yield call(GetLogList, params);
            if (data) {
                yield put({
                    type: 'getLogs',
                    logs: data,
                });
                callback && callback.success && callback.success(data);
            }
        },
        *Detail({ params, callback }, { call, put }) {
            const data = yield call(GetLogDetail, params);
            if (data) {
                yield put({
                    type: 'GetDetail',
                    log: data,
                });
                callback && callback()
            }
        },

    },
    reducers: {

        changeUserId(state, { userId }) {
            let seachData = { ...state.seachData, userId: userId };
            return {
                ...state,
                seachData: seachData,
            };
        },
        changeModule(state, { modulestr }) {
            let seachData = { ...state.seachData, module: modulestr };
            return {
                ...state,
                seachData: seachData,
            };
        },
        changeTime(state, { startTime, endTime }) {
            let seachData = { ...state.seachData, beginDate: startTime, endDate: endTime };
            return {
                ...state,
                seachData: seachData,
            };
        },
        resetSearchData(state) {

            return {
                ...state,
                seachData: {
                    userId: "",
                    module: "",
                    beginDate: "",
                    endDate: "",
                    pageSize: 20
                },
            };
        },
        getUserList(state, { userList }) {
            return {
                ...state,
                users: userList,
            };
        },
        getModules(state, { modules }) {
            return {
                ...state,
                module: modules,
            };
        },
        getLogs(state, { logs }) {
            return {
                ...state,
                resultData: logs,
            };
        },
        GetDetail(state, { log }) {
            let data = log.Data
            let infos = JSON.parse(data.Descr);
            data = { ...data, Descr: infos };
            log = { ...log, Data: data };
            return {
                ...state,
                detail: log,
            };
        },
    },
}