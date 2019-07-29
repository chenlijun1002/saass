import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Form, Icon, Upload, Cascader} from 'zent';
import { Spin , message, Button, Card} from 'antd';
import omit from 'lodash/omit';
const {
  Field,
  getControlGroup,
  unknownProps,
  FormInputField,
  FormSelectField,
  FormRadioGroupField,
  FormCheckboxField,
  FormCheckboxGroupField,
  FormColorPickerField,
  FormDateRangePickerField,
  FormNumberInputField,
  FormSwitchField,
  createForm,
} = Form;
import storeNavigation from '../../../assets/storeNavigation.png';
import styles from './index.less';
import Wrapper from '../../../components/Wrapper/index';
//import Demo from '../Exception/demo'
class Simple extends Component {
  state = {
    value: ['330000', '330100', '330106'],
    options: [],
  };
  // wrappedOnChange = (imgs) => {
  //   this.props.onChange(imgs);
  // };
  onChange = data => {
    // Notify.success(JSON.stringify(data));
    this.props.onChange(data);
    // this.setState({
    //   value: data.map(item => item.id)
    // });
  };
  render() {
    const passableProps = omit(this.props, unknownProps);
    const { value, options } = this.props;
    return (
      <Cascader
        //value={this.state.value}
        // options={this.state.options}
        value={value}
        options={options}
        onChange={this.onChange}
        type="menu"
        title={['省', '市', '区']}
      />
    );
  }
}
class UploadWrap extends React.Component {
  wrappedOnChange = imgs => {
    this.props.onChange(imgs);
  };

  render() {
    const passableProps = omit(this.props, unknownProps);
    const { value } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        {value &&
          value.map((item, index) => {
            return (
              <img
                width="80"
                height="80"
                key={index}
                src={item.src}
                //style={{marginLeft: '10px'}}
              />
            );
          })}
        {
          <Upload
            {...passableProps}
            onUpload={this.wrappedOnChange.bind(this)}
            localOnly
            maxAmount={1}
            className={value && value.length ? `${styles.absolute}` : ''}
          />
        }
      </div>
    );
  }
}
const UploadField = getControlGroup(UploadWrap);
const Industry = getControlGroup(Simple);

class FieldForm extends Component {
  // state = {
  //   salesType: 'all',
  //   currentTabKey: '',
  //   iconModalVisible: true,
  //   currentSelectedIconInfo: { id: 1 },
  //   fileList: [],
  //   defaultValue: [],
  //   imageUrl:'',
  //   loading: false,
  // };

  componentWillMount() {
    const { dispatch, form, cdnUrl } = this.props;
    // const { setFieldsValue } = form;
    // dispatch({
    //   type: 'global/settingShowTop',
    //  // payload:false,
    //   children:<div>789</div>
    // });
    dispatch({
      type: 'storeinfo/GetIndustryList',
    });
    dispatch({
      type: 'storeinfo/GetStoreInfo',
      callback: {
        success: res => {
          if (res.Code == 0) {
            this.setState({
              imageUrl: res.Data ? `${cdnUrl}/${res.Data.StoreLogo}` : '',
              defaultValue: res.Data ? [res.Data.IndustryFirstId, res.Data.IndustrySecondId] : [],
              value: res.Data
                ? [
                    res.Data.IndustryFirstId ? res.Data.IndustryFirstId : '',
                    res.Data.IndustrySecondId ? res.Data.IndustrySecondId : '',
                  ]
                : [],
            });
            setTimeout(() => {
              this.props.zentForm.setFieldsValue({
                StoreLogo: res.Data ? [{ src: `${cdnUrl}/${res.Data.StoreLogo}` }] : '',
                StoreName: res.Data ? res.Data.StoreName : '',
                Contacts: res.Data ? res.Data.Contacts : '',
                TelPhone: res.Data ? res.Data.TelPhone : '',
                Introduction: res.Data ? res.Data.Introduction : '',
                Industry: res.Data
                  ? [
                      res.Data.IndustryFirstId ? res.Data.IndustryFirstId : '',
                      res.Data.IndustrySecondId ? res.Data.IndustrySecondId : '',
                    ]
                  : [],
              });
            });
          }
        },
      },
    });
  }

