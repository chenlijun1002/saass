const GetStoreStyle = (req, res) =>
  res.json({
    "Code":0,
    "Msg":"pM4Wp",
    "Data":{
        "StoreStyleData":[
            {
                "StyleName":"1",
                "themeColor":"#FF476C",
                "subColor":"#FFB3C2",
                "isDefault":true,
                "IsCustom":false
            }
        ]
    }
});  
const SaveStoreStyle = (req, res) =>
  res.json({
    Code: 0,
    Msg: '',
    Data: {},
  });
const GetList = (req, res) =>
  res.json({
    "Code":0,
    "Msg":"m7&x",
    "Data":{
        "PageList":[
            {
                "Id":1,
                "PageName":"电饭锅",
                "PV":-5543289067759106,
                "UV":-5967355884800412,
                "IsHome":true
            }
        ],
        "Total":"1"
    }
});
export default {
  'GET /100000000001/AppConfig/GetStoreStyle': GetStoreStyle,
  'POST /100000000001/AppConfig/SaveStoreStyle': SaveStoreStyle,
  'GET /100000000001/MicroPage/GetList': GetList,
};
