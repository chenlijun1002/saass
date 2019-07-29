const GetVideoList = (req, res) =>
  res.json({
    Code: 0,
    Msg: 'msg',
    Data: {
      Videos: [
        {
          Id: 1,
          Url: 'http://insidexkd.oss-cn-shanghai.aliyuncs.com/demo.mp4',
          Cover:
            'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3581792254,1787772481&fm=173&app=25&f=JPEG?w=218&h=146&s=DBACB7475B8662D2062E5B6D0300E068',
          Name: '视频1',
          UploadDate: '2018-12-10',
          GroupId: 1,
          Category: { Id: 1, Title: '第一分组' },
          User: { Id: 100001, Name: '张三' },
        },
        {
          Id: 2,
          Url: 'http://insidexkd.oss-cn-shanghai.aliyuncs.com/demo.mp4',
          Cover:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=180312266,3639093672&fm=173&app=25&f=JPEG?w=218&h=146&s=5A27AE40185A464F0AABF952030050FA',
          Name: '视频2',
          UploadDate: '2018-12-10',
          GroupId: 1,
          Category: { Id: 1, Title: '第一分组' },
          User: { Id: 100001, Name: '张三' },
        },
        {
          Id: 3,
          Url: 'http://insidexkd.oss-cn-shanghai.aliyuncs.com/demo.mp4',
          Cover:
            'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3177779157,676545678&fm=173&app=49&f=JPEG?w=218&h=146&s=E2A0AFE736631919400D36A70300E012',
          Name: '视频3',
          UploadDate: '2018-12-10',
          GroupId: 1,
          Category: { Id: 1, Title: '第一分组' },
          User: { Id: 100001, Name: '张三' },
        },
        {
          Id: 4,
          Url: 'http://insidexkd.oss-cn-shanghai.aliyuncs.com/demo.mp4',
          Cover:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=434167604,4280234587&fm=173&app=25&f=JPEG?w=218&h=146&s=BB82844FEE630D0D3C11B0B80300501E',
          Name: '视频4',
          UploadDate: '2018-12-11',
          GroupId: 1,
          Category: { Id: 1, Title: '第一分组' },
          User: { Id: 100001, Name: '张三' },
        },
        {
          Id: 5,
          Url: 'http://insidexkd.oss-cn-shanghai.aliyuncs.com/demo.mp4',
          Cover:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1212255311,3572486774&fm=173&app=25&f=JPEG?w=218&h=146&s=00CAFB04483189962C0031F903005014',
          Name: '视频5',
          UploadDate: '2018-12-11',
          GroupId: 2,
          Category: { Id: 2, Title: '我的分组' },
          User: { Id: 100001, Name: '张三' },
        },
        {
          Id: 6,
          Url: 'http://insidexkd.oss-cn-shanghai.aliyuncs.com/demo.mp4',
          Cover:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3859308725,3673544976&fm=173&app=25&f=JPEG?w=218&h=146&s=F7793ED65C737B943E1BFF780300F01B',
          Name: '视频6',
          UploadDate: '2018-12-12',
          GroupId: 2,
          Category: { Id: 2, Title: '我的分组' },
          User: { Id: 100001, Name: '张三' },
        },
        {
          Id: 7,
          Url: 'http://insidexkd.oss-cn-shanghai.aliyuncs.com/demo.mp4',
          Cover:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3859308725,3673544976&fm=173&app=25&f=JPEG?w=218&h=146&s=F7793ED65C737B943E1BFF780300F01B',
          Name: '视频7',
          UploadDate: '2018-12-12',
          GroupId: 2,
          Category: { Id: 2, Title: '我的分组' },
          User: { Id: 100001, Name: '张三' },
        },
      ],
      Total: 6,
    },
  });

const GetVideoGroup = (req, res) =>
  res.json({
    Code: 0,
    Msg: 'msg',
    Data: {
      Group: [
        {
          Id: 1,
          Title: '第一分组',
          User: { Id: 100001, Name: '张三' },
        },
        {
          Id: 2,
          Title: '我的分组',
          User: { Id: 100001, Name: '张三' },
        },
      ],
    },
  });

export default {
  'GET /100000000001/api/GetVideoList': GetVideoList,
  'GET /100000000001/api/GetVideoGroup': GetVideoGroup,
};
