const GetVersionInfo1 = (req, res) =>
  res.json({
    Code: 0,
    Msg: '',
    Data: {
      Release: {
        // Id: 1,
        // Version: '1.14.5',
        // Status: '2',
        // CreateTime: '2018-11-6',
        // Url: 'www',
      },
      Debug: {
        Id: 2,
        Version: '1.5.25',
        Url: 'www.baidu.com',
        CanCancel: 'true',
        CreateTime: '2018-11-6',
        StatuName:'审核中'
      },
      Development: {
        TemplateId: 3, //版本库ID
        Version: '15.2.6',
        CreateTime: '2018-11-6',
        StatuName:''
      },
    },
  });
  const GetVersionInfo = (req, res) =>
  res.json({
    Code: 0,
    Msg: '',
    Data: {
      Release: {
        Id: 1,
        Version: '1.14.5',
        Status: '2',
        CreateTime: '2018-11-6',
        Url: 'www',
      },
      Debug: {
        Id: 2,
        Version: '1.5.25',
        Url: 'www.baidu.com',
        CanCancel: 'true',
        StatuName:'审核中',
        CreateTime: '2018-11-6',
      },
      Development: {
        TemplateId: 3, //版本库ID
        Version: '15.2.6',
        CreateTime: '2018-11-6',
        StatuName:''
      },
    },
  });
const Commit = (req, res) =>
  res.json({
    Code: 0,
    Msg: '',
    Data: {},
  });
const UndocodeAudit = (req, res) =>
  res.json({
    Code: 0,
    Msg: '',
    Data: {},
  });
export default {
  'GET /100000000001/XcxVersion/GetVersionInfo': GetVersionInfo1,
  'POST /100000000001/XcxVersion/Commit': Commit,
  'POST /100000000001/XcxVersion/UndocodeAudit': UndocodeAudit,
};
