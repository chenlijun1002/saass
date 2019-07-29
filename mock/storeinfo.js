const GetStoreInfo = (req, res) =>
  res.json({
    Code: 0,
    Msg: 'ok',
    Data: {
      StoreLogo: 'https://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/images/cee5ac4d7c344bbdad661bd4e9a05bc3.jpg',
      StoreName: '地方规划和',
      TelPhone: '13555556666',
      Introduction: '广告费',
      IndustryFirst: '互联网',
      IndustryFirstId: '10',
      IndustrySecondId: '1010',
      IndustrySecond: 'Wv$LQ',
      Contacts: '刚刚',
    },
  });
const GetIndustryList = (req, res) =>
  res.json({
    Code: 0,
    Msg: 'fQoper',
    Data: {
      Industry: [
        {
          value: 1,
          label: '互联网',
          pid: '0',
          children: {
            value: '2',
            label: '电子商务',
            pid: '1',
          },
        },
      ],
    },
  });
const GetIndustryList1 = (req,res) =>
  res.json({
    "Code":0,
    "Msg":"ok",
    "Data":{
      "Industry":[
        {
          id: '330000',
          title: '浙江省',
          children: [
            {
              id: '330100',
              title: '杭州市',
              children: [
                {
                  id: '330106',
                  title: '西湖区'
                }
              ]
            },
            {
              id: '330200',
              title: '温州市',
              children: [
                {
                  id: '330206',
                  title: '龙湾区'
                }
              ]
            }
          ]
        },
        {
          id: '120000',
          title: '新疆维吾尔自治区',
          children: [
            {
              id: '120100',
              title: '博尔塔拉蒙古自治州',
              children: [
                {
                  id: '120111',
                  title: '阿拉山口市'
                }
              ]
            }
          ]
        }
      ],
      "TraceFlag":null
    }
  })
const SaveStoreInfo = (req, res) =>
  res.json({
    Code: 0,
    Msg: '',
    Data: {},
  });
export default {
  'GET /100000000001/AppConfig/GetStoreInfo': GetStoreInfo,
  'GET /100000000001/AppConfig/GetIndustryList': GetIndustryList1,
  'POST /100000000001/AppConfig/SaveStoreInfo': SaveStoreInfo,
};
