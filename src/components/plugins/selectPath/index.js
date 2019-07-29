import React, { PureComponent, Fragment } from 'react';
// import { Table,Notify,Dialog,Tabs,Menu,Popover,Button,Checkbox,NumberInput,Input,Layout } from 'zent';
import {
  Select,
  Table,
  message,
  Modal,
  Tabs,
  Menu,
  Popover,
  Button,
  Checkbox,
  NumberInput,
  Input,
  Row,
  Col,
} from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './index.less';
//const TabPanel = Tabs.TabPanel;
const TabPanel = Tabs.TabPane;
const TabPane = Tabs.TabPane;
//const {Row,Col}=Layout;
const { MenuItem } = Menu;
const { Option } = Select;
const paginationProps = {
  showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 10,
  total: 50,
};
@connect(({ storenavigation, loading }) => ({
  storenavigation,
  // dataList: storenavigation,
  groupList: storenavigation.groupList,
  activityTypeList: storenavigation.activityTypeList,
  microPageList: storenavigation.microPagePathList,
  functionPathList: storenavigation.functionPathList,
  productPathList: storenavigation.productPathList,
  activityPathList: storenavigation.activityPathList,
  loading: loading.effects['storenavigation/GetFunctionPathList'],
  loading2: loading.effects['storenavigation/GetProductPathList'],
  loading3: loading.effects['storenavigation/GetMicroPagePathList'],
  loading4: loading.effects['storenavigation/GetActivityPathList'],
}))
export default class SelectPagePath extends React.PureComponent {
  state = {
    modalVisible: false,
    contentType: 1,
    selectedRowKeys: [],
    visible: false,
    btnText: '按分组',
    type: 1,
    checked: false,
    activityTypeId: 1,
    groupId: 0,
    paginationProps: {
      //showSizeChanger: true,
      //showQuickJumper: true,
      current: 1,
      pageSize: 5,
      total: 0,
    },
    KeyWord: '',
    MinPrice: '',
    MaxPrice: '',
    limit: 10,
    current: 1,
    total: 0,
    maxPageToShow: 8,
    pageSize: 5,
    activeId: '1',
    tabs: [
      {
        title: '功能页面',
        key: '1',
        // disabled: true
      },
      {
        title: '商品',
        key: '2',
      },
      {
        title: '微页面',
        key: '3',
      },
      {
        title: '营销活动',
        key: '4',
      },
    ],
  };
  componentDidMount() {
    console.log(this.props);
    this.props.onRef && this.props.onRef(this);
  }
  requestList = pagination => {
    const { dispatch } = this.props;
    dispatch({
      type: 'storenavigation/GetFunctionPathList',
      payload: {
        // Type:1,
        PageSize: pagination && pagination.pageSize ? pagination.pageSize : 5,
        PageIndex: pagination && pagination.current ? pagination.current : 1,
      },
      callback: {
        success: data => {
          // let datas = Object.assign({}, this.state.paginationProps, { total })
          if (data.Code == 0) {
            this.setState({
              paginationProps: { ...this.state.paginationProps, total: data.Data.Total },
              total: data.Data.Total,
            });
          }
        },
        error: data => {
          message.error('加载列表失败');
        },
      },
    });
  };
  showModal = () => {
    this.setState(
      {
        visible: true,
      },
      () => {
        this.requestList();
      }
    );
  };
  handleModalVisible = () => {
    this.setState({
      visible: false,
      contentType: 1,
    });
  };
  changeTab = type => {
    const { dispatch, onChangeTab, contentType } = this.props;
    const {paginationProps}=this.state;
    paginationProps.current=1;
    this.setState({
      paginationProps,
      contentType: type,
      KeyWord: '',
      activityTypeId: 0,
      groupId: 0,
      MinPrice: '',
      MaxPrice: '',
    });
    if (type == 1) {
      dispatch({
        type: 'storenavigation/GetFunctionPathList',
        payload: {
          // Type:type,
          PageSize: 5,
          PageIndex: 1,
        },
        callback: {
          success: res => {
            if (res.Code == 0) {
              this.setState({
                paginationProps: { ...this.state.paginationProps, total: res.Data.Total },
                total: res.Data.Total,
              });
            }
          },
        },
      });
    } else if (type == 2) {
      dispatch({
        type: 'storenavigation/GetProductGroup',
        payload: {},
        callback: {
          success: res => {
            if (res.Code == 0) {
            }
          },
        },
      });
      dispatch({
        type: 'storenavigation/GetProductPathList',
        payload: {
          Type: this.state.type,
          KeyId: 0,
          IsOnSale: 0,
          MinPrice: 0,
          MaxPrice: 0,
          KeyWord: '',
          PageSize: 5,
          PageIndex: 1,
        },
        callback: {
          success: res => {
            if (res.Code == 0) {
              this.setState({
                paginationProps: { ...this.state.paginationProps, total: res.Data.Total },
                total: res.Data.Total,
              });
            }
          },
        },
      });
    } else if (type == 3) {
      dispatch({
        type: 'storenavigation/GetMicroPagePathList',
        payload: {
          Type: 1,
          PageSize: 5,
          PageIndex: 1,
        },
        callback: {
          success: res => {
            if (res.Code == 0) {
              this.setState({
                paginationProps: { ...this.state.paginationProps, total: res.Data.Total },
                total: res.Data.Total,
              });
            }
          },
        },
      });
    } else {
      dispatch({
        type: 'storenavigation/GetActivityType',
        payload: {},
        callback: {
          success: res => {
            if (res.Code == 0) {
              this.setState({
                activityTypeId: res.Data.ActivityTypeList[0].TypeId,
              });
            }
          },
        },
      });
      dispatch({
        type: 'storenavigation/GetActivityPathList',
        payload: {
          Type: 1,
          KeyWord: '',
          PageSize: 5,
          PageIndex: 1,
        },
        callback: {
          success: res => {
            if (res.Code == 0) {
              this.setState({
                paginationProps: { ...this.state.paginationProps, total: res.Data.Total },
                total: res.Data.Total,
              });
            }
          },
        },
      });
    }
    // _this.setState(
    //   {
    //     contentType: type,
    //   },
    //   () => {
    //     //onChangeTab(val);
    //   }
    // );
  };
  search = () => {
    const { dispatch } = this.props;
    const { contentType } = this.state;
    if (contentType == 2) {
      dispatch({
        type: 'storenavigation/GetProductPathList',
        payload: {
          Type: 1,
          KeyId: this.state.groupId,
          IsOnSale: this.state.checked ? 1 : 0,
          MinPrice: this.state.MinPrice,
          MaxPrice: this.state.MaxPrice,
          KeyWord: this.state.KeyWord,
          PageSize: this.state.paginationProps.pageSize,
          PageIndex: this.state.paginationProps.current,
        },
        callback: {
          success: res => {
            if (res.Code == 0) {
              this.setState({
                paginationProps: {
                  ...this.state.paginationProps,
                  total: res.Data.Total,
                  current: 1,
                },
                total: res.Data.Total,
                current: 1,
              });
            }
          },
        },
      });
    } else if (contentType == 4) {
      dispatch({
        type: 'storenavigation/GetActivityPathList',
        payload: {
          Type: this.state.activityTypeId,
          KeyWord: this.state.KeyWord,
          PageSize: this.state.paginationProps.pageSize,
          PageIndex: this.state.paginationProps.current,
        },
        callback: {
          success: res => {
            if (res.Code == 0) {
              this.setState({
                paginationProps: {
                  ...this.state.paginationProps,
                  total: res.Data.Total,
                  current: 1,
                },
                total: res.Data.Total,
                current: 1,
              });
            }
          },
        },
      });
    }
  };
  handleTableChange = pagination => {
    const { dispatch } = this.props;
    this.setState(
      {
        paginationProps: { ...pagination },
      },
      () => {
        if (this.state.contentType == 1) {
          dispatch({
            type: 'storenavigation/GetFunctionPathList',
            payload: {
              // Type:type,
              PageSize: this.state.paginationProps.pageSize,
              PageIndex: this.state.paginationProps.current,
            },
            callback: {
              success: res => {
                if (res.Code == 0) {
                  this.setState({
                    paginationProps: { ...this.state.paginationProps, total: res.Data.Total },
                    total: res.Data.Total,
                  });
                }
              },
            },
          });
        } else if (this.state.contentType == 2) {
          dispatch({
            type: 'storenavigation/GetProductPathList',
            payload: {
              Type: 1,
              KeyId: this.state.groupId,
              IsOnSale: this.state.checked,
              MinPrice: this.state.MinPrice,
              MaxPrice: this.state.MaxPrice,
              KeyWord: this.state.KeyWord,
              PageSize: this.state.paginationProps.pageSize,
              PageIndex: this.state.paginationProps.current,
            },
            callback: {
              success: res => {
                if (res.Code == 0) {
                  this.setState({
                    paginationProps: { ...this.state.paginationProps, total: res.Data.Total },
                    total: res.Data.Total,
                  });
                }
              },
            },
          });
        } else if (this.state.contentType == 3) {
          dispatch({
            type: 'storenavigation/GetMicroPagePathList',
            payload: {
              Type: 1,
              PageSize: this.state.paginationProps.pageSize,
              PageIndex: this.state.paginationProps.current,
            },
            callback: {
              success: res => {
                if (res.Code == 0) {
                  this.setState({
                    paginationProps: { ...this.state.paginationProps, total: res.Data.Total },
                    total: res.Data.Total,
                  });
                }
              },
            },
          });
        } else {
          dispatch({
            type: 'storenavigation/GetActivityPathList',
            payload: {
              Type: this.state.activityTypeId,
              KeyWord: this.state.KeyWord,
              PageSize: this.state.paginationProps.pageSize,
              PageIndex: this.state.paginationProps.current,
            },
            callback: {
              success: res => {
                if (res.Code == 0) {
                  this.setState({
                    paginationProps: { ...this.state.paginationProps, total: res.Data.Total },
                    total: res.Data.Total,
                  });
                }
              },
            },
          });
        }
      }
    );
  };
  select = (e, key) => {
    this.setState({
      type: key,
      visible: false,
      btnText: e.target.innerText,
    });
  };
  handleChange = e => {
    this.setState({
      checked: e.target.checked,
    });
  };
  handleSelectChange = (type, val) => {
    if (type == 1) {
      this.setState({
        groupId: val,
      });
    } else {
      this.setState({
        activityTypeId: val,
      });
    }
  };
  changeKeyWord = e => {
    this.setState({
      KeyWord: e.target.value,
    });
  };
  handleNumberChange = (type, e) => {
    if (type == 1) {
      this.setState({
        MinPrice: e.target.value,
      });
    } else {
      this.setState({
        MaxPrice: e.target.value,
      });
    }
  };
  selectPath = record => {
    const { selectPath } = this.props;
    selectPath(record);
    this.handleModalVisible();
  };
  render() {
    const {
      loading,
      loading2,
      loading3,
      loading4,
      // visible,
      handleModalVisible,
      // selectPath,
      //dataList,
      groupList,
      activityTypeList,
      microPageList,
      functionPathList,
      productPathList,
      activityPathList,
      // contentType,
      onChangeTab,
    } = this.props;
    const { contentType, visible } = this.state;
    let dataList =
      contentType == 1
        ? functionPathList
        : contentType == 2
          ? productPathList
          : contentType == 3
            ? microPageList
            : activityPathList;
    const columns1 = [
      {
        title: '页面名称',
        dataIndex: 'PageName',
        align: 'left',
        // width: '10%',
      },
      {
        title: '操作',
        //dataIndex: 'status',
        align: 'right',
        // width: '10%',
        render: record => (
          <Fragment>
            <a
              href="javascript:void(0);"
              onClick={() =>
                this.selectPath({
                  PageName:
                    record.PageName ||
                    record.ProductName ||
                    record.MicroPageName ||
                    record.ActivityName,
                  PageId:
                    record.PageId ||
                    record.ProductId ||
                    record.MicroPagetId ||
                    record.ActivityPathId,
                  PagePath:
                    record.PagePath ||
                    record.ProductPath ||
                    record.MicroPagePath ||
                    record.ActivityPath,
                })
              }
            >
              确认选择
            </a>
          </Fragment>
        ),
      },
    ];
    const columns2 = [
      {
        title: '商品名称',
        dataIndex: 'ProductName',
        align: 'left',
        // width: '10%',
      },
      {
        title: '价格',
        dataIndex: 'Price',
        align: 'left',
        // width: '10%',
      },
      {
        title: '商品状态',
        dataIndex: 'Status',
        align: 'left',
        // width: '10%',
      },
      {
        title: '操作',
        //dataIndex: 'status',
        align: 'right',
        // width: '10%',
        render: record => (
          <Fragment>
            <a
              href="javascript:void(0);"
              onClick={() =>
                this.selectPath({
                  PageName:
                    record.PageName ||
                    record.ProductName ||
                    record.MicroPageName ||
                    record.ActivityName,
                  PageId:
                    record.PageId ||
                    record.ProductId ||
                    record.MicroPagetId ||
                    record.ActivityPathId,
                  PagePath:
                    record.PagePath ||
                    record.ProductPath ||
                    record.MicroPagePath ||
                    record.ActivityPath,
                })
              }
            >
              确认选择
            </a>
          </Fragment>
        ),
      },
    ];
    const columns3 = [
      {
        title: '微页面名称',
        dataIndex: 'MicroPageName',
        align: 'left',
        // width: '10%',
      },
      {
        title: '操作',
        //dataIndex: 'status',
        align: 'right',
        // width: '10%',
        render: record => (
          <Fragment>
            <a
              href="javascript:void(0);"
              onClick={() =>
                this.selectPath({
                  PageName:
                    record.PageName ||
                    record.ProductName ||
                    record.MicroPageName ||
                    record.ActivityName,
                  PageId:
                    record.PageId ||
                    record.ProductId ||
                    record.MicroPagetId ||
                    record.ActivityPathId,
                  PagePath:
                    record.PagePath ||
                    record.ProductPath ||
                    record.MicroPagePath ||
                    record.ActivityPath,
                })
              }
            >
              确认选择
            </a>
          </Fragment>
        ),
      },
    ];
    const columns4 = [
      {
        title: '活动名称',
        dataIndex: 'ActivityName',
        align: 'left',
        // width: '10%',
      },
      {
        title: '活动状态',
        dataIndex: 'Status',
        align: 'left',
        // width: '10%',
      },
      {
        title: '有效时间',
        //dataIndex: 'ActivityName',
        align: 'left',
        width: '35%',
        render: record => (
          <Fragment>
            <span>{record.StartTime}</span>
            <span>~</span>
            <span>{record.EndTime}</span>
          </Fragment>
        ),
      },
      {
        title: '操作',
        //dataIndex: 'status',
        align: 'right',
        // width: '10%',
        render: record => (
          <Fragment>
            <a
              href="javascript:void(0);"
              onClick={() =>
                this.selectPath({
                  PageName:
                    record.PageName ||
                    record.ProductName ||
                    record.MicroPageName ||
                    record.ActivityName,
                  PageId:
                    record.PageId ||
                    record.ProductId ||
                    record.MicroPagetId ||
                    record.ActivityPathId,
                  PagePath:
                    record.PagePath ||
                    record.ProductPath ||
                    record.MicroPagePath ||
                    record.ActivityPath,
                })
              }
            >
              确认选择
            </a>
          </Fragment>
        ),
      },
    ];
    return (
      <Modal
        width={960}
        centered
        title={'绑定链接'}
        visible={visible}
        onCancel={this.handleModalVisible}
        footer={false}
        //onOk={selectPath}
        className={styles.modal}
      >
        <div className={styles.container}>
          <Tabs
            onChange={e => this.changeTab(e)}
            type="card"
            activeKey={`${this.state.contentType}`}
            //tabs={this.state.tabs}
          >
            {this.state.tabs.map((pane, index) => {
              return <TabPane tab={pane.title} key={pane.key} />;
            })}
          </Tabs>
          {contentType == 2 ? (
            <div className={`xkd-mb16`}>
              <Row>
                <Col span={10}>
                  <div className="xkd-mr8 xkd-inline-block">
                    {/* <Popover
                  visible={this.state.visible}
                  onVisibleChange={v => this.setState({ visible: v })}
                  position={Popover.Position.AutoBottomLeft}
                  display="inline"
                  cushion={5}                 
                >
                  <Popover.Trigger.Click >
                    <Button >{this.state.btnText}</Button>
                  </Popover.Trigger.Click>
                  <Popover.Content >
                    <Menu onClick={(e,key) => this.select(e,key)}>
                      <MenuItem key='1'>按分组</MenuItem>
                      <MenuItem key='2'>服装分类</MenuItem>
                    </Menu>
                  </Popover.Content>
                </Popover> */}
                    <Select
                      defaultValue="全部分组"
                      style={{ width: 120 }}
                      onChange={val => this.handleSelectChange(1, val)}
                    >
                      {/* <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>                    
                    <Option value="Yiminghe">yiminghe</Option> */}
                      {groupList.map((item, index) => {
                        return (
                          <Option value={item.Id} key={index}>
                            {item.Name}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                  {/* <div className="xkd-mr8 xkd-inline-block">
                  <Popover
                    visible={this.state.visible}
                    onVisibleChange={v => this.setState({ visible: v })}
                    position={Popover.Position.AutoBottomLeft}
                    display="inline"
                    cushion={5}
                    
                  >
                    <Popover.Trigger.Click >
                      <Button >{this.state.btnText}</Button>
                    </Popover.Trigger.Click>
                    <Popover.Content >
                      <Menu onClick={(e,key) => this.select(e,key)}>
                        <MenuItem key='1'>按分组</MenuItem>
                        <MenuItem key='2'>服装分类</MenuItem>
                      </Menu>
                    </Popover.Content>
                  </Popover>
                </div>   */}
                  <Checkbox checked={this.state.checked} onChange={this.handleChange}>
                    显示已上架
                  </Checkbox>
                </Col>
                <Col span={14}>
                  <div className="xkd-text-right">
                    <div className="xkd-inline-block">
                      <Input
                        type="text"
                        //size={size}
                        placeholder="价格区间"
                        value={this.state.MinPrice}
                        onChange={val => this.handleNumberChange(1, val)}
                        style={{ width: 80 }}
                      />
                    </div>
                    <span className="xkd-ml8 xkd-mr8">-</span>
                    <div className="xkd-inline-block xkd-mr8">
                      <Input
                        type="text"
                        //size={size}
                        placeholder="价格区间"
                        value={this.state.MaxPrice}
                        onChange={val => this.handleNumberChange(2, val)}
                        style={{ width: 80 }}
                      />
                    </div>
                    <div className="xkd-inline-block xkd-mr8">
                      <Input
                        placeholder="请输入商品名称搜索"
                        style={{ width: 192 }}
                        value={this.state.KeyWord}
                        onChange={this.changeKeyWord}
                      />
                    </div>

                    <Button onClick={this.search}>搜索</Button>
                    {/* <Row>
                  <Col span={4} >                   
                    <Input
                      type="text"                     
                      value={this.state.MinPrice}
                      onChange={()=>this.handleNumberChange(1)}                   
                    /> 
                  </Col>
                  <Col span={1} className="xkd-text-center" style={{lineHeight:'24px'}}>
                    -                                     
                  </Col>
                  <Col span={4} >                                       
                    <Input
                      type="text"
                      //size={size}
                      value={this.state.MaxPrice}
                      onChange={()=>this.handleNumberChange(2)}
                      style={{ width: '65%', marginRight: '3%' }}
                    />                 
                  </Col>
                  <Col span={7} >
                    <Input placeholder="请输入名字" />                    
                  </Col>
                  <Col span={3}>                   
                    <Button>搜索</Button>
                  </Col>
                </Row>  */}
                  </div>
                </Col>
              </Row>
            </div>
          ) : contentType == 4 ? (
            <div className={`xkd-mb16`}>
              <Row>
                <Col span={15}>
                  <Select
                    defaultValue={1}
                    style={{ width: 120 }}
                    onChange={val => this.handleSelectChange(2, val)}
                  >
                    {activityTypeList.map((item, index) => {
                      return (
                        <Option value={item.TypeId} key={index}>
                          {item.TypeName}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col span={7}>
                  <Input
                    placeholder="请输入商品名称搜索"
                    value={this.state.KeyWord}
                    onChange={this.changeKeyWord}
                  />
                </Col>
                <Col span={2}>
                  <Button className="xkd-fr" onClick={this.search}>
                    搜索
                  </Button>
                </Col>
              </Row>
            </div>
          ) : null}
          <Table
            loading={loading || loading2 || loading3 || loading4}
            rowKey={
              contentType == 1
                ? 'PageId'
                : contentType == 2
                  ? 'ProductId'
                  : contentType == 3
                    ? 'MicroPagetId'
                    : 'ActivityPathId'
            }
            //rowSelection={rowSelection}
            dataSource={dataList}           
            columns={
              contentType == 1
                ? columns1
                : contentType == 2
                  ? columns2
                  : contentType == 3
                    ? columns3
                    : columns4
            }
            pagination={this.state.paginationProps}
            onChange={this.handleTableChange}
            // pageInfo={{
            //   current: this.state.current,
            //   total: this.state.total,
            //   pageSize: [10, { value: 5, isCurrent: true }],
            // }}
          />
        </div>
      </Modal>
    );
  }
}
