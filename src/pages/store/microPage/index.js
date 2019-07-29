import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import router from 'umi/router';
import { Tabs,} from 'zent';
import { Card, Table, Tag, Divider, Popconfirm, Popover, Input, Modal, Row, Col, Button, Spin} from 'antd';
import HeaderTab from '@/components/HeaderTab';
//import Divider from '@/components/Divider'
import styles from './index.less';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showType: 0,
      limit: 10,
      current: 0,
      total: 0,
      maxPageToShow: 8,
      pageSize: 10,
      // activeId:`${this.props.location.pathname}`,
      tabs: [
        {
          title: '微页面',
          key: `/${window.storeId}/store/pages`,
          // disabled: true
        },
        {
          title: '草稿箱',
          key: `/${window.storeId}/store/pages/draft`,
        },
      ],
      Type: this.props.location.pathname === `/${window.storeId}/store/pages` ? 1 : 2,
      paginationProps: {
        showSizeChanger: true,
        showQuickJumper: false,
        showTotal: total => `共 ${total} 条记录`,
        pageSize: 10,
        total: 0,
      },
      loading: true,
      visible: false,
      wxaUrl:''
    };
  }
  componentWillMount() {
    const { dispatch, form } = this.props;
    window.scrollTo(0, 0);
    dispatch({
      type: 'micropage/GetMicroPageList',
      payload: {
        Type: this.state.Type,
        PageIndex: 1,
        PageSize: 10,
      },
      callback: {
        success: res => {         
          if (res.Code == 0) {
            let { paginationProps } = this.state;
            let pagination = {
              ...paginationProps,
              total: Number(res.Data.Total),
            };           
            this.setState({
              total: Number(res.Data.Total),
              paginationProps: { ...pagination },
              loading: false,
            });
          }
        },
      },
    });
  }
  requestList = () => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'micropage/GetMicroPageList',
      payload: {
        Type: this.state.Type,
        PageIndex: 1,
        PageSize: 10,
      },
      callback: {
        success: res => {         
          if (res.Code == 0) {
            let { paginationProps } = this.state;
            let pagination = {
              ...paginationProps,
              total: Number(res.Data.Total),
            };
            this.setState({
              total: Number(res.Data.Total),
              paginationProps: { ...pagination },
              loading: false,
            });
          }
        },
      },
    });
  };
  onChange = data => {
    let { dispatch } = this.props;
    let { paginationProps } = this.state;
    let pagination = {
      ...paginationProps,
      ...data,
    };   
    this.setState(
      {
        // current: data.current,
        // pageSize: data.pageSize,
        paginationProps: { ...pagination },
        loading: true,
      },
      () => {
        dispatch({
          type: 'micropage/GetMicroPageList',
          payload: {
            Type: this.state.Type,
            PageIndex: this.state.paginationProps.current,
            PageSize: this.state.paginationProps.pageSize,
          },
          callback: {
            success: res => {             
              if (res.Code == 0) {
                let { paginationProps } = this.state;
                let pagination = {
                  ...paginationProps,
                  total: Number(res.Data.Total),
                };
                this.setState({
                  total: Number(res.Data.Total),
                  paginationProps: { ...pagination },
                  loading: false,
                });
              }
            },
          },
        });
      }
    );
  };
  onTabChange = id => {   
    this.setState(
      {
        activeId: id,
      },
      () => {
        router.replace({
          pathname: `${id}`,
        });
        // if(id==1){
        //     router.replace({
        //         pathname: `/${window.storeId}/store/pages`
        //     })
        // }else{
        //     router.replace({
        //         pathname: `/${window.storeId}/store/pages/draft`
        //     })
        // }
      }
    );
  };
  editPage = id => {
   // sessionStorage.setItem('microPageId', id);
   // sessionStorage.setItem('microPageType', this.state.Type);

    if(this.state.Type==1){
      router.replace({
        pathname: `/${window.storeId}/store/pages/edit/${id}`,
      });
    }else{
      router.replace({
        pathname: `/${window.storeId}/store/pages/draftedit/${id}`,
      });
    }
  };
  newPage = () => {
    this.setState({
      visible: true,
    });
  };
  removePage = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'micropage/DelMicroPage',
      payload: {
        Type: this.state.Type,
        Id: id,
      },
      callback: {
        success: res => {
          if (res.Code == 0) {
            message.success('删除成功');
            setTimeout(() => {
              this.requestList();
            }, 1500);
          } else {
            message.success(res.Msg);
          }
        },
      },
    });
  };
  handleVisibleChange = (visible,data) =>{
    const { dispatch ,loading2,wxaUrl} = this.props;
    if(visible){
      dispatch({
        type: 'micropage/GetWxaUrl',
        payload: {
          scene: `vw_p_micropage-${data.Id}`,        
        },
        callback: {
          success: res => {
            if(res.Code==0){
              this.setState({
                wxaUrl:res.Data
              })
            }
          },
        },
      });
    }
  }
  showQRcode = data => {
    const { dispatch ,loading2,wxaUrl} = this.props;
    console.log(data)
    // dispatch({
    //   type: 'micropage/GetWxaUrl',
    //   payload: {
    //     scene: `vw_p_micropage-${data.Id}`,        
    //   },
    //   callback: {
    //     success: res => {
          
    //     },
    //   },
    // });
    return (
      <Spin spinning={loading2}>
        <div className="xkd-text-center">
          {this.state.wxaUrl ? (
            <div style={{width:240,minHeight:240}}>
              <Input value={`/pages/home/micropage?id=${data.Id}`} className="xkd-mb8" />
              <img
                src={`${this.state.wxaUrl||'https://xkdsaas.oss-cn-shanghai.aliyuncs.com/MerChant/2905/1260/1508825223069.png'}`}
                style={{ width: 240 }}
              />
            </div>
          ) : (
            <div style={{width:240,minHeight:240,lineHeight:'240px',textAlign:'center'}}>
              <span>未绑定小程序</span>
            </div>
          )}
        </div>
      </Spin >
    );
  };
  settingIndex = data => {
    const { dispatch } = this.props;
    dispatch({
      type: 'micropage/SetHomePage',
      payload: {
        Id: data.Id,
      },
      callback: {
        success: res => {
          if (res.Code == 0) {
            message.success('设置成功');
            setTimeout(() => {
              this.requestList();
            }, 1500);
          } else {
            message.success(res.Msg);
          }
        },
      },
    });
  };
  reload = () => {
    window.location.reload();
  };
  goEdit = () => {
    //sessionStorage.setItem('microPageId', 0);
    router.replace({
      pathname: `/${window.storeId}/store/pages/edit/0`,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  show = type => {
    this.setState({
      showType: type,
    });
  };
  render() {
    const { microPageList, loading } = this.props;   
    // const columns = [{
    //   title: '页面名称',
    //   bodyRender: (data) => {
    //     return (
    //       <div>{data.PageName}<Tag color="blue" outline className={`xkd-ml8 ${styles.tag}`}>主页</Tag></div>
    //     );
    //   }
    // }, {
    //   title: 'pv（页面访问量）',
    //   name: 'PV',
    //   textAlign: 'right',
    //   width: '15%'
    // }, {
    //   title: 'uv（独立访客数）',
    //   name: 'UV',
    //   width: '15%',
    //   textAlign: 'right',
    //   //isMoney: true
    // }, {
    //     title: '操作',
    //     width: '25%',
    //   bodyRender: (data) => {
    //     return (
    //       <div>
    //           <span className={`${styles.brandColor} ${styles.pointer}`}>设为主页</span>
    //           <Divider type="vertical"/>
    //           <span className={`${styles.brandColor} ${styles.pointer}`} onClick={()=>this.editPage(data.Id)}>编辑</span>
    //           <Divider type="vertical"/>
    //           <span className={`${styles.brandColor} ${styles.pointer}`}>预览</span>
    //           {
    //             data.IsHome?null:
    //             <Fragment>
    //               <Divider type="vertical"/>
    //               <span className={`${styles.brandColor} ${styles.pointer}`} onClick={()=>this.removePage(data.Id)}>删除</span>
    //             </Fragment>
    //           }
    //       </div>
    //     );
    //   }
    // }];
    const columns = [
      {
        title: '页面名称',
        dataIndex: 'PageName',
        key: 'PageName',
        render: (text, data) => (
          <div>
            {data.PageName}
            {data.IsHome ? (
              <Tag color="blue" outline={`true`} className={`xkd-ml8 ${styles.tag}`}>
                主页
              </Tag>
            ) : null}
          </div>
        ),
      },
      {
        title: 'pv（页面访问量）',
        dataIndex: 'PV',
        key: 'PV',
        width: '20%',
        align: 'right',
      },
      {
        title: 'uv（独立访客数）',
        dataIndex: 'UV',
        key: 'UV',
        width: '20%',
        align: 'right',
      },
      {
        title: '操作',
        key: '操作',
        width: '30%',
        align: 'right',
        render: (text, data) => (
          <span>
            {this.state.Type == 1 ? (
              <Fragment>
                <Popover content={this.showQRcode(data)} trigger="click" placement="bottom" onVisibleChange={(visible)=>this.handleVisibleChange(visible,data)}>
                  <span className={`${styles.brandColor} ${styles.pointer}`}>推广</span>
                </Popover>
                <Divider type="vertical" />
              </Fragment>
            ) : null}
            {this.state.Type == 1 ? (
              <Fragment>
                <span
                  className={`${styles.brandColor} ${styles.pointer}`}
                  onClick={() => this.settingIndex(data)}
                >
                  设为主页
                </span>
                <Divider type="vertical" />
              </Fragment>
            ) : null}
            <span
              className={`${styles.brandColor} ${styles.pointer}`}
              onClick={() => this.editPage(data.Id)}
            >
              编辑
            </span>
            <Divider type="vertical" />
            <span className={`${styles.brandColor} ${styles.pointer}`}>预览</span>
            {data.IsHome ? null : (
              <Fragment>
                <Divider type="vertical" />
                <Popconfirm
                  placement="topRight"
                  title={'确定删除该页面吗？'}
                  onConfirm={() => this.removePage(data.Id)}
                  okText="确定"
                  cancelText="取消"
                >
                  <span className={`${styles.brandColor} ${styles.pointer}`}>删除</span>
                </Popconfirm>
              </Fragment>
            )}
          </span>
        ),
      },
    ];

    return (
      <Fragment>
        <HeaderTab
          _this={this}
          type="slider"
          activeId={this.state.activeId}
          onChange={this.onTabChange}
          tabs={this.state.tabs}
        >
          {/* <Tabs
            type="slider"
            activeId={this.state.activeId}
            onChange={this.onTabChange}
            tabs={this.state.tabs} /> */}
        </HeaderTab>
        {/* <Loading show={loading}> */}
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" onClick={this.newPage} style={{marginRight: 16}}>
                新建
              </Button>
              <Button onClick={this.reload}>刷新</Button>
            </div>
            <Table
              columns={columns}
              dataSource={microPageList}
              rowKey="Id"
              onChange={this.onChange.bind(this)}
              pagination={this.state.paginationProps}
              loading={loading}
              //   pageInfo={{
              //   //limit: this.state.limit,
              //   current: this.state.current,
              //  // maxPageToShow: this.state.maxPageToShow,
              //   total: this.state.total,
              //   pageSize: [10, { value: 20, isCurrent: true }],
              //   }}
            />
          </Card>
        {/* </Loading> */}
        <Modal
          title="选择模板"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={720}
          footer={null}
          className={styles.Modal}
        >
          <div style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '600px' }}>
            <Row className="xkd-mb16">
              <Col>
                <Button onClick={this.goEdit}>创建空白页</Button>
                <span className="xkd-ml16">您可以创建一个空白页，也可以基于模板页做修改。</span>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <div
                  className={`${styles.templateBox} ${
                    this.state.showType == 1 ? styles.hover : ''
                  }`}
                  onMouseOver={() => this.show(1)}
                >
                  <div className={styles.mask}>
                    <Button type="primary">选择模板创建</Button>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div
                  className={`${styles.templateBox} ${
                    this.state.showType == 2 ? styles.hover : ''
                  }`}
                  onMouseOver={() => this.show(2)}
                >
                  <div className={styles.mask}>
                    <Button type="primary">选择模板创建</Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row gutter={16} className="xkd-mt16 xkd-mb16">
              <Col span={12}>
                <div
                  className={`${styles.templateBox} ${
                    this.state.showType == 3 ? styles.hover : ''
                  }`}
                  onMouseOver={() => this.show(3)}
                >
                  <div className={styles.mask}>
                    <Button type="primary">选择模板创建</Button>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div
                  className={`${styles.templateBox} ${
                    this.state.showType == 4 ? styles.hover : ''
                  }`}
                  onMouseOver={() => this.show(4)}
                >
                  <div className={styles.mask}>
                    <Button type="primary">选择模板创建</Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <div
                  className={`${styles.templateBox} ${
                    this.state.showType == 5 ? styles.hover : ''
                  }`}
                  onMouseOver={() => this.show(5)}
                >
                  <div className={styles.mask}>
                    <Button type="primary">选择模板创建</Button>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div
                  className={`${styles.templateBox} ${
                    this.state.showType == 6 ? styles.hover : ''
                  }`}
                  onMouseOver={() => this.show(6)}
                >
                  <div className={styles.mask}>
                    <Button type="primary">选择模板创建</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(({ micropage, global, loading }) => ({
  micropage,
  wxaUrl:micropage.wxaUrl,
  microPageList: micropage.microPageList,
  loading: loading.effects['micropage/GetMicroPageList'],
  loading2: loading.effects['micropage/GetWxaUrl'],
}))(Pagination);
