const GetAuthInfo = (req, res) =>
  res.json({
    Code: 0,
    Msg: 'b6E',
    Data: {
      AppName: '6]*4uI',
      AppId: 'hBqS^if',
      CatesDescr: 'c8Wx5e',
      Signature: 'Sr%3e',
      VerifyType: 'b$xc',
      StatuName: 'w4Vdv',
      Permission: [
        {
          Id: 1,
          Name: 'PKBQO',
        },
        {
          Id: 2,
          Name: 'PKBQO',
        },
        {
          Id: 3,
          Name: 'PKBQO',
        },
        {
          Id: 4,
          Name: 'PKBQO',
        },
      ],
      Select: '1,3',
    },
    TraceFlag: 'ZT(GUL',
  });
const GetAuthStatus = (req, res) =>
  res.json({
    Code: 0,
    Msg: 'F&F*^Y',
    Data: {},
  });
const GetAuthStoreInfo = (req, res) =>
  res.json({
    Code: 0,
    Msg: 'dDS77s',
    Data: {
      AppName: '*!$iyh',
      StoreHeadImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      StoreName: 'gQ#NR',
    },
  });
const GetPreAuthUrl = (req, res) =>
  res.json({
    Code: 3751213090891104,
    Msg: 'QcD',
    Data: {
      MpUrl: '[QucSiU',
      NotifyUrl: 'dKH9F5',
    },
  });
export default {
  'GET /100000000001/WXAuth/GetAuthInfo': GetAuthInfo,
  'GET /100000000001/WXAuth/GetAuthStatus': GetAuthStatus,
  'GET /100000000001/WXAuth/GetAuthStoreInfo': GetAuthStoreInfo,
  'GET /100000000001/WXAuth/GetPreAuthUrl': GetPreAuthUrl,
};
