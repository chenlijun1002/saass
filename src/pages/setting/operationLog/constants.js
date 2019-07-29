export const COLUMNS = [
  {
    title: '操作账号',
    name: 'userName',
    width: '100px'
  },
  {
    title: '操作模块',
    name: 'moduleName',
    width: '100px',
  },
  {
    title: '操作描叙',
    bodyRender: data => {
      return <div>{data.eventDescr}</div>;
    },
  },
  {
    title: '创建时间',
    name: 'createTime',
    width: '300px',
  },
  {
    title: '操作',
    width: '15%',
    name: 'sold_num',
    bodyRender: data => {
      return (
        <div>
          <a onClick={this.showDetail(data.id)}>查看详情</a>
        </div>
      );
    },
  },
];