  getStoreInfo = () => {
    const { dispatch, form, cdnUrl } = this.props;
    const { setFieldsValue } = form;
    dispatch({
      type: 'storeinfo/GetStoreInfo',
      callback: {
        success: res => {
          if (res.Code == 0) {
            this.setState({
              fileList: [
                {
                  uid: '1',
                  key: 1,
                  url: res.Data ? res.Data.StoreLogo : '',
                },
              ],
              defaultValue: res.Data ? [res.Data.IndustryFirstId, res.Data.IndustrySecondId] : [],
              value: res.Data ? [res.Data.IndustryFirstId, res.Data.IndustrySecondId] : [],
            });
            setTimeout(() => {
              setFieldsValue({
                StoreLogo: res.Data ? `${cdnUrl}/${res.Data.StoreLogo}` : '',
                StoreName: res.Data ? res.Data.StoreName : '',
                Contacts: res.Data ? res.Data.Contacts : '',
                TelPhone: res.Data ? res.Data.TelPhone : '',
                Introduction: res.Data ? res.Data.Introduction : '',
                Industry: res.Data ? [res.Data.IndustryFirstId, res.Data.IndustrySecondId] : [],
              });
            });
          }
        },
      },
    });
  };
  handleSelectIcon = iconInfo => {
    this.setState({
      currentSelectedIconInfo: iconInfo,
    });
    this.hideModal('iconModalVisible');
  };
  hideModal(type) {
    this.setState({
      [`${type}`]: false,
    });
  }
  GetIndustryName = (id, arr) => {
    const { industryList } = this.props;
    let list = arr || industryList || [];
    if (id) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].value == id) {
          return list[i].label;
        } else {
          if (list[i].children) {
            for (let j = 0; j < list[i].children.length; j++) {
              if (list[i].children[j].value == id) {
                return list[i].children[j].label;
              }
            }
          }
        }
      }
    }
  };
  handleIconModalCancel = () => {
    this.hideModal('iconModalVisible');
  };
  // submit = () => {
  //   const { dispatch, form ,oemInfo} = this.props;
  //   const { setFieldsValue } = form;
  //   let that=this;
  //   form.validateFieldsAndScroll((err, values) => {
  //     if (err) return;
  //     dispatch({
  //       type: 'storeinfo/SaveStoreInfo',
  //       payload: {
  //         StoreLogo: that.state.imageUrl,
  //         StoreName: values.StoreName,
  //         Contacts: values.Contacts,
  //         TelPhone: values.TelPhone,
  //         Introduction: values.Introduction,
  //         IndustryFirst: that.GetIndustryName(values.Industry[0]),
  //         IndustryFirstId: values.Industry[0],
  //         IndustrySecond: that.GetIndustryName(values.Industry[1]),
  //         IndustrySecondId: values.Industry[1],
  //       },
  //       callback: {
  //         success: res => {
  //           if (res.Code == 0) {
  //             message.success('保存成功');
  //             oemInfo.storeLogo=that.state.imageUrl;
  //             dispatch({
  //               type:'global/setConfigData',
  //               payload:{
  //                 oemInfo,
  //               }
  //             })
  //             // setTimeout(()=>{
  //             //   that.getStoreInfo();
  //             // },1500)
  //           } else {
  //             message.error(res.Msg);
  //           }
  //         },
  //       },
  //     });
  //   });
  // };
  handleChange = info => {
    const { oemInfo, dispatch } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({
        loading: true,
        imageUrl: '',
      });
      return;
    }
    if (info.file.status === 'done') {
      if (info.file.response && info.file.response.Code === 0) {
        let imageUrl = info.file.response.Data.url;
        this.props.form.setFieldsValue({
          StoreLogo: imageUrl,
        });
        this.setState({
          imageUrl,
          loading: false,
        });
      } else {
        message.error('上传图片失败，请重新上传!');
        this.props.form.setFieldsValue({
          StoreLogo: '',
        });
        this.setState({
          imageUrl: '',
          loading: false,
        });
      }
    }
  };
  changeIndustry = e => {
    // console.log(9)
    console.log(e);
  };
  state = {
    checkedList: [],
    value: [],
  };

  onCheckboxChange = checkedList => {
    this.setState({ checkedList });
  };
  getImgInfo = src => {
    console.log(w, src);
    if (!src) {
      return;
    }
    var img = document.createElement('img'); //创建一个img元素
    img.src = src; //指定src
    img.style.position = 'absolute'; //防止正常的内容变形
    img.style.visibility = 'hidden'; //藏起来
    var inj = document.body.appendChild(img); //插入到box中。当然插入到document.body也可以
    let height = inj.offsetHeight;
    let width = inj.offsetWidth;
    document.body.removeChild(img);
    return { height, width };
  };
  submit = (values, zentForm) => {
    const { dispatch, oemInfo } = this.props;
    dispatch({
      type: 'storeinfo/SaveStoreInfo',
      payload: {
        StoreLogo: values.StoreLogo[0].src,
        StoreName: values.StoreName,
        Contacts: values.Contacts,
        TelPhone: values.TelPhone,
        Introduction: values.Introduction,
        IndustryFirst: this.GetIndustryName(values.Industry[0]),
        IndustryFirstId: values.Industry[0],
        IndustrySecond: this.GetIndustryName(values.Industry[1]),
        IndustrySecondId: values.Industry[1],
      },
      callback: {
        success: res => {
          if (res.Code == 0) {
            message.success('保存成功', 2);
            oemInfo.storeLogo = values.StoreLogo[0].src;
            dispatch({
              type: 'global/setConfigData',
              payload: {
                oemInfo,
              },
            });
          } else {
            message.error(res.Msg, 2);
          }
        },
      },
    });
  };

  resetForm = () => {
    this.props.zentForm.validateForm();
  };
  updateLocalImage = data => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 3000);
    });
  };
  updateIndustry = e => {
    console.log(e);
    // let ids=[];
    // e.forEach((item)=>{
    //   ids.push(item.id);
    // })
    let ids = e.map(item => item.id);
    console.log(ids);
    this.setState(
      {
        value: ids,
      },
      () => {
        this.props.zentForm.setFieldsValue({
          Industry: ids,
        });
      }
    );
  };
  transformData = data => {
    let arr = [];
    if (data) {
      data.forEach(item => {
        item.title = item.label;
        item.id = item.value;
        if (item.children) {
          item.children.forEach(v => {
            v.title = v.label;
            v.id = v.value;
          });
        }
      });
      arr = data;
    }
    return arr;
  };
  render() {
    const { storeInfo, loading, submitLoading, industryList, cdnUrl } = this.props;
    const { iconModalVisible, currentSelectedIconInfo, fileList, imageUrl } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
        md: { span: 10 },
      },
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const { handleSubmit, zentForm } = this.props;
    return (
      <Fragment>
        <Spin spinning={loading}>
          <Card bordered={false}>
            <div className={styles.storeinfo}>
              <Form horizontal onSubmit={handleSubmit(this.submit)}>
                <Field
                  name="StoreLogo"
                  label="店铺LOGO:"
                  component={UploadField}
                  value={[]}
                  required
                  maxSize={8 * 1000 * 1000}
                  triggerInline
                  // tips="建议尺寸：640 x 640 像素；"
                  onUpload={this.updateLocalImage}
                  validations={{ required: true }}
                  validationErrors={{ required: '请上传店铺LOGO' }}
                />
                <FormInputField
                  name="StoreName"
                  type="text"
                  label="店铺名称:"
                  required
                  spellCheck={false}
                  validations={{
                    required: true,
                    matchRegex: /^[a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D\d]{2,20}$/,
                  }}
                  validationErrors={{
                    required: '请填写店铺名称',
                    matchRegex: '店铺名称最少2、最大20个字符',
                  }}
                />
                <Field
                  name="Industry"
                  label="所属行业:"
                  component={Industry}
                  value={[]}
                  options={this.transformData(industryList)}
                  required
                  triggerInline
                  // tips="建议尺寸：640 x 640 像素；"
                  onChange={this.updateIndustry}
                  validations={{ required: true }}
                  validationErrors={{ required: '请选择所属行业' }}
                />
                <FormInputField
                  name="TelPhone"
                  type="text"
                  label="手机号码:"
                  required
                  spellCheck={false}
                  validations={{ required: true, matchRegex: /^1[2-9][\d]{9}$/ }}
                  validationErrors={{
                    required: '请填写手机号码',
                    matchRegex: '请输入正确手机号码',
                  }}
                />
                <FormInputField
                  name="Contacts"
                  type="text"
                  label="联系人:"
                  required
                  spellCheck={false}
                  validations={{
                    required: true,
                    matchRegex: /^[a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D]{2,20}$/,
                  }}
                  validationErrors={{
                    required: '请填写联系人',
                    matchRegex: '联系人只能输入中英文，字数在2~20个',
                  }}
                />
                <FormInputField
                  name="Introduction"
                  type="textarea"
                  label="店铺简介:"
                  showCount
                  maxLength={60}
                  autoSize
                  spellCheck={false}
                />
                <div className="zent-form__form-actions">
                  <Button type="primary" htmlType="submit" loading={submitLoading}>
                    保存信息
                  </Button>
                  {/* <Button type="primary" outline onClick={this.resetForm}>重置表单值</Button> */}
                </div>
              </Form>
            </div>
          </Card>
        </Spin>
      </Fragment>
    );
  }
}

const WrappedForm = createForm({ scrollToError: true })(FieldForm);

//export default WrappedForm

export default connect(({ global, storeinfo, loading }) => ({
  oemInfo: global.oemInfo,
  cdnUrl: global.oemInfo.cdnUrl,
  storeinfo,
  storeInfo: storeinfo.storeInfo,
  industryList: storeinfo.industryList,
  loading: loading.effects['storeinfo/GetStoreInfo'],
  submitLoading: loading.effects['storeinfo/SaveStoreInfo'],
}))(WrappedForm);
