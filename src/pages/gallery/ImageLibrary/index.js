import React, { Component } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Input,
  Spin,
  Menu,
  Checkbox,
  Divider,
  Popconfirm,
  Icon,
  Layout,
  Pagination,
  message,
  Radio,
  Tooltip,
  Modal,
  Popover,
  Form,
} from 'antd';
import styles from './index.less';
import Statistical from './../../../components/PagesComponents/Statistical';
import Preview from './../../../components/PagesComponents/Preview';
import UploadImage from './../UploadImage';
import copy from 'copy-to-clipboard';
import { connect } from 'dva';

@connect(({ global, imageList }) => ({
  oemInfo: global.oemInfo,
  imageList,
}))
class ImageLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        showSizeChanger: true,
        showTotal: total => `共 ${total} 条记录`,
        pageSize: 15,
        total: 0,
      },
      pageIndex: 1,
      imageName: '',
      imageGroupId: -1,
      keyPath: 0,
      menuTitle: '全部分组',
      // checkedCardId: 1,
      checkedCard: false,
      sortParameter: '',
      loading: true,
      imageListData: [],
      isLoading: false,
      addGroupName: '',
      changeGroupName: '',
      imgReName: '',
      radioId: 0,
      linkUrl: '',
      checkedImageIndex: null,
      imageVisible: false,
      picUrl: '',
      Allchoose: false,
      selectedRowKeys: [],
      visible: false,
      changeVisible: false,
      imageLoading: true,
    };
  }

  componentDidMount() {
    this.getImageOverView();
    this.getImageGroup();
    this.initData(1);
  }
  // 获取图片列表
  initData(pageIndex) {
    const { dispatch } = this.props;
    dispatch({
      type: 'imageList/GetList',
      payload: {
        pageIndex: pageIndex,
        pageSize: this.state.pagination.pageSize,
        disPlayName: this.state.imageName,
        categoryId: this.state.imageGroupId,
        sortParameter: this.state.sortParameter,
      },
      callBack: {
        success: res => {
          if (res.Code === 0) {
            this.setState({
              loading: false,
              imageListData: res.Data.PageList,
              pagination: {
                pageSize: this.state.pagination.pageSize,
                current: pageIndex,
                total: res.Data.Total,
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

  // 获取图片统计概况
  getImageOverView() {
    const { dispatch } = this.props;
    dispatch({
      type: 'imageList/GetImageOverView',
      callBack: {
        success: res => {
          // console.log('res..........', res);
        },
        error: res => {
          message.error(res.Msg);
        },
      },
    });
  }
  // 获取图片分组
  getImageGroup() {
    const { dispatch } = this.props;
    dispatch({
      type: 'imageList/GetImageCategoryCount',
      callBack: {
        success: res => {
          // console.log('res..........', res);
        },
        error: res => {
          message.error(res.Msg);
        },
      },
    });
  }
  // Menu点击
  handleClick = e => {
    let keyId = parseInt(e.key);
    this.setState(
      {
        imageName: '',
        keyPath: keyId,
      },
      () => {
        this.props.imageList.imageGroupCount &&
          this.props.imageList.imageGroupCount.map((item, index) => {
            if (index === this.state.keyPath) {
              this.setState(
                {
                  loading: true,
                  menuTitle: item.DisplayName,
                  imageGroupId: item.Id,
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

  // 分页
  onPageChange = (page, pageSize) => {
    this.setState(
      {
        loading: true,
        pageIndex: page,
      },
      () => {
        this.initData(this.state.pageIndex);
      }
    );
  };
  // 记录数
  showTotal = total => {
    return `共 ${total} 条记录`;
  };
  // 显示弹窗
  showModal = () => {
    this.setState({
      // videoObj: {},
      isLoading: true,
    });
  };

  onChangeLoading = () => {
    this.setState(
      {
        loading: true,
        isLoading: false,
      },
      () => {
        this.initData(1);
        this.getImageGroup();
      }
    );
  };
  // 搜索
  onSearchChange = value => {
    this.setState(
      {
        loading: true,
        imageName: value,
      },
      () => {
        this.initData(1);
      }
    );
  };
  // 添加图片分组
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
      type: 'imageList/AddImageCategory',
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
                this.getImageGroup();
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
  // 关闭添加图片分组气泡框
  addCategoryCancel = () => {
    this.setState({
      addGroupName: '',
    });
  };
  // 删除图片分组
  removeImageGroup = () => {
    let arr = [];
    arr.push(this.state.imageGroupId);

    const { dispatch } = this.props;
    dispatch({
      type: 'imageList/DelImageCategory',
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
                imageGroupId: -1,
                menuTitle: '全部分组',
                selectedRowKeys: [],
              },
              () => {
                this.getImageGroup();
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

  // 重命名(图片分组名)
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
      type: 'imageList/ReNameImageCategory',
      payload: {
        Id: this.state.imageGroupId,
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
                this.getImageGroup();
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
  // 图片改名
  imgRename = id => {
    if (this.state.imgReName.match(/^[ ]*$/)) {
      message.error('图片名称不能为空');
      return false;
    }

    const { dispatch } = this.props;
    dispatch({
      type: 'imageList/PicReName',
      payload: {
        Id: id,
        Name: this.state.imgReName,
      },
      callBack: {
        success: res => {
          if (res.Code === 0) {
            message.success('修改成功', 2);
            this.setState(
              {
                loading: true,
              },
              () => {
                this.initData(this.state.pagination.current);
                this.setState({
                  imgReName: '',
                });
              }
            );
            this.setState({
              imgReName: '',
            });
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
      message.error('请选择需要批量修改分组的图片');
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
      message.error('请选择需要批量删除的图片');
      return false;
    }
    this.setState({
      visible: true,
      changeVisible: false,
    });
  };
  // 单个修改分组
  changeGroups = id => {
    let arr = [];
    arr.push(id);
    const { dispatch } = this.props;
    dispatch({
      type: 'imageList/MoveImageCategory',
      payload: {
        CategoryId: this.state.radioId,
        Ids: arr,
      },
      callBack: {
        success: res => {
          if (res.Code === 0) {
            message.success('修改成功');
            this.setState(
              {
                loading: true,
                radioId: 0,
              },
              () => {
                this.initData(this.state.pagination.current);
                this.getImageGroup();
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
  // 批量修改分组
  bulkChanges = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'imageList/MoveImageCategory',
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
                loading: true,
                radioId: 0,
                Allchoose: false,
                changeVisible: false,
                selectedRowKeys: [],
              },
              () => {
                this.initData(this.state.pagination.current);
                this.getImageGroup();
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
  // 全部删除
  deleteAll = () => {
    this.setState(
      {
        visible: false,
      },
      () => {
        this.onRemove();
      }
    );
  };
  // 删除
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
  // 删除图片
  onRemove = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'imageList/DelPic',
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
                this.getImageGroup();
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
  // 修改分组
  onChangeRadio = e => {
    this.setState({
      radioId: e.target.value,
    });
  };
  // 链接
  linkUrl = url => {
    this.setState({
      linkUrl: url,
    });
  };
  // 全选
  selectAll = e => {
    const checked = e.target.checked;
    this.setState({
      Allchoose: checked,
    });
    if (checked) {
      this.setState({ selectedRowKeys: this.state.imageListData.map(item => item.Id) });
    } else {
      this.setState({ selectedRowKeys: [] });
    }
  };

  // 单个选中
  selectImage = value => {
    this.setState({
      selectedRowKeys: value,
      Allchoose: value.length == this.state.imageListData.length,
    });
  };
  // 点击预览图片
  onUploadPreview = item => file => {
    if (item.Avatar) {
      this.setState({
        imageLoading: true,
        picUrl: item.Avatar,
      });
      this.setState({
        imageVisible: true,
      });
    }
  };
  // 点击关闭图标
  handleCancel = e => {
    this.setState({
      imageVisible: false,
    });
  };
  // 复制
  copyUrl = () => {
    let url = this.refs.imageUrl.props.value;
    if (copy(url)) {
      message.success('复制成功');
    } else {
      message.error('复制失败');
    }
  };
  // 图片加载
  onloadImage = () => {
    this.setState({
      imageLoading: false,
    });
  };

  render() {
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

    const editName = (
      <div className="popContent">
        <p>修改名称</p>
        <Input
          placeholder="图片名称"
          value={this.state.imgReName}
          onChange={e => {
            this.setState({ imgReName: e.target.value });
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
        <p className="txtContent">仅删除分组，不删除图片，组内图片将自动归入未分组</p>
      </div>
    );

    const removeImage = (
      <div>
        <p>
          <Icon type="question-circle-o" style={{ color: 'red', marginRight: '8px' }} />
          确定删除该图片?
        </p>
        <p className="txtContent">若删除，不会对目前已使用该图片的相关业务造成影响。</p>
      </div>
    );

    const percent =
      this.props.imageList.OverView &&
      100 -
        Math.round(
          (this.props.imageList.OverView['AlreadyUsedSpace'] /
            this.props.imageList.OverView['AlreadyBuySpace']) *
            10000
        ) /
          100.0;

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
            {this.props.imageList.imageGroupCount &&
              this.props.imageList.imageGroupCount.map((item, index) => {
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

    const selectImageGroup = (
      <div>
        <p>选择分组</p>
        <div className="txtContent" style={{ maxHeight: '162px', overflow: 'auto' }}>
          <Radio.Group onChange={this.onChangeRadio} value={this.state.radioId}>
            {this.props.imageList.imageGroupCount &&
              this.props.imageList.imageGroupCount.map((item, index) => {
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

    return (
      <div className={styles.contentBox}>
        <Row gutter={16} className={styles.cardList}>
          <Col span={8}>
            <Statistical
              Title={'已上传图片数（个）'}
              Num={this.props.imageList.OverView ? this.props.imageList.OverView['ImageNum'] : 0}
            />
          </Col>

          <Col span={8}>
            <Statistical
              Title={
                this.props.imageList.OverView &&
                this.props.imageList.OverView['AlreadyBuySpace'] > 1024
                  ? '图片空间总大小（GB）'
                  : '图片空间总大小（MB）'
              }
              Num={
                this.props.imageList.OverView &&
                this.props.imageList.OverView['AlreadyBuySpace'] > 1024
                  ? this.props.imageList.OverView['AlreadyBuySpace'] / 1024
                  : this.props.imageList.OverView['AlreadyBuySpace']
              }
            />
          </Col>

          <Col span={8}>
            <Preview
              Percent={percent}
              Residue={`${
                this.props.imageList.OverView['RemainUsedSpace'] > 1024
                  ? Math.floor((this.props.imageList.OverView['RemainUsedSpace'] / 1024) * 100) /
                      100 +
                    'GB'
                  : Math.floor(this.props.imageList.OverView['RemainUsedSpace'] * 100) / 100 + 'MB'
              }`}
              Used={`${
                this.props.imageList.OverView['AlreadyUsedSpace'] > 1024
                  ? Math.ceil((this.props.imageList.OverView['AlreadyUsedSpace'] / 1024) * 100) /
                      100 +
                    'GB'
                  : Math.ceil(this.props.imageList.OverView['AlreadyUsedSpace'] * 100) / 100 + 'MB'
              }`}
              ButtonValue={'扩容'}
            />
          </Col>
        </Row>

        <Row gutter={16} className={styles.inputBox}>
          <Col span={12}>
            <Button type="primary" onClick={this.showModal}>
              上传图片
            </Button>
          </Col>
          <Col span={12} className={styles.flr}>
            <Input.Search
              placeholder="请输入图片名称搜索"
              onSearch={this.onSearchChange}
              value={this.state.imageName}
              onChange={e => {
                this.setState({ imageName: e.target.value });
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
              {this.props.imageList['imageGroupCount'] &&
                this.props.imageList['imageGroupCount'].map((item, index) => {
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
                  this.state.imageGroupId !== 0 && (
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
                        onConfirm={this.removeImageGroup}
                        icon={false}
                        okText="确定"
                        cancelText="取消"
                      >
                        <a href="javascript:;">删除分组</a>
                      </Popconfirm>
                    </span>
                  )}
              </div>

              <div className={styles.listBox}>
                <div className={styles.checkAllBox}>
                  <Checkbox onChange={this.selectAll.bind(this)} checked={this.state.Allchoose}>
                    全选
                  </Checkbox>
                </div>

                <Spin spinning={this.state.loading}>
                  <div>
                    {this.state.imageListData.length > 0 ? (
                      this.state.imageListData.map((item, index) => {
                        return (
                          <Card
                            key={index}
                            className={styles.cardStyle}
                            hoverable
                            cover={
                              <img
                                alt="example"
                                src={
                                  this.props.oemInfo &&
                                  this.props.oemInfo['cdnUrl'] +
                                    '/' +
                                    item.Img +
                                    '?x-oss-process=style/c_134'
                                }
                                onClick={this.onUploadPreview({
                                  Avatar:
                                    this.props.oemInfo &&
                                    this.props.oemInfo['cdnUrl'] + '/' + item.Img,
                                })}
                              />
                            }
                            actions={[
                              <Popconfirm
                                placement="bottom"
                                title={editName}
                                onConfirm={() => this.imgRename(item.Id)}
                                icon={false}
                                okText="确定"
                                cancelText="取消"
                              >
                                <a href="javascript:;">改名</a>
                              </Popconfirm>,

                              <Popover
                                placement="bottom"
                                content={
                                  <div className="popContent">
                                    <Form layout="inline">
                                      <Form.Item>
                                        <Input
                                          style={{ width: 304 }}
                                          placeholder="图片名称"
                                          ref="imageUrl"
                                          value={
                                            this.props.oemInfo &&
                                            this.props.oemInfo['cdnUrl'] + '/' + item.Img
                                          }
                                          disabled
                                        />
                                      </Form.Item>
                                      <Form.Item style={{ margin: '0 0 0 -8px' }}>
                                        <Button onClick={this.copyUrl}>复制</Button>
                                      </Form.Item>
                                    </Form>
                                  </div>
                                }
                                trigger="focus"
                              >
                                <a href="javascript:;">链接</a>
                              </Popover>,

                              <Popconfirm
                                placement="bottom"
                                title={selectImageGroup}
                                onConfirm={e => this.changeGroups(e, item.Id)}
                                icon={false}
                                okText="确定"
                                cancelText="取消"
                              >
                                <a href="javascript:;">分组</a>
                              </Popconfirm>,

                              <Popconfirm
                                placement="bottomRight"
                                title={removeImage}
                                icon={false}
                                onConfirm={() => this.handleDelete(item.Id)}
                              >
                                <a href="javascript:;">删除</a>
                              </Popconfirm>,
                            ]}
                          >
                            <Card.Meta
                              description={
                                <Checkbox.Group
                                  onChange={this.selectImage}
                                  value={this.state.selectedRowKeys}
                                >
                                  <Tooltip title={item.DisplayName}>
                                    <Checkbox value={item.Id}>{item.DisplayName}</Checkbox>
                                  </Tooltip>
                                </Checkbox.Group>
                              }
                            />
                          </Card>
                        );
                      })
                    ) : (
                      <div style={{ textAlign: 'center' }}>暂无数据</div>
                    )}
                  </div>

                  <div className={styles.pagination}>
                    {this.state.pagination.total && this.state.pagination.total > 0 ? (
                      <Pagination
                        onChange={this.onPageChange}
                        defaultCurrent={1}
                        pageSize={this.state.pagination.pageSize}
                        total={this.state.pagination.total}
                        showTotal={this.showTotal}
                        // showSizeChanger={true}
                        style={{ marginTop: 16, textAlign: 'right' }}
                      />
                    ) : (
                      ''
                    )}
                  </div>

                  {this.state.imageListData.length > 0 ? (
                    <div className={styles.selectBox}>
                      <Popconfirm
                        placement="topLeft"
                        title={selectGroup}
                        icon={false}
                        onConfirm={() => this.bulkChanges()}
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
                        title={removeImage}
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
                </Spin>
              </div>
            </Layout.Content>
          </Layout>
        </Layout>

        <Modal visible={this.state.imageVisible} footer={null} onCancel={this.handleCancel}>
          <Spin spinning={this.state.imageLoading}>
            <img src={this.state.picUrl} width="100%" alt="" onLoad={this.onloadImage} />
          </Spin>
        </Modal>

        {this.state.isLoading && (
          <UploadImage
            onIsLoading={this.onChangeLoading}
            imageCategory={this.props.imageList['imageGroupCount']}
          />
        )}
      </div>
    );
  }
}

export default ImageLibrary;
