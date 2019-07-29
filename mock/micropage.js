

const GetPageList = (req, res) =>
  res.json({
    "Code":0,
    "Msg":"xMJW5L",
    "Data":{
        "PageList":[
            {
                "Id":1,
                "PageName":"水电费",
                "PV":3381451464521026,
                "UV":-4556906192610558,
                "IsHome":true
            },
            {
                "Id":2,
                "PageName":"规划局",
                "PV":3381451464521026,
                "UV":-4556906192610558,
                "IsHome":true
            },
            {
                "Id":3,
                "PageName":"刚刚",
                "PV":3381451464521026,
                "UV":-4556906192610558,
                "IsHome":true
            },
            {
                "Id":4,
                "PageName":"分隔符",
                "PV":3381451464521026,
                "UV":-4556906192610558,
                "IsHome":true
            },
            {
                "Id":5,
                "PageName":"电饭锅",
                "PV":3381451464521026,
                "UV":-4556906192610558,
                "IsHome":true
            }
        ],
        "Total":"200"
    }
});
const DelPage = (req, res) =>
  res.json({
    "Code":0,
    "Msg":"xMJW5L",
    "Data":{
       
    }
});
export default {
    'GET /100000000001/MicroPage/GetList': GetPageList,
    'GET /100000000001/MicroPage/Del': DelPage,    
  };