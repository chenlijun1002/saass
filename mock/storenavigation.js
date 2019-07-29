const GetStoreNavigator = (req, res) =>
  res.json({
    Code: 0,
    Msg: 'MaO%f7',
    Data: {
      NavigatorData: [
        {
          selectedIconIndex: 1,
          iconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon11.png',
          selectedIconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon11-s-01.png',
          pagePath: 'rrr',
          pageName: '个人中心',
          text: '个人中心',
        },
        {
          selectedIconIndex: 2,
          iconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon12.png',
          selectedIconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon12-s-01.png',
          pagePath: 'rrr',
          pageName: '个人中心2',
          text: 'ffgh',
        },
        {
          selectedIconIndex: 2,
          iconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon02.png',
          selectedIconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon02-s-01.png',
          pagePath: 'rrr',
          pageName: '个人中心3',
          text: '个人中发光飞碟心',
        },
        {
          selectedIconIndex: 3,
          iconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon16.png',
          selectedIconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon16-s-01.png',
          pagePath: 'rrr',
          pageName: '个人中心4',
          text: '地负海涵',
        },
        {
          selectedIconIndex: 4,
          iconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon03.png',
          selectedIconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon03-s-01.png',
          pagePath: 'rrr',
          pageName: '个人中心5',
          text: '天天发过火',
        },
      ],
    },
  });
const SaveStoreNav = (req, res) =>
  res.json({
    Code: 0,
    Msg: '',
    Data: {},
  });
const GetList = (req, res) =>
  res.json({
    Code: 500,
    Msg: 'm7&x',
    Data: {
      PageList: [
        {
          Id: 1,
          PageName: '电饭锅',
          PV: -5543289067759106,
          UV: -5967355884800412,
          IsHome: true,
        },
      ],
      Total: '1',
    },
  });
const GetIconList1 = (req, res) =>
  res.json({
    Code: 0,
    Data: {
      List: [
        {
          IconId: 1,
          IconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon11-s-01.png',
        },
        {
          IconId: 2,
          IconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon11-s-01.png',
        },
        {
          IconId: 3,
          IconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon11-s-01.png',
        },
        {
          IconId: 4,
          IconPath:
            'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon11-s-01.png',
        },
      ],
    },
    Msg: '[xT^v',
  });
const GetIconList = (req, res) =>
  res.json({
    Code: 0,
    Data: {
      IconList:{
        List: [
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon01.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon02.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon03.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon04.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon05.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon06.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon07.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon08.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon09.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon10.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon11.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon12.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon13.png',
        ],
        selectedList: [
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon01-s-01.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon02-s-01.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon03-s-01.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon04-s-01.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon05-s-01.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon06-s-01.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon07-s-01.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon08-s-01.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon09-s-01.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon10-s-01.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon11-s-01.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon12-s-01.png',
          'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/icon/icon13-s-01.png',
        ],
      }      
    },
    Msg: '[xT^v',
  });
const GetFunctionPathList = (req, res) =>
  res.json({
    Code: 0,
    Data: {
      PageList: [
        {
          PageId: 1,
          PageName: '会尽快哈',
          PagePath: 'jjjihh',
        },
        {
          PageId: 2,
          PageName: '代发货发货',
          PagePath: 'gjgj',
        },
        {
          PageId: 3,
          PageName: '会尽导航快哈',
          PagePath: 'erttt',
        },
      ],
      Total:1
    },
    Msg: 'ZlRcxHv',
  });
const GetProductPathList = (req, res) =>
  res.json({
    Code: 0,
    Data: {
      ProductList: [
        {
          ProductId: 1,
          ProductName: '商品名称',
          ProductPath: 'xhYm',
        },
      ],
      Total:1
    },
    Msg: '1^9#',
  });
const GetMicroPagePathList = (req, res) =>
  res.json({
    Code: 0,
    Data: {
      MicroPagePathList: [
        {
          MicroPagetId: 1,
          MicroPageName: '了对方好几个结了婚',
          MicroPagePath: 'fhh',
        },
      ],
      Total:1
    },
    Msg: '0&s$rI',
  });
const GetActivityPathList = (req, res) =>
  res.json({
    Code: 0,
    Data: {
      ActivityPathList: [
        {
          ActivityPathId: 1,
          ActivityName: '活动活动互动',
          ActivityPath: 'gghhhkgh',
        },
      ],
      Total:1
    },
    Msg: '7Ngi',
  });
export default {
  'GET /100000000001/AppConfig/GetStoreNavigator': GetStoreNavigator,
  'POST /100000000001/AppConfig/SaveStoreNav': SaveStoreNav,
  'GET /100000000001/AppConfig/GetIconList': GetIconList,
  'GET /100000000001/AppConfig/GetFunctionPathList': GetFunctionPathList,
  'GET /100000000001/AppConfig/GetProductPathList': GetProductPathList,
  'GET /100000000001/AppConfig/GetMicroPagePathList': GetMicroPagePathList,
  'GET /100000000001/AppConfig/GetActivityPathList': GetActivityPathList,
};
