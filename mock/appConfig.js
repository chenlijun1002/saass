let appConfigData = {
  Code: 0,
  Msg: '接口消息',
  Data: {
    menuData: [
      {
        id: 1,
        name: '店铺',
        icon: 'check-circle-o',
        path: '/store/analysis',
        menus: [
          {
            id: 2,
            name: '店铺装修',
            menus: [
              {
                id: 3,
                name: '店铺主页',
                path: '/store/analysis',
                isShow: true,
                isAuth: true,
                showId: 3,
              },
              {
                id: 4,
                name: '分类模板',
                path: '/store/analysis1',
                isShow: true,
                isAuth: true,
                showId: 4,
              },
              {
                id: 5,
                name: '微页面',
                path: '/store/analysis2',
                isShow: true,
                isAuth: true,
                showId: 5,
              },
              {
                id: 6,
                name: '微页面',
                path: '/store/analysis3',
                isShow: false,
                isAuth: true,
                showId: 5,
              },
            ],
          },
        ],
      },
      {
        id: 7,
        name: '小程序',
        icon: 'check-circle-o',
        path: '/xcxauth/success',
        menus: [
          {
            id: 8,
            name: '小程序授权',
            menus: [
              {
                id: 9,
                name: '小程序已授权',
                path: '/xcxauth/success',
                isShow: true,
                isAuth: true,
                showId: 3,
              },
            ],
          },
        ],
      },
      {
        id: 10,
        name: '设置',
        icon: 'check-circle-o',
        path: '/storeinfo/index',
        menus: [
          {
            id: 8,
            name: '店铺信息1',
            menus: [
              {
                id: 9,
                name: '店铺信息',
                path: '/storeinfo/index',
                isShow: true,
                isAuth: true,
                showId: 3,
              },
            ],
          },
        ],
      },
    ],
    oemInfo: {
      stroeLogo: 'https://file.xiaokeduo.com/ChannelOss/Channel18/newlogo_64_64.png',
      stroeName: '销客多集团',
      telPhone: '15616668070',
      mchcenterUrl: 'http://mchcenter.localapi.xiaokeduo.net/#/home',
      passPortUrl: 'http://distweb.localapi.xiaokeduo.net/#/login',
      defaultIndex: '/stroe/analysis',
    },
  },
};
export default {
  'GET /100000000001/AppConfig/GetConfig': appConfigData,
};
