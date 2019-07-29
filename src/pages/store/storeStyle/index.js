import React, { Component, Fragment } from 'react';
import { SketchPicker } from 'react-color';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Tag, Divider,Button,Icon, Card,Spin ,message} from 'antd';
import detail1 from '../../../assets/detail-1.png';
import detail2 from '../../../assets/detail-2.png';
import detail3 from '../../../assets/detail-3.png';
import styles from './index.less';
import reactCSS from 'reactcss';
import { baseCallbak, commonCallbak } from '@/utils/error';
import Color from 'color';

let Colors = require('colors.js');
const textColor = hex => {  
  if (!hex) {
    return;
  }
  let rgb = Color(hex);
  let lightness = Color(hex).lightness();
  let hsl = Color(hex).hsl();
  if (lightness > 65) {
    if (
      rgb.color[0] == rgb.color[1] &&
      rgb.color[0] == rgb.color[2] &&
      rgb.color[1] == rgb.color[2]
    ) {
      return Color([rgb.color[0] - 128, rgb.color[1] - 128, rgb.color[2] - 128]).hex();
    } else if (
      rgb.color[0] != rgb.color[1] &&
      rgb.color[0] != rgb.color[2] &&
      rgb.color[1] != rgb.color[2]
    ) {
      return Color(`hsl(${hsl.color[0]}, ${hsl.color[1] + 45}%, ${hsl.color[2] - 50}%)`).hex();
    } else {
      return '#fff';
    }
  } else {
    return '#fff';
  }
};
const getType = (arr, color) => {
  let type = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].themColor === color) {
      type = i + 1;
    }
  }
  return type;
};

@connect(({ storestyle, loading }) => ({
  storestyle,
  themeList: storestyle.themeList,
  loading: loading.effects['storestyle/GetStoreStyle'],
  loading2: loading.effects['storestyle/GetThemeList'],
  submitLoading: loading.effects['storestyle/SaveStoreStyle'],
}))

