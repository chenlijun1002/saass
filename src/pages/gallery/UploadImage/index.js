import React, { Component } from 'react';
import { Modal, Form, Upload, Icon, message, Select } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

@connect(({ imageplugin, global }) => ({
  cdnUrl: global.oemInfo.cdnUrl,
  imageplugin,
}))
class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      fileList: [],
      imageFilesList: [],
      previewVisible: false,
      selectCategoryId: null,
    };
  }
  // 显示模态框
  showModal = () => {
    this.setState({
      visible: true,
    });
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
  changeSelectCategory = val => {
    this.setState({
      selectCategoryId: val,
    });
  };
  // 图片上传
  handleUploadImage = ({ file }) => {
    const { imageFilesList, fileList } = this.state;
    let that = this;
    if (file.status === 'removed') {
      let idx = fileList.findIndex(item => item.uid === file.uid);
      fileList.splice(idx, 1);
      imageFilesList.splice(idx, 1);
      this.setState(
        {
          fileList,
          imageFilesList,
        },
        () => {
          this.forceUpdate();
        }
      );
      return;
    }
    let isImage = false;
    if (
      file.type === 'image/bmp' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif' ||
      file.type === 'image/svg'
    ) {
      isImage = true;
    } else {
      isImage = false;
    }

    if (!isImage) {
      message.error('请上传支持的图片类型文件');
      return false;
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error('图片必须小于3MB');
      return false;
    }
    let reader = new FileReader();
    let imgUrlBase64 = reader.readAsDataURL(file);
    reader.onload = function(e) {
      if (fileList.length >= 8) {
        message.error('最多上传8张图片');
        //return false;
      } else {
        fileList.push({
          uid: `${fileList.length - 1}`,
          name: file.name,
          status: 'done',
          url: reader.result,
          file: file,
        });
        that.setState(
          {
            fileList,
          },
          () => {
            that.forceUpdate();
          }
        );
        imageFilesList.push({
          name: file.name,
          size: file.size,
        });
        that.setState({
          imageFilesList,
        });
      }
    };
  };
  // 确定
  uploadImg = () => {
    const { fileList, imageFilesList } = this.state;
    let that = this;
    if (fileList.length <= 0) {
      return message.error('请选择图片');
    }

    fileList.forEach(item => {
      item.status = 'uploading';
    });
    this.setState(
      {
        confirmLoading: true,
        fileList,
      },
      () => {
        this.forceUpdate();
      }
    );
    const { dispatch } = this.props;
    let count = 0;
    imageFilesList.forEach((item, index) => {
      dispatch({
        type: 'imageplugin/GetImageStsConfig',
        payload: {
          filename: item.name,
          filesize: item.size,
          file: fileList[index].file,
          index: index,
          categoryId: this.state.selectCategoryId,
        },
        callback: {
          success: index => {
            ++count;
            fileList[index].status = 'done';
            this.setState(
              {
                fileList,
              },
              () => {
                this.forceUpdate();
              }
            );
            if (count == fileList.length) {
              message.success('上传成功');
              setTimeout(() => {
                that.setState(
                  {
                    confirmLoading: false,
                    uploadVisible: false,
                    visible: true,
                    fileList: [],
                    imageFilesList: [],
                  },
                  () => {
                    this.forceUpdate();
                    this.handleCancel();
                    // this.requestCategoryList({ current: 1 });
                  }
                );
              }, 1500);
              return;
            }
          },
          error: (index, data) => {
            ++count;
            fileList[index].status = 'error';
            this.setState(
              {
                fileList,
              },
              () => {
                this.forceUpdate();
              }
            );
            if (count == fileList.length) {
              console.log(data, '图片上传');
              that.setState(
                {
                  confirmLoading: false,
                },
                () => {
                  this.forceUpdate();
                  let length = fileList.filter(item => {
                    return item.status == 'error';
                  }).length;
                  if (data.Code == 50001) {
                    message.error(`有${length}张图片涉嫌违规，无法上传`);
                  } else if (data.Code == 80007) {
                    confirm({
                      title: '上传失败',
                      content: '您的剩余图片空间已经为0KB，请删除无用素材或加购图片空间',
                      okText: '立即加购',
                      iconType: 'close-circle',
                      // okType: 'danger',
                      cancelText: '我再想想',
                      onOk() {
                        window.open(`/#/${window.storeId}/store/file/pics`);
                      },
                      onCancel() {
                        console.log('Cancel');
                      },
                    });
                  } else {
                    message.error(`因服务器异常，导致${fileList.length}张图片上传失败`);
                  }
                }
              );
              return;
            }
          },
        },
      });
    });
  };
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  handlePreviewCancel = () => {
    this.setState({
      previewVisible: false,
      previewImage: '',
    });
  };
  render() {
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

    const uploadVideoButton = (
      <div>
        <Icon type={this.state.uploadVideoLoading ? 'loading' : 'plus'} />
      </div>
    );
    return (
      <div className={styles.divBox}>
        <Modal
          title={'上传图片'}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.uploadImg}
          className={styles.modalBox}
          maskClosable={false}
          destroyOnClose
          centered={true}
        >
          <Form>
            <Form.Item {...formItemLayout} label="分组">
              <Select
                style={{ width: 224 }}
                placeholder="请选择视频分组"
                dropdownStyle={{ zIndex: 9999 }}
                onChange={this.changeSelectCategory}
              >
                {this.props.imageCategory &&
                  this.props.imageCategory.map((item, index) => {
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

            <Form.Item
              {...formItemLayout}
              label="本地图片"
              help={'仅支持gif、jpeg、png、bmp4种格式，大小不超过3MB'}
            >
              <Upload
                // action="//jsonplaceholder.typicode.com/posts/"
                multiple
                listType="picture-card"
                fileList={this.state.fileList}
                onPreview={this.handlePreview}
                beforeUpload={() => {
                  return false;
                }}
                onChange={this.handleUploadImage}
                onRemove={this.removeImage}
                accept="image/*"
                className="avatar-uploader"
              >
                {this.state.fileList.length >= 8 ? null : uploadVideoButton}
              </Upload>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          visible={this.state.previewVisible}
          footer={null}
          onCancel={this.handlePreviewCancel}
          centered
        >
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UploadImage;
