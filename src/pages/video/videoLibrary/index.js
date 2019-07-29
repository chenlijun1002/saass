import React, { Component } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Input,
  Progress,
  Menu,
  Table,
  Divider,
  Popconfirm,
  Icon,
  Layout,
  List,
  Avatar,
  message,
  Radio,
  Tooltip,
  Form,
} from 'antd';
import styles from './index.less';
import charts from '../../../assets/charts.png';
import UploadVideo from './components/UploadVideo';
import { connect } from 'dva';
import moment from 'moment';

@connect(({ global, videoList }) => ({
  oemInfo: global.oemInfo,
  videoList,
}))
class VideoLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        showSizeChanger: true,
        showTotal: total => `共 ${total} 条记录`,
        pageSize: 10,
        total: 0,
      },
      videoData: [],
      bottom: 10,
      loading: true,
      isLoading: false,
      pageIndex: 1, //当前页
      // pageSize: 10,        //每页显示条数
      // total: 0,           //总条数
      videoName: '', //视频名称(搜索)
      videoGroupId: -1, //视频分组(搜索)
      keyPath: 0,
      addGroupName: '',
      changeGroupName: '',
      menuTitle: '全部分组',
      selectedRowKeys: [],
      visible: false,
      changeVisible: false,
      radioId: 0,
      videoObj: {},
      isSortTime: true,
      sortTime: '',
      isSortSize: true,
      sortSize: '',
      sortParameter: '',
    };
  }

  componentDidMount() {
    // this.props.onRef(this);
    this.initData(1);
    this.getVideoGroup();
    this.getVideoOverView();
  }

  // 获取视频列表
  initData(pageIndex) {
    const { dispatch } = this.props;
    dispatch({
      type: 'videoList/GetList',
      payload: {
        pageIndex: pageIndex,
        pageSize: this.state.pagination['pageSize'],
        disPlayName: this.state.videoName,
        categoryId: this.state.videoGroupId,
        sortParameter: this.state.sortParameter,
      },
      callBack: {
        success: res => {
          if (res.Code === 0) {
            this.setState({
              loading: false,
              videoData: this.props.videoList.videoLib,
              pagination: {
                pageSize: this.state.pagination['pageSize'],
                current: pageIndex,
                total: this.props.videoList.videoLibTotal,
                showSizeChanger: true,
                showTotal: total => `共 ${total} 条记录`,
              },
            });
          }
        },
        error: res => {
          message.error(res.Msg);
        },
      },
    });
  }
  // 获取视频分组
  getVideoGroup() {
    const { dispatch } = this.props;
    dispatch({
      type: 'videoList/GetVideoCategoryCount',
      callBack: {
        success: res => {
          // if (res.Code === 0) {
          //     this.props.videoList.videoGroupCount && this.props.videoList.videoGroupCount.map((item, index) => {
          //         if (item.Id === this.state.keyPath) {
          //             this.setState({
          //                 menuTitle: item.DisplayName
          //             });
          //         }
          //     });
          // }
        },
        error: res => {
          message.error(res.Msg);
        },
      },
    });
  }
  // 获取视频统计概况
  getVideoOverView() {
    const { dispatch } = this.props;
    dispatch({
      type: 'videoList/GetVideoOverView',
    });
  }
  // 显示弹窗
  showModal = () => {
    this.setState({
      videoObj: {},
      isLoading: true,
    });
  };

  onChangeLoading = () => {
    this.setState(
      {
        isLoading: false,
      },
      () => {
        this.initData(1);
        this.getVideoGroup();
      }
    );
  };

  // Menu点击
  handleClick = e => {
    // console.log('click ', e);
    let keyId = parseInt(e.key);
    this.setState(
      {
        videoName: '',
        keyPath: keyId,
      },
      () => {
        this.props.videoList.videoGroupCount &&
          this.props.videoList.videoGroupCount.map((item, index) => {
            if (index === this.state.keyPath) {
              this.setState(
                {
                  loading: true,
                  menuTitle: item.DisplayName,
                  videoGroupId: item.Id,
                  changeGroupName: item.DisplayName,
                },
                () => {
                  this.initData(1);
                }
              );
            }
          });
      }
    );
  };
  // 添加视频分组
  addCategory = () => {
    if (this.state.addGroupName.match(/^[ ]*$/)) {
      message.error('添加分组名称不能为空');
      this.setState({
        addGroupName: '',
      });
      return false;
    }
    if (this.state.addGroupName.length > 6) {
      message.error('分组名称不超过6个字');
      this.setState({
        addGroupName: '',
      });
      return false;
    }

    const { dispatch } = this.props;
    dispatch({
      type: 'videoList/AddCategory',
      payload: {
        Name: this.state.addGroupName + '',
      },
      callBack: {
        success: res => {
          if (res.Code === 0) {
            message.success('添加成功');
            this.setState(
              {
                addGroupName: '',
              },
              () => {
                this.getVideoGroup();
              }
            );
          }
        },
        error: res => {
          message.error(res.Msg);
        },
      },
    });
  };
  // 关闭添加视频分组气泡框
  addCategoryCancel = () => {
    // console.log('关闭了气泡框...')
    this.setState({
      addGroupName: '',
    });
  };
  // 重命名(视频分组名)
  rename = () => {
    if (this.state.changeGroupName.match(/^[ ]*$/)) {
      message.error('修改分组名称不能为空');
      this.setState({
        changeGroupName: this.state.menuTitle,
      });
      return false;
    }
    if (this.state.changeGroupName.length > 6) {
      message.error('分组名称不超过6个字');
      this.setState({
        changeGroupName: this.state.menuTitle,
      });
      return false;
    }

    const { dispatch } = this.props;
    dispatch({
      type: 'videoList/ReNameCategory',
      payload: {
        Id: this.state.videoGroupId,
        Name: this.state.changeGroupName,
      },
      callBack: {
        success: res => {
          if (res.Code === 0) {
            message.success('修改成功');
            this.setState(
              {
                menuTitle: this.state.changeGroupName,
              },
              () => {
                this.getVideoGroup();
              }
            );
          }
        },
        error: res => {
          message.error(res.Msg);
        },
      },
    });
  };
  // 删除视频分组
  removeVideoGroup = () => {
    let arr = [];
    arr.push(this.state.videoGroupId);

    const { dispatch } = this.props;
    dispatch({
      type: 'videoList/DelCategory',
      payload: {
        Ids: arr,
      },
      callBack: {
        success: res => {
          if (res.Code === 0) {
            message.success('删除成功');
            this.setState(
              {
                keyPath: 0,
                videoGroupId: 0,
                menuTitle: '全部分组',
                selectedRowKeys: [],
              },
              () => {
                this.getVideoGroup();
                this.initData(1);
              }
            );
          }
        },
        error: res => {
          message.error(res.Msg);
        },
      },
    });
  };
  // tab状态发生改变 分页、筛选、排序
  onTabChange = (pagination, filters, sorter) => {
    this.setState(
      {
        loading: true,
        pagination: {
          pageSize: pagination.pageSize,
          total: this.props.videoList.videoLibTotal,
          showSizeChanger: true,
          showTotal: total => `共 ${total} 条记录`,
        },
        pageIndex: pagination.current,
      },
      () => {
        // 大小排序
        if (sorter.column && sorter.column.dataIndex === 'FileSize') {
          if (this.state.isSortSize) {
            this.setState(
              {
                sortParameter: 'filesize_asc',
              },
              () => {
                this.initData(pagination.current);
                this.setState({
                  isSortSize: false,
                  isSortTime: true,
                });
              }
            );
          } else {
            this.setState(
              {
                sortParameter: 'filesize_desc',
              },
              () => {
                this.initData(pagination.current);
                this.setState({
                  isSortSize: true,
                  isSortTime: true,
                });
              }
            );
          }
        } else {
          this.initData(pagination.current);
        }

        // 时间排序
        if (sorter.column && sorter.column.dataIndex === 'ShowDateTime') {
          if (this.state.isSortTime) {
            this.setState(
              {
                sortParameter: 'createtime_desc',
              },
              () => {
                this.initData(pagination.current);
                this.setState({
                  isSortTime: false,
                  isSortSize: true,
                });
              }
            );
          } else {
            this.setState(
              {
                sortParameter: 'createtime_asc',
              },
              () => {
                this.initData(pagination.current);
                this.setState({
                  isSortTime: true,
                  isSortSize: true,
                });
              }
            );
          }
        } else {
          this.initData(pagination.current);
        }
      }
    );
  };
  // 搜索
  onSearchChange = value => {
    this.setState(
      {
        loading: true,
        videoName: value,
      },
      () => {
        this.initData(1);
      }
    );
  };
  // 编辑视频
  editVideo = item => {
    this.setState({
      videoObj: item,
      isLoading: true,
    });
  };
  // 删除视频
  handleDelete = id => {
    let arr = [];
    arr.push(id);

    this.setState(
      {
        selectedRowKeys: arr,
      },
      () => {
        this.onRemove();
      }
    );
  };
  // 删除视频
  onRemove = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'videoList/DelVideo',
      payload: {
        Ids: this.state.selectedRowKeys,
      },
      callBack: {
        success: res => {
          if (res.Code === 0) {
            message.success('删除成功');
            this.setState(
              {
                loading: true,
                selectedRowKeys: [],
              },
              () => {
                this.initData(this.state.pagination.current);
                this.getVideoGroup();
              }
            );
          }
        },
        error: res => {
          message.error(res.Msg);
        },
      },
    });
  };
  // 全选
  onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  // 修改分组
  changeGroups = () => {
    // console.log('选中修改分组的对象数组...', this.state.radioId, this.state.selectedRowKeys)
    this.setState({
      changeVisible: false,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'videoList/MoveCategory',
      payload: {
        CategoryId: this.state.radioId,
        Ids: this.state.selectedRowKeys,
      },
      callBack: {
        success: res => {
          if (res.Code === 0) {
            message.success('修改成功');
            this.setState(
              {
                selectedRowKeys: [],
                radioId: 0,
              },
              () => {
                this.initData(1);
                this.getVideoGroup();
              }
            );
          }
        },
        error: res => {
          message.error(res.Msg);
        },
      },
    });
  };
  // 修改分组按钮
  onChangeGroupVisible = () => {
    if (this.state.selectedRowKeys.length <= 0) {
      message.error('请选择需要批量修改分组的视频');
      return false;
    }
    this.setState({
      changeVisible: true,
      visible: false,
    });
  };
  // 删除
  onChangeVisible = () => {
    if (this.state.selectedRowKeys.length <= 0) {
      message.error('请选择需要批量删除的视频');
      return false;
    }
    this.setState({
      visible: true,
      changeVisible: false,
    });
  };
  // 全部删除
  deleteAll = () => {
    // console.log('选中删除的对象数组...', this.state.selectedRowKeys)
    this.setState(
      {
        visible: false,
      },
      () => {
        this.onRemove();
      }
    );
  };
  // 修改分组
  onChangeRadio = e => {
    this.setState({
      radioId: e.target.value,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const addGroup = (
      <div className="popContent">
        <p>添加分组</p>
        <Input
          placeholder="不超过6个字"
          value={this.state.addGroupName}
          onChange={e => {
            this.setState({ addGroupName: e.target.value });
          }}
        />
      </div>
    );

    const editGroup = (
      <div className="popContent">
        <p>编辑名称</p>
        <Input
          placeholder="不超过6个字"
          value={this.state.changeGroupName}
          onChange={e => {
            this.setState({ changeGroupName: e.target.value });
          }}
        />
      </div>
    );

    const removeGroup = (
      <div className="popContent">
        <p>
          <Icon type="question-circle-o" style={{ color: 'red', marginRight: '8px' }} />
          确定删除分组?
        </p>
        <p className="txtContent">仅删除分组，不删除视频，组内视频将自动归入未分组</p>
      </div>
    );

    const removeVideo = (
      <div>
        <p>
          <Icon type="question-circle-o" style={{ color: 'red', marginRight: '8px' }} />
          确定删除该视频?
        </p>
        <p className="txtContent">使用该视频的微页面组件将无法播放</p>
      </div>
    );

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const selectGroup = (
      <div>
        <p>选择分组</p>
        <div className="txtContent" style={{ maxHeight: '162px', overflow: 'auto' }}>
          <Radio.Group onChange={this.onChangeRadio} value={this.state.radioId}>
            {this.props.videoList.videoGroupCount &&
              this.props.videoList.videoGroupCount.map((item, index) => {
                if (index !== 0) {
                  return (
                    <Radio key={index} style={radioStyle} value={item.Id}>
                      {item.DisplayName}
                    </Radio>
                  );
                }
              })}
          </Radio.Group>
        </div>
      </div>
    );

    const percent =
      this.props.videoList.OverView &&
      100 -
        Math.round(
          (this.props.videoList.OverView.AlreadyUsedTime /
            this.props.videoList.OverView.AlreadyBuyTime) *
            10000
        ) /
          100.0;

    return (
      <div className={styles.contentBox}>
        <Row gutter={16} className={styles.cardList}>
          <Col span={8}>
            <Card bordered={true}>
              <Row>
                <Col span={12}>
                  <p className={styles.mb8}>已上传视频数（个）</p>
                  {this.props.videoList.OverView.Msg}
                  <h2>
                    {this.props.videoList.OverView ? this.props.videoList.OverView.VideoNum : 0}
                  </h2>
                </Col>
                <Col span={12} className={styles.onRight}>
                  <img src={charts} className={styles.mt20} alt="" />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={true}>
              <Row>
                <Col span={12}>
                  <p className={styles.mb8}>已购时长（分钟）</p>
                  <h2>
                    {this.props.videoList.OverView
                      ? this.props.videoList.OverView.AlreadyBuyTime
                      : 0}
                  </h2>
                </Col>
                <Col span={12} className={styles.onRight}>
                  <img src={charts} className={styles.mt20} alt="" />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={true}>
              <Row>
                <Col span={6}>
                  <Progress
                    strokeLinecap="square"
                    showInfo={false}
                    type="circle"
                    strokeColor={'#2E74FF'}
                    percent={percent}
                  />
                </Col>
                <Col span={12}>
                  <p className={styles.mg8}>
                    <span className={styles.square} />
                    剩余
                    {this.props.videoList.OverView
                      ? this.props.videoList.OverView.RemainUsedTime
                      : 0}
                    分钟
                  </p>
                  <p className={styles.lh24}>
                    <span className={styles.square} />
                    已用
                    {this.props.videoList.OverView
                      ? this.props.videoList.OverView.AlreadyUsedTime
                      : 0}
                    分钟
                  </p>
                </Col>
                <Col span={6} className={styles.onRight}>
                  <Button
                    className={styles.mt20}
                    onClick={() => {
                      console.log('加购');
                    }}
                  >
                    加购
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} className={styles.inputBox}>
          <Col span={12}>
            <Button type="primary" onClick={this.showModal}>
              上传视频
            </Button>
          </Col>
          <Col span={12} className={styles.flr}>
            <Input.Search
              placeholder="请输入视频名称搜索"
              onSearch={this.onSearchChange}
              value={this.state.videoName}
              onChange={e => {
                this.setState({ videoName: e.target.value });
              }}
            />
          </Col>
        </Row>

        <Layout className={styles.mainBox}>
          <Layout.Sider width={'168'} theme={'light'} className={styles.menuBox}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[`${this.state.keyPath}`]}
              mode="inline"
              style={{ background: '#F5F5F5' }}
            >
              {this.props.videoList.videoGroupCount &&
                this.props.videoList.videoGroupCount.map((item, index) => {
                  return (
                    <Menu.Item key={index}>
                      <p>
                        {item.DisplayName}
                        <span className={styles.menuCount}>{item.Count}</span>
                      </p>
                    </Menu.Item>
                  );
                })}
            </Menu>

            <Popconfirm
              placement="topLeft"
              title={addGroup}
              onConfirm={this.addCategory}
              onCancel={this.addCategoryCancel}
              icon={false}
              okText="确定"
              cancelText="取消"
            >
              <Button type="dashed" className={styles.menuButton}>
                <Icon type="plus" />
                添加分组
              </Button>
            </Popconfirm>
          </Layout.Sider>

          <Layout className={styles.tabBox}>
            <Layout.Content>
              <div className={styles.topBox}>
                <span>{this.state.menuTitle}</span>
                {this.state.keyPath !== 0 &&
                  this.state.videoGroupId !== 0 && (
                    <span className={styles.aSpan}>
                      <Popconfirm
                        placement="bottom"
                        title={editGroup}
                        onConfirm={this.rename}
                        icon={false}
                        okText="确定"
                        cancelText="取消"
                      >
                        <a href="javascript:;">重命名</a>
                      </Popconfirm>
                      <Divider type="vertical" />
                      <Popconfirm
                        placement="bottom"
                        title={removeGroup}
                        onConfirm={this.removeVideoGroup}
                        icon={false}
                        okText="确定"
                        cancelText="取消"
                      >
                        <a href="javascript:;">删除分组</a>
                      </Popconfirm>
                    </span>
                  )}
              </div>

              <div className={styles.tableBox}>
                <Table
                  rowSelection={rowSelection}
                  dataSource={this.state.videoData}
                  pagination={this.state.pagination}
                  loading={loading}
                  rowKey={record => record.Id}
                  onChange={this.onTabChange}
                  // footer={()=>()}
                  columns={[
                    {
                      title: '视频',
                      dataIndex: 'DisplayName',
                      render: (text, record) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <div className={styles.avatarBox}>
                                <Avatar
                                  src={
                                    this.props.oemInfo &&
                                    this.props.oemInfo['cdnUrl'] + '/' + record.Img + '?x-oss-process=style/180'
                                  }
                                />
                                <div className={styles.playCircle}>
                                  <Icon type="caret-right" />
                                </div>
                              </div>
                            }
                            title={<Tooltip title={text}>{text}</Tooltip>}
                            // title={text}
                            description={record.ShowTime}
                          />
                        </List.Item>
                      ),
                    },
                    {
                      title: '大小',
                      dataIndex: 'FileSize',
                      align: 'right',
                      sorter: (a, b) => a.FileSize - b.FileSize,
                      width: 120,
                    },
                    {
                      title: '上传时间',
                      dataIndex: 'ShowDateTime',
                      align: 'left',
                      sorter: (a, b) =>
                        moment(a.ShowDateTime).valueOf() - moment(b.ShowDateTime).valueOf(),
                      width: 200,
                    },
                    {
                      title: '状态',
                      dataIndex: 'Status',
                      render: (text, record) => (
                        <span>
                          {record.Status === 6
                            ? '审核通过'
                            : record.Status === 5
                              ? '审核失败'
                              : record.Status === 4
                                ? '审核中'
                                : record.Status === 3
                                  ? '转码失败'
                                  : record.Status === 2
                                    ? '转码中'
                                    : ''}
                        </span>
                      ),
                      width: 120,
                    },
                    {
                      title: '操作',
                      key: 'action',
                      render: (text, record) => (
                        <span>
                          <a
                            href="javascript:;"
                            onClick={() => {
                              this.editVideo(record);
                            }}
                          >
                            编辑
                          </a>
                          <Divider type="vertical" />
                          <Popconfirm
                            placement="topRight"
                            title={removeVideo}
                            icon={false}
                            onConfirm={() => this.handleDelete(record.Id)}
                          >
                            <a href="javascript:;">删除</a>
                          </Popconfirm>
                        </span>
                      ),
                      align: 'right',
                      width: 120,
                    },
                  ]}
                />
                {this.state.videoData.length > 0 ? (
                  <div className={styles.selectBox}>
                    {/* <Checkbox onChange={this.selectAll}>当页全选</Checkbox> */}

                    <Popconfirm
                      placement="topLeft"
                      title={selectGroup}
                      icon={false}
                      onConfirm={() => this.changeGroups()}
                      visible={this.state.changeVisible}
                      onCancel={() => {
                        this.setState({ changeVisible: false, radioId: 0 });
                      }}
                    >
                      <Button className={styles.changeButton} onClick={this.onChangeGroupVisible}>
                        修改分组
                      </Button>
                    </Popconfirm>

                    <Popconfirm
                      placement="topLeft"
                      title={removeVideo}
                      icon={false}
                      onConfirm={() => this.deleteAll()}
                      visible={this.state.visible}
                      onCancel={() => {
                        this.setState({ visible: false });
                      }}
                    >
                      <Button onClick={this.onChangeVisible}>删除</Button>
                    </Popconfirm>
                  </div>
                ) : null}
              </div>
            </Layout.Content>
          </Layout>
        </Layout>

        {this.state.isLoading && (
          <UploadVideo onIsLoading={this.onChangeLoading} videoObj={this.state.videoObj} />
        )}
      </div>
    );
  }
}

export default Form.create()(VideoLibrary);
