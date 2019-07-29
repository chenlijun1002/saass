import React from 'react';
import {
  Modal,
  Tabs,
  Select,
  Card,
  Avatar,
  Row,
  Col,
  Pagination,
  Input,
  Form,
  Button,
  Checkbox,
  Upload,
  Icon,
  Progress,
  message,
  Spin,
} from 'antd';
import { connect } from 'dva';
import styles from './videoplugin.less';
import moment from 'moment';
import SelectedImage from '@/components/plugins/selectImage/index';

@connect(({ global, videoList, loading }) => ({
  oemInfo: global.oemInfo,
  videoList,
  loading: loading.effects['videoList/GetVideoList'],
  groupLoading: loading.effects['videoList/GetVideoGroup'],
  videoStsLoading: loading.effects['videoList/GetVideoStsConfig'],
  saveVideoLoading: loading.effects['videoList/SaveVideo'],
}))
class videoplugin extends React.Component {
  constructor(props) {
    super(props);
    // 选项卡标题
    const panes = [{ title: '我的视频', key: '1' }, { title: '本地上传', key: '2' }];
    this.state = {
      visible: false,
      panes,
      activeKey: panes[0].key,
      checkedCardId: null,
      checkedCard: false,
      checkedVideoIndex: null,
      uploadLoading: false,
      uploadVideoLoading: false,
      Title: '',
      Agreed: true,
      imageUrl: '',
      videoUrl: '',
      pageIndex: 1, //当前页
      pageSize: 8, //每页显示条数
      total: 0, //总条数
      videoName: '', //视频名称(搜索)
      videoGroupId: -1, //视频分组(搜索)
      fileName: '', //文件名
      fileSize: 0, //文件大小
      OssName: '', //oss文件路径
      Progress: 0,
      submitButton: true,
    };
  }

  componentDidMount() {
    this.props.onRef(this);

    this.initData(1);
    this.getVideoGroup();
  }

