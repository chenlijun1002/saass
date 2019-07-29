const GetUserList = (req, res) =>
    res.json({
        "Code": 0,
        "Msg": "获取成功",
        "Data": [
            {
                "id": 1,
                "phone": "13874778747"
            },
            {
                "id": 2,
                "phone": "18627556396"
            }
        ]
    });

const GetModuleList = (req, res) =>
    res.json({
        "Code": 0,
        "Msg": "获取成功",
        "Data": [
            "店铺",
            "商品",
            "订单",
        ]
    });
const GetLogList = (req, res) =>
    res.json({
        "Code": 0,
        "Msg": "获取成功",
        "Data": {
            "Total": 100,
            "DataList": [
                {
                    "id": "",
                    "userName": "24234234",
                    "moduleName": "15148651651",
                    "eventDescr": "124124124",
                    "createTime": "212412412412"
                }
            ]
        }
    });
const GetLogDetail = (req, res) =>
    res.json({
        "Code":0,
        "Msg":"获取成功",
        "Data":{
            "ModuleName":"操作模块",
            "UserName":"操作用户",
            "CreateTime":"操作时间",
            "Descr":"[{\"Name\":\"aaa\",\"Old\":\"aaa\",\"New\":\"aaa\"}]"
        }
    });
export default {
    'GET /100000000001/AccountManagement/GetAccountList': GetUserList,
    'GET /100000000001/DiaryManager/GetModuleList': GetModuleList,
    'POST /100000000001/DiaryManager/GetList': GetLogList,
    'GET /100000000001/DiaryManager/GetDiaryById': GetLogDetail
};