export default class Analysis extends Component {
  state = {
    loading: true,
    tabIndex: 0,
    displayColorPicker: false,
    styleColor: '#fff',
    color: {
      r: '255',
      g: '255',
      b: '255',
      a: '1',
    },
    defaultColor: '',
    type: 6,
    mainColor: '',
    subColor: '',
    isCustom: false,
  };
  componentWillMount() {
    const { dispatch, form } = this.props;
    // const { setFieldsValue } = form;
    const { navList: list } = this.state;
    let that = this;
    let aa = Color('#fff').hsl();
    let bb = Color('hsl(200, 100%, 50%)').hex();
    dispatch({
      type: 'storestyle/GetThemeList',
      callback: {
        success: res => {
          if (res.Code == 0) {
            dispatch({
              type: 'storestyle/GetStoreStyle',
              callback: {
                success: data => {
                  if (data.Code == 0) {
                    let type = getType(res.Data.ThemeList, data.Data.StoreStyleData.themeColor);
                    console.log(type, '=====');
                    this.setState({
                      isCustom: data.Data.StoreStyleData.isCustom,
                      type: data.Data.StoreStyleData.isCustom ? 0 : type ? type : 1,
                      mainColor: data.Data.StoreStyleData.isCustom
                        ? data.Data.StoreStyleData.themeColor
                        : '',
                      subColor: data.Data.StoreStyleData.isCustom
                        ? data.Data.StoreStyleData.subColor
                        : '',
                      loading: false,
                    });
                  }
                  // baseCallbak(function(json,isr){
                  //   commonCallbak(json.Code,isr)
                  // })
                },
              },
            });
          }
        },
      },
    });
  }
  handleClick = type => {
    if (type == 0) {
      this.setState({
        displayColorPicker: !this.state.displayColorPicker,
        type: type,
        isCustom: this.state.mainColor ? true : false,
      });
    } else {
      this.setState({
        type: type,
        isCustom: false,
      });
    }
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color, type) => {
    console.log(color);
    if (type == 1) {
      this.setState({ mainColor: color.hex, isCustom: true });
    } else {
      this.setState({ subColor: color.hex, isCustom: true });
    }
  };
  handleChangeComplete = color => {
    this.setState({ styleColor: color.hex });
  };
  submit = () => {
    let that = this;
    const { dispatch, themeList } = this.props;
    const { type } = this.state;
    dispatch({
      type: 'storestyle/SaveStoreStyle',
      payload: {
        StyleJs: {
          //themeColor:type==0?that.state.mainColor:type==1?'#FF476C':type==2?'#C3A769':type==3?'#02B8B1':type==4?'#FCC600':type==5?'#FF3131':'#FF476C',
          //subColor:type==0?that.state.subColor:type==1?'#FFB3C2':type==2?'#F3EEE1':type==3?'#B2E9E7':type==4?'#212121':type==5?'#FF9800':'#FFB3C2',
          themeColor: type == 0 ? that.state.mainColor : themeList[type - 1].themColor,
          subColor: type == 0 ? that.state.subColor : themeList[type - 1].subColor,
          isCustom: type == 0 ? true : false,
        },
      },
      callback: {
        success: res => {
          if (res.Code == 0) {
            message.success('保存成功');
          }
        },
      },
    });
  };
  selectColor = () => {};
  render() {
    const {
      user,
      //loading,
      loading2,
      submitLoading,
      themeList,
      iconList,
    } = this.props;
    const { iconModalVisible, type, isCustom, loading } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        md: { span: 20 },
      },
    };
    const style = reactCSS({
      default: {
        color: {
          width: '27px',
          height: '22px',
          // borderRadius: '2px',
          display: 'inline-block',
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${
            this.state.color.a
          })`,
        },
        swatch: {
          width: '64px',
          height: '32px',
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          boxSizing: 'border-box',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          left: '0',
          top: '40px',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    return (
      <Fragment>
        <Spin spinning={loading}>
          <Card bordered={false}>
            <Row>
              <Col>
                {this.state.mainColor ? (
                  <div
                    style={style.swatch}
                    onClick={() => this.handleClick(0)}
                    className={`${type == 0 ? styles.active : ''}`}
                  >
                    <div
                      style={{
                        width: '27px',
                        height: '22px',
                        display: 'inline-block',
                        background: this.state.mainColor,
                      }}
                    />
                    <div
                      style={{
                        width: '27px',
                        height: '22px',
                        display: 'inline-block',
                        background: this.state.subColor,
                      }}
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => this.handleClick(0)}
                    className={`${styles.swatch} ${
                      type == 0 ? styles.active : ''
                    } xkd-vertical-align-top xkd-text-center`}
                  >
                    自定义
                  </div>
                )}
                {this.state.displayColorPicker ? (
                  <div style={style.popover}>
                    <div style={style.cover} onClick={this.handleClose} />
                    <SketchPicker
                      color={this.state.mainColor || this.state.color}
                      onChange={color => this.handleChange(color, 1)}
                    />
                    <SketchPicker
                      className={styles.subColorPicker}
                      color={this.state.subColor || this.state.color}
                      onChange={color => this.handleChange(color, 2)}
                    />
                  </div>
                ) : null}
                {themeList.map((item, index) => {
                  console.log(item);
                  return (
                    <div
                      className={`${styles.swatch} ${
                        type == index + 1 ? styles.active : ''
                      } xkd-ml16`}
                      onClick={() => this.handleClick(index + 1)}
                      key={index}
                    >
                      <div
                        className={styles.color1}
                        style={{ backgroundColor: `${item.themColor}` }}
                      />
                      <div
                        className={styles.color1}
                        style={{ backgroundColor: `${item.subColor}` }}
                      />
                    </div>
                  );
                })}               
              </Col>
            </Row>
            <Divider dashed className="xkd-mt16 xkd-mb24" />
            <Row gutter={16}>
              <Col style={{ float: 'left' }}>
                <div>
                  <div className={styles.header}>
                    <img
                      src={detail1}
                      style={{ width: '296px' }}
                      className="xkd-vertical-align-top"
                    />
                    <div style={{ position: 'absolute', top: '400px', left: '8px' }}>
                      <span
                        style={{
                          color: `${
                            isCustom
                              ? this.state.mainColor
                              : themeList[type - 1]
                                ? themeList[type - 1].themColor
                                : ''
                          }`,
                        }}
                      >
                        <span style={{ fontSize: 12 }}>￥</span>
                        349.00
                      </span>
                      <span
                        style={{ fontSize: 12, textDecoration: 'line-through', marginLeft: '8px' }}
                      >
                        ￥449.00
                      </span>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '0',
                        height: 38,
                        lineHeight: '38px',
                        width: '100%',
                        paddingLeft: '124px',
                        boxSizing: 'border-box',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-block',
                          padding: '0 8px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                          width: 86,
                          backgroundColor: `${
                            isCustom
                              ? this.state.subColor
                              : themeList[type - 1]
                                ? themeList[type - 1].subColor
                                : ''
                          }`,
                          color: `${
                            isCustom
                              ? textColor(this.state.subColor)
                              : themeList[type - 1]
                                ? textColor(themeList[type - 1].subColor)
                                : ''
                          }`,
                        }}
                        className="xkd-text-center"
                      >
                        加入购物车
                      </div>
                      <div
                        style={{
                          display: 'inline-block',
                          padding: '0 8px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                          width: 86,
                          backgroundColor: `${
                            isCustom
                              ? this.state.mainColor
                              : themeList[type - 1]
                                ? themeList[type - 1].themColor
                                : ''
                          }`,
                          color: `${
                            isCustom
                              ? textColor(this.state.mainColor)
                              : themeList[type - 1]
                                ? textColor(themeList[type - 1].themColor)
                                : ''
                          }`,
                          // backgroundColor:`${isCustom?this.state.mainColor:type==1?'#FF476C':type==2?'#C3A769':type==3?'#02B8B1':type==4?'#FCC600':type==5?'#FF3131':'#FF476C'}`,
                          // color:`${isCustom?textColor(this.state.mainColor):type==1?textColor('#FF476C'):type==2?textColor('#C3A769'):type==3?textColor('#02B8B1'):type==4?textColor('#FCC600'):type==5?textColor('#FF3131'):textColor('#FF476C')}`
                        }}
                        className="xkd-text-center"
                      >
                        立即购买
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col style={{ float: 'left' }}>
                <div>
                  <div className={styles.header}>
                    <img
                      src={detail2}
                      style={{ width: '296px' }}
                      className="xkd-vertical-align-top"
                    />
                    <div style={{ position: 'absolute', top: '200px', left: '112px' }}>
                      <p
                        style={{
                          color: `${
                            isCustom
                              ? this.state.mainColor
                              : themeList[type - 1]
                                ? themeList[type - 1].themColor
                                : ''
                          }`,
                        }}
                      >
                        <span style={{ fontSize: 12 }}>￥</span>
                        349.00
                      </p>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: '264px',
                        left: '8px',
                        width: 'calc(100% - 16px)',
                      }}
                    >
                      <div style={{ textAlign: 'left', marginBottom: 24 }}>
                        <p style={{ textAlign: 'left' }}>颜色</p>
                        <div
                          style={{
                            display: 'inline-block',
                            color: `${
                              isCustom
                                ? this.state.mainColor
                                : themeList[type - 1]
                                  ? themeList[type - 1].themColor
                                  : ''
                            }`,
                            border: `1px solid ${
                              isCustom
                                ? this.state.mainColor
                                : themeList[type - 1]
                                  ? themeList[type - 1].themColor
                                  : ''
                            }`,
                            padding: '4px',
                            borderRadius: '4px',
                            marginRight: '4px',
                          }}
                        >
                          静谧黑
                        </div>
                        <div
                          style={{
                            display: 'inline-block',
                            color: '#999',
                            border: `1px solid #e8e8e8`,
                            padding: '4px',
                            borderRadius: '4px',
                            marginRight: '4px',
                          }}
                        >
                          静谧黑
                        </div>
                        <div
                          style={{
                            display: 'inline-block',
                            color: '#999',
                            border: `1px solid #e8e8e8`,
                            padding: '4px',
                            borderRadius: '4px',
                            marginRight: '4px',
                          }}
                        >
                          静谧黑
                        </div>
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <p style={{ textAlign: 'left' }}>颜色</p>
                        <div
                          style={{
                            display: 'inline-block',
                            color: '#999',
                            border: `1px solid #e8e8e8`,
                            padding: '4px',
                            borderRadius: '4px',
                            marginRight: '4px',
                          }}
                        >
                          静谧黑
                        </div>
                        <div
                          style={{
                            display: 'inline-block',
                            color: '#999',
                            border: `1px solid #e8e8e8`,
                            padding: '4px',
                            borderRadius: '4px',
                            marginRight: '4px',
                          }}
                        >
                          静谧黑
                        </div>
                        <div
                          style={{
                            display: 'inline-block',
                            color: `${
                              isCustom
                                ? this.state.mainColor
                                : themeList[type - 1]
                                  ? themeList[type - 1].themColor
                                  : ''
                            }`,
                            border: `1px solid ${
                              isCustom
                                ? this.state.mainColor
                                : themeList[type - 1]
                                  ? themeList[type - 1].themColor
                                  : ''
                            }`,
                            padding: '4px',
                            borderRadius: '4px',
                            marginRight: '4px',
                          }}
                        >
                          静谧黑
                        </div>
                        <div
                          style={{
                            display: 'inline-block',
                            color: '#999',
                            border: `1px solid #e8e8e8`,
                            padding: '4px',
                            borderRadius: '4px',
                            marginRight: '4px',
                          }}
                        >
                          静谧黑
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <div
                            style={{
                              display: 'inline-block',
                              color: '#999',
                              border: `1px solid #e8e8e8`,
                              padding: '4px',
                              borderRadius: '4px',
                              marginRight: '4px',
                            }}
                          >
                            静谧黑
                          </div>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <span>数量</span>
                          <span style={{ float: 'right' }}>
                            <Tag>-</Tag>1<Tag style={{ marginLeft: 8, marginRight: 0 }}>+</Tag>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="xkd-text-center"
                      style={{
                        color: `${
                          isCustom
                            ? textColor(this.state.mainColor)
                            : themeList[type - 1]
                              ? textColor(themeList[type - 1].themColor)
                              : ''
                        }`,
                        position: 'absolute',
                        bottom: '2px',
                        left: '0',
                        width: '100%',
                        lineHeight: '38px',
                        height: 38,
                        backgroundColor: `${
                          isCustom
                            ? this.state.mainColor
                            : themeList[type - 1]
                              ? themeList[type - 1].themColor
                              : ''
                        }`,
                      }}
                    >
                      操作按钮
                    </div>
                  </div>
                </div>
              </Col>
              <Col style={{ float: 'left' }}>
                <div>
                  <div className={styles.header}>
                    <img
                      src={detail3}
                      style={{ width: '296px' }}
                      className="xkd-vertical-align-top"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '0',
                        width: '100%',
                        textAlign: 'right',
                        height: 36,
                        lineHeight: '36px',
                      }}
                      className={styles.pay}
                    >
                      <Button
                        style={{
                          color: `${
                            isCustom
                              ? textColor(this.state.mainColor)
                              : themeList[type - 1]
                                ? textColor(themeList[type - 1].themColor)
                                : ''
                          }`,
                          border: 0,
                          fontSize: '12px !important',
                          height: 28,
                          marginRight: 6,
                          lineHeight: '27px',
                          backgroundColor: `${
                            isCustom
                              ? this.state.mainColor
                              : themeList[type - 1]
                                ? themeList[type - 1].themColor
                                : ''
                          }`,
                        }}
                      >
                        <span className="xkd-font12">立即支付</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
          <div className="xkd-bottom-actions">
            <Button
              type="primary"
              onClick={() => this.submit()}
              loading={submitLoading}
              disabled={loading}
            >
              保存信息
            </Button>
          </div>
        </Spin>
      </Fragment>
    );
  }
}