  // 获取视频列表
  initData(pageIndex) {
    const { dispatch } = this.props;

    dispatch({
      type: 'videoList/GetVideoList',
      payload: {
        pageIndex: pageIndex,
        pageSize: this.state.pageSize,
        disPlayName: this.state.videoName,
        categoryId: this.state.videoGroupId,
      },
    });
  }
  // 获取视频分组
  getVideoGroup() {
    const { dispatch } = this.props;
    dispatch({
      type: 'videoList/GetVideoGroup',
    });
  }
  // 文件大小
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  // 上传视频文件
  uploadVideo(name, size, file) {
    const { dispatch } = this.props;

    dispatch({
      type: 'videoList/GetVideoStsConfig',
      payload: {
        filename: name,
        filesize: size,
        file: file,
      },
      callBack: {
        success: res => {
          let { OssFileName } = this.props.videoList.videoUpload['ossConfig'];
          if (res.Code === 0) {
            message.success('上传成功');
            this.setState({
              Title: file.name,
              OssName: OssFileName,
              submitButton: false,
            });
          }
        },
        error: res => {
          message.error(res.Msg);
        },
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // 确定
  handleOk = e => {
    // console.log('全局地址......', this.props.oemInfo);
    if (this.state.activeKey == '1') {
      // 我的视频
      this.props.videoList.videoList &&
        this.props.videoList.videoList.map((item, index) => {
          if (index == this.state.checkedCardId) {
            // 视频状态（转码中 = 2,转码失败 = 3,审核中 = 4，审核失败 = 5,审核通过 = 6）
            if (item.Status) {
              if (item.Status === 2 || item.Status === 6) {
                message.success('选择视频成功');
                this.submitSelectVideo(item);
              } else if (item.Status === 3) {
                message.error('视频转码失败，暂不能使用');
                return false;
              } else if (item.Status === 4) {
                message.error('视频审核中，暂不能使用');
                return false;
              } else if (item.Status === 5) {
                message.error('视频审核失败，暂不能使用');
                return false;
              } else {
                message.error('系统错误，请稍后再试');
                return false;
              }
            }
          }
        });
    } else {
      // 本地上传
      if (this.state.Agreed) {
        if (this.state.Title && this.state.Title.replace(/^\s+|\s+$/g, '')) {
          this.props.form.validateFields((err, values) => {
            // console.log('err, ', err, 'values,', values)
            if (!err) {
              const { dispatch } = this.props;
              dispatch({
                type: 'videoList/SaveVideo',
                payload: {
                  FileSize: this.state.fileSize,
                  FileName: this.state.fileName,
                  OssName: this.state.OssName,
                  VideoName: this.state.Title,
                  VideoImage: this.state.imageUrl,
                  CategoryId: this.state.videoGroupId || 0,
                },
              });

              let item = {};
              item.DisplayName = this.state.Title;
              item.Img = '';
              item.Path = this.props.videoList.videoUpload.result.name;

              // message.success('选择视频成功');
              this.submitSelectVideo(item);
            } else {
              message.error(err.Title.errors[0].message);
            }
          });
        } else {
          message.error('名称不能为空!');
          return false;
        }
      } else {
        message.error('请认真阅读并同意视频上传服务协议');
        return false;
      }
    }
  };
  // 关闭弹窗
  handleCancel = e => {
    this.setState(
      {
        visible: false,
      },
      () => {
        this.props.onIsLoading();
      }
    );
  };
  // 切换分组
  handleChange = value => {
    this.setState(
      {
        videoGroupId: value,
      },
      () => {
        this.initData(1);
      }
    );
  };
  // 选中视频
  handleSelect = index => {
    if (index != this.state.checkedVideoIndex) {
      this.setState({
        checkedCardId: index,
        checkedCard: true,
        checkedVideoIndex: index,
      });
    } else {
      this.setState({
        checkedCardId: null,
        checkedCard: false,
        checkedVideoIndex: null,
      });
    }
  };
  // 搜索视频名称或分组
  search = () => {
    this.initData(1);
  };
  // 上传视频
  handleUploadVideo = ({ file }) => {
    let isVideo = false;
    if (file.type === 'video/mp4' || file.type === 'video/mpeg4' || file.type === 'video/avi') {
      isVideo = true;
    } else {
      isVideo = false;
    }

    if (!isVideo) {
      message.error('请上传支持的视频类型文件!');
      return false;
    }
    const isLt50M = file.size / 1024 / 1024 < 50;
    if (!isLt50M) {
      message.error('文件必须小于50MB!');
      return false;
    }

    this.setState(
      {
        fileName: file.name,
        fileSize: file.size,
      },
      () => {
        if (this.state.fileName.length > 0 && this.state.fileSize > 0) {
          // 进度条
          this.setState({ uploadVideoLoading: true });
          this.uploadVideo(this.state.fileName, this.state.fileSize, file);
        }
      }
    );
  };

  // 同意
  onCheckBox = e => {
    this.setState({
      Agreed: e.target.checked,
    });
  };
  // 视频名称
  onChangeTitle = e => {
    this.setState({
      Title: e.target.value,
    });
  };
  // 分页
  onPageChange = (page, pageSize) => {
    this.setState(
      {
        pageIndex: page,
      },
      () => {
        this.initData(this.state.pageIndex);
      }
    );
  };

  // 显示到微页面
  submitSelectVideo = item => {
    const { selectvideo } = this.props;
    selectvideo(item);
  };
  // 图片插件
  imgModal = ref => {
    this.imgmodal = ref;
  };
  OpenImageModal = () => {
    this.imgmodal.handleShowModal();
  };
  onImageChange = res => {
    this.setState({
      imageUrl: res.imageUrl.substr(res.imageUrl.indexOf('.com/') + 5),
    });
    this.imgmodal.handleModalVisible();
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 21,
          offset: 3,
        },
      },
    };

    const uploadVideoButton = (
      <div>
        <Icon type={this.state.uploadVideoLoading ? 'loading' : 'plus'} />
      </div>
    );

    const videoUrl = this.state.videoUrl;

    return (
      <div className={styles.divBox}>
        <Modal
          title="选择视频"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          className={styles.modalBox}
          maskClosable={false}
          destroyOnClose
          centered={true}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button
              key="ok"
              type={
                (!this.state.checkedCard && this.state.activeKey == '1') ||
                (this.state.activeKey == '2' && this.state.submitButton)
                  ? 'default'
                  : 'primary'
              }
              disabled={
                (!this.state.checkedCard && this.state.activeKey == '1') ||
                (this.state.activeKey == '2' && this.state.submitButton)
                  ? true
                  : false
              }
              onClick={this.handleOk.bind(this)}
            >
              确定
            </Button>,
          ]}
        >
          <Tabs
            type="card"
            defaultActiveKey="1"
            activeKey={this.state.activeKey}
            onChange={activeKey => {
              this.setState({ activeKey });
            }}
          >
            {this.state.panes.map(item => {
              return (
                <Tabs.TabPane tab={item.title} key={item.key}>
                  {item.key == '1' && (
                    <div style={{ height: 450 }}>
                      <Form layout="inline">
                        <Form.Item>
                          <Select
                            placeholder="全部分组"
                            style={{ width: 102 }}
                            dropdownStyle={{ zIndex: 9999 }}
                            onChange={this.handleChange}
                          >
                            {this.props.videoList.videoGroup &&
                              this.props.videoList.videoGroup.map((item, index) => {
                                return (
                                  <Select.Option key={index} value={item.Id}>
                                    {item.DisplayName}
                                  </Select.Option>
                                );
                              })}
                          </Select>
                        </Form.Item>
                        <Form.Item>
                          <Input
                            placeholder="请输入视频名称搜索"
                            onChange={e => {
                              this.setState({ videoName: e.target.value });
                            }}
                          />
                        </Form.Item>

                        <Form.Item>
                          <Button onClick={this.search}>搜索</Button>
                        </Form.Item>
                      </Form>

                      <Spin spinning={this.props.loading}>
                        <Row gutter={16}>
                          {this.props.videoList.videoList &&
                            this.props.videoList.videoList.map((item, index) => {
                              return (
                                <Col key={index} span={12}>
                                  <Card
                                    // loading={loading}
                                    style={{
                                      width: 288,
                                      marginTop: 16,
                                      border:
                                        this.state.checkedCard && this.state.checkedCardId == index
                                          ? '1px solid #2e74ff'
                                          : '1px solid #e8e8e8',
                                    }}
                                    hoverable={true}
                                    onClick={this.handleSelect.bind(this, index)}
                                  >
                                    <Card.Meta
                                      avatar={
                                        <Avatar
                                          src={
                                            this.props.oemInfo &&
                                            this.props.oemInfo['cdnUrl'] + '/' + item.Img + '?x-oss-process=style/180'
                                          }
                                        />
                                      }
                                      title={item.DisplayName}
                                      description={moment(item.ShowDateTime).format('YYYY-MM-DD')}
                                    />
                                    <div className={styles.playCircle}>
                                      <Icon type="caret-right" />
                                    </div>
                                    <div
                                      className={styles.formChecked}
                                      style={{
                                        display:
                                          this.state.checkedCard &&
                                          this.state.checkedCardId == index
                                            ? 'block'
                                            : 'none',
                                      }}
                                    >
                                      <Icon type="check" />
                                    </div>
                                  </Card>
                                </Col>
                              );
                            })}
                        </Row>
                      </Spin>

                      <div className={styles.pagination}>
                        {this.props.videoList.Total && this.props.videoList.Total > 0 ? (
                          <Pagination
                            onChange={this.onPageChange}
                            defaultCurrent={1}
                            total={this.props.videoList.Total}
                            style={{ marginTop: 16, textAlign: 'right' }}
                          />
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  )}

                  {item.key == '2' && (
                    <Form>
                      {this.state.uploadVideoLoading ? (
                        <Form.Item>
                          <Progress
                            percent={this.props.videoList.progress}
                            style={{ width: this.props.videoList.progress + '% !important' }}
                            status="normal"
                            className={styles.percentBox}
                          />

                          <div className={styles.progressSpan}>
                            <span>{this.state.Title}</span>
                          </div>
                        </Form.Item>
                      ) : (
                        <Form.Item {...formItemLayout} label="本地视频">
                          <Upload
                            // action="//jsonplaceholder.typicode.com/posts/"
                            listType="picture-card"
                            name="File"
                            accept="audio/mp4, video/mp4, "
                            className="avatar-uploader"
                            showUploadList={false}
                            // beforeUpload={this.beforeUploadVideo}
                            beforeUpload={() => {
                              return false;
                            }}
                            onChange={this.handleUploadVideo}
                            style={{ width: '96px', height: '54px' }}
                          >
                            {videoUrl ? (
                              <video src={videoUrl} width="96" height="54" alt="" />
                            ) : (
                              uploadVideoButton
                            )}
                          </Upload>

                          <p style={{ fontSize: 14, color: '#8C8C8C', lineHeight: '21px' }}>
                            点击添加视频，视频大小不超过50m，建议时长30s内。支持的视频类型包括mp4,avi,wmv,mpeg,mov,mkv,flv,f4v,rmvb,rm,3gb,dat,ts,mts,vob
                          </p>
                        </Form.Item>
                      )}

                      <Form.Item {...formItemLayout} label="名称">
                        {getFieldDecorator('Title', {
                          rules: [
                            {
                              required: true,
                              message: '请输入视频名称',
                              max: 20,
                              message: '请输入不超过20个字符的视频名称',
                            },
                          ],
                          initialValue: this.state.Title,
                        })(
                          <Input
                            name="Title"
                            style={{ width: 224 }}
                            max={10}
                            placeholder="请输入视频名称"
                            onChange={this.onChangeTitle}
                          />
                        )}
                      </Form.Item>

                      <Form.Item {...formItemLayout} label="分组">
                        <Select
                          style={{ width: 224 }}
                          placeholder="请选择视频分组"
                          dropdownStyle={{ zIndex: 9999 }}
                          onChange={this.handleChange}
                        >
                          {this.props.videoList.videoGroup &&
                            this.props.videoList.videoGroup.map((item, index) => {
                              if (index != 0) {
                                return (
                                  <Select.Option key={index} value={item.Id}>
                                    {item.DisplayName}
                                  </Select.Option>
                                );
                              }
                            })}
                        </Select>
                      </Form.Item>

                      <Form.Item {...formItemLayout} label="封面" className={styles.coverBox}>
                        <div className={styles.uploadCover} onClick={this.OpenImageModal}>
                          {this.state.imageUrl ? (
                            <img
                              src={
                                this.props.oemInfo &&
                                this.props.oemInfo['cdnUrl'] + '/' + this.state.imageUrl+'?x-oss-process=style/240'
                              }
                              style={{ width: '100%', height: '100%' }}
                            />
                          ) : (
                            <Icon type="plus" />
                          )}
                        </div>

                        <p style={{ fontSize: 14, color: '#8C8C8C', lineHeight: '21px' }}>
                          建议尺寸：800 x 800
                          像素，支持jpg、gif、png三种格式，大小不超过3MB。如果不添加封面，系统会默认截取视频的第一个画面作为封面
                        </p>
                      </Form.Item>

                      <Form.Item {...tailFormItemLayout}>
                        <Checkbox
                          style={{ color: '#595959' }}
                          checked={this.state.Agreed}
                          onChange={this.onCheckBox}
                        >
                          同意
                          <a href="javascript:;" style={{ color: '#2E74FF' }}>
                            《视频上传服务协议》
                          </a>
                        </Checkbox>
                      </Form.Item>
                    </Form>
                  )}
                </Tabs.TabPane>
              );
            })}
          </Tabs>

          <SelectedImage onRef={this.imgModal} selectImage={this.onImageChange} />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(videoplugin);
