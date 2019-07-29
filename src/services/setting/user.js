import { stringify } from 'qs';
import request from '@/utils/request';
export async function SendSMS(params) {
    return request(`/${window.storeId}/AccountManagement/SendSmsCode`, {
        method: 'POST',
        body: {
            ...params,
        },
    });
}
export async function GetAccountList(params) {
    return request(`/${window.storeId}/AccountManagement/GetAccountListByPage?${stringify(params)}`);
}
export async function CheckPhone(params) {
    return request(`/${window.storeId}/AccountManagement/CheckPhone`, {
        method: 'POST',
        body: {
            ...params,
        },
    });
   
}

export async function CheckRoleName(params) {
    return request(`/${window.storeId}/AccountManagement/CheckRoleName`, {
        method: 'POST',
        body: {
            ...params,
        },
    });
   
}

export async function CreateAccount(params) {
    return request(`/${window.storeId}/AccountManagement/CreateAccount`, {
        method: 'POST',
        body: {
            ...params,
        },
    }); 
}
export async function UpdateAccount(params) {
    return request(`/${window.storeId}/AccountManagement/UpdateAccount`, {
        method: 'POST',
        body: {
            ...params,
        },
    }); 
}
export async function LockAccount(params) {
    return request(`/${window.storeId}/AccountManagement/LockAccount`, {
        method: 'POST',
        body: {
            ...params,
        },
    }); 
}
export async function DelAccount(params) {
    return request(`/${window.storeId}/AccountManagement/DelAccount`, {
        method: 'POST',
        body: {
            ...params,
        },
    }); 
}
export async function UnLockAccount(params) {
    return request(`/${window.storeId}/AccountManagement/UnLockAccount`, {
        method: 'POST',
        body: {
            ...params,
        },
    }); 
}

export async function CreateRole(params) {
    return request(`/${window.storeId}/AccountManagement/CreateRole`, {
        method: 'POST',
        body: {
            ...params,
        },
    }); 
}

export async function ModifiedRole(params) {
    return request(`/${window.storeId}/AccountManagement/ModifiedRole`, {
        method: 'POST',
        body: {
            ...params,
        },
    }); 
}

export async function DelRole(params) {
    return request(`/${window.storeId}/AccountManagement/DelRole`, {
        method: 'POST',
        body: {
            ...params,
        },
    }); 
}

export async function GetAccountById(params) {
    return request(`/${window.storeId}/AccountManagement/GetAccountById?${stringify(params)}`);
}
export async function GetPrivilege(params) {
    return request(`/${window.storeId}/AccountManagement/GetPrivilege?${stringify(params)}`);
}
export async function GetRoleList(params) {
    return request(`/${window.storeId}/AccountManagement/GetRoleList?${stringify(params)}`);
}
export async function GetPrivilegeByRoleId(params) {
    return request(`/${window.storeId}/AccountManagement/GetPrivilegeByRoleId?${stringify(params)}`);
}
