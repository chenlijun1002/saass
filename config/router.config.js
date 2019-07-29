export default [
  // app
  {
    path: '/',
    component: '../layouts/Routers',
    routes: [
      {
        name: '错误',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './system/exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './system/exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './system/exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './system/exception/TriggerException',
          },
          // {
          //   component: '404',
          // },
        ],
      },
      {
        path: '/:storeId/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        routes: [
          // dashboard
          { path: '/:storeId/', redirect: '/:storeId/mall/dashboard' },
          { path: '/:storeId/mall', redirect: '/:storeId/mall/dashboard' },
          {
            path: '/:storeId/mall/dashboard',
            component: '../components/DevelopmentPage/index',
            name: '概况',
            // routes: [
            //   {
            //     path: '/:storeId/mall/dashboard',
            //     name: 'analysis',
            //     component: '../components/DevelopmentPage/index',
            //   },
            //   // {
            //   //   component: '404',
            //   // },
            // ],
          },
          {
            path: '/:storeId/store',
            name: '店铺',
            routes: [
              { path: '/:storeId/store', redirect: '/:storeId/store/pages' },
              // { path: '/:storeId/store/storenavigation', redirect: '/:storeId/store/storenavigation/index' },
              {
                path: '/:storeId/store/pages',
                name: '微页面',
                component: './store/microPage/index',
              },
              {
                path: '/:storeId/store/pages/edit/:id',
                name: '微页面',
                component: './store/microPage/edit',
              },
              {
                path: '/:storeId/store/pages/draft',
                name: '草稿箱',
                component: './store/microPage/index',
              },
              {
                path: '/:storeId/store/pages/draftedit/:id',
                name: '微页面',
                component: './store/microPage/edit',
              },
              {
                path: '/:storeId/store/nav',
                name: '店铺导航',
                component: './store/storeNavigation/index',
              },
              {
                path: '/:storeId/store/style',
                name: '店铺风格',
                component: './store/storeStyle/index',
              },
              {
                path: '/:storeId/store/file/pics',
                name: '图片库',
                component: './gallery/ImageLibrary/index',
              },
              {
                path: '/:storeId/store/file/videos',
                name: '视频库',
                component: './video/videoLibrary/index',
              },
              // {
              //   component: '404',
              // },
            ],
          },
          {
            path: '/:storeId/file/pics',
            name: '图片库',
            component: './gallery/ImageLibrary/index',
          },
          {
            path: '/:storeId/file/videos',
            name: '视频库',
            component: './video/videoLibrary/index',
          },
          {
            path: '/:storeId/order',
            name: '订单',
            routes: [
              { path: '/:storeId/order/list', redirect: '/:storeId/order/list/all' },
              { path: '/:storeId/order/rates', redirect: '/:storeId/order/rates/all' },
              { path: '/:storeId/order/refunds', redirect: '/:storeId/order/refunds/all' },
              { path: '/:storeId/order', redirect: '/:storeId/order/list/all' },
              {
                path: '/:storeId/order/list/all',
                name: '全部',
                component: './order/orderList/index',
              },
              {
                path: '/:storeId/order/list/waitpay',
                name: '待支付',
                component: './order/orderList/index',
              },
              {
                path: '/:storeId/order/list/waitdelivery',
                name: '待发货',
                component: './order/orderList/index',
              },
              {
                path: '/:storeId/order/list/delivered',
                name: '已发货',
                component: './order/orderList/index',
              },
              {
                path: '/:storeId/order/list/success',
                name: '已完成',
                component: './order/orderList/index',
              },
              {
                path: '/:storeId/order/list/closed',
                name: '已关闭',
                component: './order/orderList/index',
              },
              {
                path: '/:storeId/order/list/refunding',
                name: '退款中',
                component: './order/orderList/index',
              },
              {
                path: '/:storeId/order/delivery',
                name: '发货管理',
                component: '../components/DevelopmentPage/index',
              },
              {
                path: '/:storeId/order/rates/all',
                name: '全部评价',
                component: './order/ratesList/index',
              },
              {
                path: '/:storeId/order/rates/nice',
                name: '好评',
                component: './order/ratesList/index',
              },
              {
                path: '/:storeId/order/rates/midd',
                name: '中评',
                component: './order/ratesList/index',
              },
              {
                path: '/:storeId/order/rates/poor',
                name: '差评',
                component: './order/ratesList/index',
              },
              {
                path: '/:storeId/order/refunds/all',
                name: '全部',
                component: '../components/DevelopmentPage/index',
              },
              {
                path: '/:storeId/order/refunds/waitseller',
                name: '待商家处理',
                component: '../components/DevelopmentPage/index',
              },
              {
                path: '/:storeId/order/refunds/waitbuyer',
                name: '待买家处理',
                component: '../components/DevelopmentPage/index',
              },
            ],
          },
          {
            path: '/:storeId/marketing/coupon',
            name: '营销',
            routes: [
              { path: '/:storeId/marketing/coupon', redirect: '/:storeId/marketing/coupon/using' },
              {
                path: '/:storeId/marketing/coupon/using',
                name: '正常投放',
                component: './marketing/coupon/index',
              },
              {
                path: '/:storeId/marketing/coupon/expired',
                name: '已过期',
                component: './marketing/coupon/index',
              },
              {
                path: '/:storeId/marketing/coupon/outstock',
                name: '库存不足',
                component: './marketing/coupon/index',
              },
            ],
          },
          {
            path: '/:storeId/setting/store',
            name: '设置',
            routes: [
              {
                path: '/:storeId/setting/store/distribution',
                redirect: '/:storeId/setting/store/distribution/express',
              },
              { path: '/:storeId/setting/store', redirect: '/:storeId/setting/store/info' },
              {
                path: '/:storeId/setting/store/authority',
                redirect: '/:storeId/setting/store/authority/staff',
              },
              ///setting/store/authority
              {
                path: '/:storeId/setting/store/info',
                name: '店铺信息',
                component: './setting/storeInfo/index',
              },
              {
                path: '/:storeId/setting/store/notify',
                name: '消息通知',
                component: '../components/DevelopmentPage/index',
              },
              {
                path: '/:storeId/setting/store/distribution/express',
                name: '快递发货',
                component: './setting/distribution/index',
              },
              {
                path: '/:storeId/setting/store/distribution/address',
                name: '地址库',
                component: './setting/distribution/index',
              },
              {
                path: '/:storeId/setting/store/authority/staff',
                name: '账号管理',
                component: './setting/auth/index',
              },
              {
                path: '/:storeId/setting/store/authority/roles',
                name: '角色管理',
                component: './setting/auth/index',
              },
              {
                path: '/:storeId/setting/store/authority/roles/edit',
                name: '编辑角色',
                component: './setting/auth/role/editRole.js',
              },
              {
                path: '/:storeId/setting/store/authority/staff/info',
                name: '查看权限',
                component: './setting/auth/user/detail.js',
              },
              {
                path: '/:storeId/setting/store/authority/roles/add',
                name: '新建角色',
                component: './setting/auth/role/addRole.js',
              },
              {
                path: '/:storeId/setting/store/bizlog',
                name: '操作日志',
                component: './setting/operationLog/operationLog',
              },
            ],
          },
          {
            path: '/:storeId/wechat/xcx',
            name: '小程序',
            routes: [
              { path: '/:storeId/wechat/xcx', redirect: '/:storeId/wechat/xcx/info' },
              {
                path: '/:storeId/wechat/xcx/info',
                name: '基本信息',
                component: './weapp/xcxAuth/Success',
              },
              {
                path: '/:storeId/wechat/xcx/version',
                name: '版本管理',
                component: './weapp/xcxVersionManage/index',
              },
              {
                path: '/:storeId/wechat/xcx/experiencer',
                name: '体验者管理',
                component: '../components/DevelopmentPage/index',
              },
              {
                path: '/:storeId/wechat/xcx/weixinpay',
                name: '微信支付',
                component: '../components/DevelopmentPage/index',
              },
            ],
          },
          {
            path: '/:storeId/customer',
            name: '客户',
            routes: [
              { path: '/:storeId/customer', redirect: '/:storeId/customer/list' },
              {
                path: '/:storeId/customer/list',
                name: '全部客户',
                component: '../components/DevelopmentPage/index',
              },
              {
                path: '/:storeId/customer/tags',
                name: '客户标签',
                component: '../components/DevelopmentPage/index',
              },
              {
                path: '/:storeId/customer/card',
                name: '会员卡',
                component: '../components/DevelopmentPage/index',
              },
              {
                path: '/:storeId/customer/points',
                name: '积分管理',
                component: '../components/DevelopmentPage/index',
              },
            ],
          },
          {
            path: '/:storeId/goods',
            name: '商品管理',
            routes: [
              { path: '/:storeId/goods', redirect: '/:storeId/goods/list/onsale' },
              { path: '/:storeId/goods/list', redirect: '/:storeId/goods/list/onsale' },
              {
                path: '/:storeId/goods/list/onsale',
                name: '出售中',
                component: './product/goodsList/index',
              },
              {
                path: '/:storeId/goods/list/soldout',
                name: '已售罄',
                component: './product/goodsList/index',
              },
              {
                path: '/:storeId/goods/list/instock',
                name: '仓库中',
                component: './product/goodsList/index',
              },
              {
                path: '/:storeId/goods/groups',
                name: '商品分组',
                component: '../components/DevelopmentPage/index',
              },
              {
                path: '/:storeId/goods/tags',
                name: '商品标签',
                component: './product/productLabel/index',
              },
              {
                path: '/:storeId/goods/detailtemplates',
                name: '详情页模板',
                component: './product/productDetailTemplate/index',
              },
              {
                path:'/:storeId/goods/detailtemplates/add',
                name: '商品页模板',
                component: './product/productDetailTemplate/add',
              },
              {
                path: '/:storeId/goods/import',
                name: '商品导入',
                component: '../components/DevelopmentPage/index',
              },
              {
                path: '/:storeId/goods/releaseGoods',
                name: '发布商品',
                component: './product/releaseGoods/index',
              },
            ],
          },

          {
            name: '结果',
            path: '/result',
            routes: [
              // result
              {
                path: '/result/success',
                name: 'success',
                component: './system/result/Success',
              },
              { path: '/result/fail', name: 'fail', component: './system/result/Error' },
            ],
          },
          {
            name: '错误',
            path: '/:storeId/exception',
            routes: [
              // exception
              {
                path: '/:storeId/exception/403',
                name: 'not-permission',
                component: './system/exception/403',
              },
              {
                path: '/:storeId/exception/404',
                name: 'not-find',
                component: './system/exception/404',
              },
              {
                path: '/:storeId/exception/500',
                name: 'server-error',
                component: './system/exception/500',
              },
              {
                path: '/:storeId/exception/trigger',
                name: 'trigger',
                hideInMenu: true,
                component: './system/exception/TriggerException',
              },
              // {
              //   component: '404',
              // },
            ],
          },
          // {
          //   component: '404',
          // },
        ],
      },
    ],
  },
];
