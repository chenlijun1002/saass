import {
    SendSMS,
    GetAccountList,
    GetAccountById,
    GetPrivilege,
    GetRoleList,
    GetPrivilegeByRoleId,
    CheckPhone,
    CreateAccount,
    LockAccount,
    UnLockAccount,
    UpdateAccount,
    DelAccount,
    CreateRole,
    CheckRoleName,
    ModifiedRole,
    DelRole
} from '@/services/setting/user';
export default {
    namespace: 'settingUser',

    state: {
        user: {},
        accountList: {},
        roles: [],
        rolesPage:{},
        privilege:{}
    },
    effects: {
        *SendSMS({ param, callback }, { call, put }) {
            const data = yield call(SendSMS, param);
            if (data) {

                callback && callback(data);
            }
        },
        *AccountList({ param, callback }, { call, put }) {
            const data = yield call(GetAccountList, param);
            yield put({
                type: 'getAccountList',
                list: data,
            });
        },
        *Account({ param, callback }, { call, put }) {
            const data = yield call(GetAccountById, param);
            if (data) {
                yield put({
                    type: 'getAccountById',
                    user: data.Data,
                });
            }
        },
        *GetPrivilege({ param, callback }, { call, put }) {
            const data = yield call(GetPrivilege, param);
            if (data) {

                // yield put({
                //     type: 'privileges',
                //     roles: data.Data,
                // });
                callback && callback(data.Data);
            }
        }, 
        *GetRoles({ param, callback }, { call, put }) {
            const data = yield call(GetRoleList, param);
            if (data) {

                yield put({
                    type: 'GetRoleList',
                    rolesPage: data.Data,
                });
                callback && callback( data.Data);
            }
        },
        *GetPrivilegeByRoleId({ param, callback }, { call, put }) {
            const data = yield call(GetPrivilegeByRoleId, param);
            if (data) {
                yield put({
                    type: 'PrivilegeByRoleId',
                    privilege: data.Data,
                });
                callback && callback(data.Data);
            }
        },
        *CheckPhone({ param, callback }, { call, put }) {
            const data = yield call(CheckPhone, param);
            if (data) {
                callback && callback(data.Data);
            }
        },
        *CheckRoleName({ param, callback }, { call, put }) {
            const data = yield call(CheckRoleName, param);
            if (data) {
                callback && callback(data.Data);
            }
        },
        *CreateAccount({ param, callback }, { call, put }) {
            const data = yield call(CreateAccount, param);
            if (data) {
                callback && callback(data);
            }
        },
        *UpdateAccount({ param, callback }, { call, put }) {
            const data = yield call(UpdateAccount, param);
            if (data) {
                callback && callback(data);
            }
        },
        *LockAccount({ param, callback }, { call, put }) {
            const data = yield call(LockAccount, param);
            if (data) {
                callback && callback(data);
            }
        },
        *UnLockAccount({ param, callback }, { call, put }) {
            const data = yield call(UnLockAccount, param);
            if (data) {
                callback && callback(data);
            }
        },
        *DelAccount({ param, callback }, { call, put }) {
            const data = yield call(DelAccount, param);
            if (data) {
                callback && callback(data);
            }
        },
        *CreateRole({ param, callback }, { call, put }) {
            const data = yield call(CreateRole, param);
            if (data) {
                callback && callback(data);
            }
        },
        *ModifiedRole({ param, callback }, { call, put }) {
            const data = yield call(ModifiedRole, param);
            if (data) {
                callback && callback(data);
            }
        },
        *DelRole({ param, callback }, { call, put }) {
            const data = yield call(DelRole, param);
            if (data) {
                callback && callback(data);
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
        getAccountList(state, { list }) {
            return { ...state, accountList: list };
        },
        getAccountById(state, { user }) {
            return { ...state, user: user };
        },
        privileges(state, { roles }) {
            return { ...state, roles: roles };
        },
        GetRoleList(state, { rolesPage }) {
            return { ...state, rolesPage: rolesPage };
        },
        PrivilegeByRoleId(state, { privilege }) {
           
            return { ...state, privilege: privilege };
        },
    },
}