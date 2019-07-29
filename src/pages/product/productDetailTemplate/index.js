import React, { Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Card, Button,Divider } from 'antd';
import TemplateModal from './selectTempModal';
import styles from './index.less';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      current: 0,
      total: 101,
      maxPageToShow: 8,
      pageSize: 20,      
    };    
    this.columns = [
    {
        title: '标题',
        dataIndex: 'Name',
        key: 'Name',
        width: '25%',      
    },
    {
        title: '商品关联数量',
        dataIndex: 'PV',
        key: 'PV',
        width: '25%',
        align: 'right',
    },
    {
        title: '创建时间',
        dataIndex: 'CreateTime',
        key: 'CreateTime',
        width: '30%',      
    },
    {
        title: '操作',
        width: '20%', 
        align: 'right',     
        render: data => {
            return (
                <div>
                <a className={`${styles.brandColor} ${styles.pointer}`}>删除</a>
                <Divider type="vertical" />
                <a
                    className={`${styles.brandColor} ${styles.pointer}`}
                    onClick={() => this.editPage(1)}
                >
                    编辑
                </a>
                <Divider type="vertical" />
                <a className={`${styles.brandColor} ${styles.pointer}`}>预览</a>
                </div>
            );
        },
    },
    ];
  }
  componentWillMount() {
    const { dispatch, form } = this.props;
    // dispatch({
    //     type:'productDetailTemplate/FindTemplateListWithPage',
    //     payload:{
    //         pageSize:10,
    //         pageIndex:1
    //     },
    //     callback:{
    //         success:()=>{

    //         }
    //     }
    // })
  }

  onChange = data => {
    console.log(data);
    this.setState({
      current: data.current,
      pageSize: data.pageSize,
    });
  };
  selectTempModal = ref => {
      this.selectTemplateModal=ref;
  }

  addTemplate = () => {
    this.selectTemplateModal.showModal();     
  };

  render() {    
    const { templateList } = this.props;   
    return (
      <Fragment>       
        <Card>
          <div style={{ marginBottom: 24 }}>
            <Button type="primary" style={{ marginRight: 16 }} onClick={this.addTemplate}>
              新增商品页模板
            </Button>          
          </div>
          <Table
            columns={this.columns}
            dataSource={templateList}
            rowKey="Id"
            onChange={this.onChange.bind(this)}
            pageInfo={{
              limit: this.state.limit,
              current: this.state.current,
              maxPageToShow: this.state.maxPageToShow,
              total: this.state.total,
              pageSize: [20, { value: 30, isCurrent: true }],
            }}
          />
        </Card>
        <TemplateModal onRef={this.selectTempModal}/>
      </Fragment>
    );
  }
}

export default connect(({ productDetailTemplate, global, loading }) => ({
    templateList:productDetailTemplate.templateList,
}))(Pagination);
