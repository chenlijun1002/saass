
const SendSmsCode = (req, res) =>
    res.json({
        Code: 0,
        Msg: "发送成功",
        Data: {
            Token: "1234"
        }

    });
const GetAccountList = (req, res) =>
    res.json({
        Code: 0,
        Msg: "获取成功",
        Data: {
            Total: 100,
            DataList: [
                {
                    id: 1,
                    phone: "15645214589",
                    realName: "test1",
                    roleName: "角色1",
                    status: "不可用",
                    createtime: "2018-12-13 00:00:00",
                    allowDel: true
                },
                {
                    id: 2,
                    phone: "15645214529",
                    realName: "test2",
                    roleName: "角色2",
                    status: "可用",
                    createtime: "2018-12-13 00:00:00",
                    allowDel: true
                }, {
                    id: 3,
                    phone: "11641214529",
                    realName: "test3",
                    roleName: "角色2",
                    status: "可用",
                    createtime: "2018-12-13 00:00:00",
                    allowDel: true
                },
            ]
        }
    });
const GetAccountById = (req, res) =>
    res.json({
        Code: 0,
        Msg: "获取成功",
        Data: {
            id: 3,
            phone: "11641214529",
            realName: "test3",
            roleName: "角色2",
            status: "可用",
            roleId: 2,
            createtime: "2018-12-13 00:00:00",
            allowDel: true
        }

    });
const GetPrivilege = (req, res) =>
    res.json({
        Code: 0,
        Msg: "获取成功",
        Data: [
            {
                id: 1,
                name: "概况",
                level: 1,
                sort: 1,
                checked: false,
                isMenu: true

            },
            {
                id: 2,
                name: "店铺",
                level: 1,
                sort: 1,
                checked: false,
                isMenu: true,
                child: [
                    {
                        id: 11,
                        name: "微页面",
                        level: 2,
                        sort: 11,
                        isMenu: true,
                        checked: false,
                        child: [
                            {
                                id: 22,
                                name: "新增",
                                level: 2,
                                sort: 11,
                                isMenu: false,
                                checked: false,
                            },
                            {
                                id: 33,
                                name: "修改",
                                level: 2,
                                sort: 11,
                                isMenu: false,
                                checked: false,
                            },
                            {
                                id: 44,
                                name: "删除",
                                level: 2,
                                sort: 11,
                                isMenu: false,
                                checked: false,
                            },
                        ]
                    }
                ]
            },
            {
                id: 3,
                name: "设置",
                level: 1,
                sort: 1,
                checked: false,
                isMenu: true,
                child: [
                    {
                        id: 31,
                        name: "店铺信息",
                        level: 2,
                        sort: 11,
                        isMenu: true,
                        checked: false,
                        child: []
                    },
                    {
                        id: 32,
                        name: "操作日志",
                        level: 2,
                        sort: 11,
                        isMenu: true,
                        checked: false,
                        child: [
                            {
                                id: 321,
                                name: "查看",
                                level: 2,
                                sort: 11,
                                isMenu: false,
                                checked: false,
                            },
                            {
                                id: 9984,
                                name: "删除",
                                level: 2,
                                sort: 11,
                                isMenu: false,
                                checked: false,
                            },
                            {
                                id: 1551,
                                name: "修改",
                                level: 2,
                                sort: 11,
                                isMenu: false,
                                checked: false,
                            }
                        ]
                    }
                ]
            }
        ]
    });

const GetRoleList = (req, res) =>
    res.json({
        Code: 0,
        Msg: "获取成功",
        Data: {
            Total: 100,
            DataList: [
                {
                    id: 1,
                    name: "角色名称",
                    userNum: 2
                },
                {
                    id: 2,
                    name: "2133123",
                    userNum: 2
                },
                {
                    id: 3,
                    name: "124124",
                    userNum: 2
                },
                {
                    id: 4,
                    name: "角色名12称",
                    userNum: 2
                },
                {
                    id: 5,
                    name: "角色dsfsd名称",
                    userNum: 2
                },
                {
                    id: 6,
                    name: "角as2色名称",
                    userNum: 2
                }

            ]
        }

    });
const GetPrivilegeByRoleId = (req, res) =>
    res.json({
        Code: 0,
        Msg: "获取成功",
        Data: {
            id: 1,
            roleName: '角色名称',
            permissions: [
                {
                    id: 1,
                    name: "概况",
                    level: 1,
                    sort: 1,
                    checked: false,
                    isMenu: true

                },
                {
                    id: 2,
                    name: "店铺",
                    level: 1,
                    sort: 1,
                    checked: false,
                    isMenu: true,
                    child: [
                        {
                            id: 11,
                            name: "微页面",
                            level: 2,
                            sort: 11,
                            isMenu: true,
                            checked: false,
                            child: [
                              
                                {
                                    id: 33,
                                    name: "修改",
                                    level: 2,
                                    sort: 11,
                                    isMenu: false,
                                    checked: true,
                                },
                                {
                                    id: 44,
                                    name: "删除",
                                    level: 2,
                                    sort: 11,
                                    isMenu: false,
                                    checked: false,
                                },
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    name: "设置",
                    level: 1,
                    sort: 1,
                    checked: false,
                    isMenu: true,
                    child: [
                        {
                            id: 31,
                            name: "店铺信息",
                            level: 2,
                            sort: 11,
                            isMenu: true,
                            checked: false,
                            child: []
                        },
                        {
                            id: 32,
                            name: "操作日志",
                            level: 2,
                            sort: 11,
                            isMenu: true,
                            checked: false,
                            child: [
                                {
                                    id: 321,
                                    name: "查看",
                                    level: 2,
                                    sort: 11,
                                    isMenu: false,
                                    checked: false,
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    });
export default {
    'POST /100000000001/AccountManagement/SendSmsCode': SendSmsCode,
    'GET /100000000001/AccountManagement/GetAccountListByPage': GetAccountList,
    'GET /100000000001/AccountManagement/GetAccountById': GetAccountById,
    'GET /100000000001/AccountManagement/GetPrivilege': GetPrivilege,
    'GET /100000000001/AccountManagement/GetRoleList': GetRoleList,
    'GET /100000000001/AccountManagement/GetPrivilegeByRoleId': GetPrivilegeByRoleId,
};
