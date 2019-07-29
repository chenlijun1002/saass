import React, { Component } from 'react';
import {
  Modal,
  Form,
  Upload,
  Icon,
  Input,
  Select,
  Checkbox,
  Button,
  Progress,
  message,
} from 'antd';
import { connect } from 'dva';
import styles from './UploadVideo.less';
import SelectedImage from '@/components/plugins/selectImage/index';

@connect(({ global, videoList }) => ({
  oemInfo: global.oemInfo,
  videoList,
}))
class UploadVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      videoUrl: '',
      imageUrl: '',
      Agreed: true,
      submitButton: true,
      fileSize: 0,
      fileName: '',
      OssName: '',
      Title: '',
      VideoImage: '',
      videoGroupId: 0,
      showUpload: true,
    };
  }

  componentDidMount() {
    this.getVideoGroup();

    if (JSON.stringify(this.props.videoObj) == '{}') {
      this.setState({
        showUpload: true,
      });
    } else {
      // console.log('this.props.videoObj', this.props.videoObj)
      this.setState({
        showUpload: false,
        submitButton: false,
        Title: this.props.videoObj['DisplayName'],
        videoGroupId: this.props.videoObj['CategoryId'],
        imageUrl: this.props.videoObj['Img'],
      });
    }
  }
  // 显示模态框
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  // 获取视频分组
  getVideoGroup() {
    const { dispatch } = this.props;
    dispatch({
      type: 'videoList/GetVideoGroup',
    });
  }
  // 确定
  handleOk = e => {
    // 本地上传
    if (this.state.showUpload) {
      if (this.state.Agreed) {
        if (this.state.Title && this.state.Title.replace(/^\s+|\s+$/g, '')) {
          console.log('...this.state.Title.length', this.state.Title.length);
          if (this.state.Title.length > 20) {
            message.error('请输入不超过20个字的视频名称');
            return false;
          } else {
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

            message.success('上传视频成功');
            this.handleCancel();
          }
        } else {
          message.error('名称不能为空!');
          return;
        }
      } else {
        message.error('请认真阅读并同意视频上传服务协议');
        return;
      }
    } else {
      const { dispatch } = this.props;
      dispatch({
        type: 'videoList/EditVideo',
        payload: {
          VideoId: this.props.videoObj['Id'],
          DisplayName: this.state.Title,
          CategoryId: this.state.videoGroupId,
          VideoImg: this.state.imageUrl,
        },
        callBack: {
          success: res => {
            if (res.Code === 0) {
              message.success('修改成功');
              this.handleCancel();
            }
          },
          error: res => {
            message.error(res.Msg);
          },
        },
      });
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
  // 视频名称
  onChangeTitle = e => {
    this.setState({
      Title: e.target.value,
    });
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
            message.success('上传成功', 2);
            this.setState({
                Title: file.name,
                OssName: OssFileName,
                submitButton: false
              });
          }
        },
        error: res => {
          message.error(res.Msg);
        },
      },
    });
  }
  // 切换分组
  handleChange = value => {
    this.setState({
      videoGroupId: value,
    });
  };
  // 图片插件
  imgModal = ref => {
    this.imgmodal = ref;
  };
  OpenImageModal = () => {
    this.imgmodal.handleShowModal();
    // this.setState({
    //   selectImgvisible:true
    // })
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

    const uploadButton = (
      <div>
        <Icon type={this.state.uploadLoading ? 'loading' : 'plus'} />
      </div>
    );
    const uploadVideoButton = (
      <div>
        <Icon type={this.state.uploadVideoLoading ? 'loading' : 'plus'} />
      </div>
    );

    return (
      <div className={styles.divBox}>
        <Modal
          title={this.state.showUpload ? '上传视频' : '编辑视频'}
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
              type={this.state.submitButton ? 'default' : 'primary'}
              disabled={this.state.submitButton ? true : false}
              onClick={this.handleOk.bind(this)}
            >
              确定
            </Button>,
          ]}
        >
          <Form>
            {this.state.showUpload ? (
              <div>
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
                      {this.state.videoUrl ? (
                        <video src={this.state.videoUrl} width="96" height="54" alt="" />
                      ) : (
                        uploadVideoButton
                      )}
                    </Upload>

                    <p style={{ fontSize: 14, color: '#8C8C8C', lineHeight: '21px' }}>
                      点击添加视频，视频大小不超过50m，建议时长30s内。支持的视频类型包括mp4,avi,wmv,mpeg,mov,mkv,flv,f4v,rmvb,rm,3gb,dat,ts,mts,vob
                    </p>
                  </Form.Item>
                )}
              </div>
            ) : null}

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
                value={this.state.videoGroupId}
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
                      this.props.oemInfo && this.props.oemInfo['cdnUrl'] + '/' + this.state.imageUrl + '?x-oss-process=style/240'
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

          <SelectedImage onRef={this.imgModal} selectImage={this.onImageChange} />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(UploadVideo);
