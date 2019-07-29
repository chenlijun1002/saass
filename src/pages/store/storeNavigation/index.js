import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Button,
  Form,
  Input,
  Tag,
  Tabs,
  message,
  Tooltip,
  Modal,
  Spin,
} from 'antd';
import omit from 'lodash/omit';
import SelectedIcon from '@/components/plugins/selectIcon/index';
import SelectedPagePath from '@/components/plugins/selectPath/index';
import storeNavigation from '../../../assets/storeNavigation.png';
import styles from './index.less';
//import {showMessage} from '@/components/ShowMessage/index';
import { baseCallbak, commonCallbak } from '@/utils/error';
import { transformChinese } from '@/utils/utils';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const confirm = Modal.confirm;
//import iconList from './iconData'

// class AddNavIcons extends Component {
//   render() {
//     const passableProps = omit(this.props, unknownProps);
//     const { value, showModal } = this.props;
//     const { iconPath, selectedIconPath } = value;
//     return (
//       <div style={{ width: 155 }}>
//         {iconPath ? (
//           <div className={styles['icon-item']} style={{ position: 'relative', marginBottom: 0 }}>
//             <div className={`${styles.line} ${styles.item}`}>
//               <img src={iconPath} />
//             </div>
//             <div className={styles.item}>
//               <img src={selectedIconPath} />
//             </div>
//             <div className={styles.mask} onClick={() => showModal(1)}>
//               <Icon type="edit" style={{ marginRight: 8 }} />
//               修改
//             </div>
//           </div>
//         ) : (
//           <div className={styles.selectedIcon} onClick={() => showModal(1)}>
//             <Icon type="plus" theme="outlined" />
//           </div>
//         )}
//       </div>
//     );
//   }
// }
// class AddNavLink extends Component {
//   render() {
//     const { value, showModal } = this.props;
//     return (
//       <div style={{ width: 155, textAlign: 'left' }}>
//         {value ? (
//           <Fragment>
//             <Button
//               type="primary"
//               className="xkd-width-116 xkd-text-ellipsis"
//               style={{ backgroundColor: 'transparent', color: '#27f' }}
//             >
//               {value}
//             </Button>
//             <a style={{ marginLeft: 10, fontSize: '14px' }} onClick={() => showModal(2)}>
//               修改
//             </a>
//           </Fragment>
//         ) : (
//           <Button onClick={() => showModal(2)}>选择链接</Button>
//         )}
//       </div>
//     );
//   }
// }
// const NavIcon = getControlGroup(AddNavIcons);
// const addNavLink = getControlGroup(AddNavLink);
const countnums = (function() {
  let trim = function(strings) {
    return (strings || '').replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, ''); //+表示匹配一次或多次，|表示或者，\s和\u00A0匹配空白字符，/^以……开头，$以……结尾，/g全局匹配,/i忽略大小写
  };
  return function(_str) {
    _str = trim(_str); //去除字符串的左右两边空格
    let strlength = _str.length;
    if (!strlength) {
      //如果字符串长度为零，返回零
      return 0;
    }
    let chinese = _str.match(/[\u4e00-\u9fa5]/g); //匹配中文，match返回包含中文的数组
    return strlength + (chinese ? chinese.length : 0); //计算字符个数
  };
})();
class AddNavIcons extends Component {
  render() {
    //const passableProps = omit(this.props, unknownProps);
    const { value, showModal } = this.props;
    const { iconPath, selectedIconPath } = value;
    return (
      <div style={{ width: 155 }}>
        {iconPath ? (
          <div className={styles['icon-item']} style={{ position: 'relative', marginBottom: 0 }}>
            <div className={`${styles.line} ${styles.item}`}>
              <img src={iconPath} />
            </div>
            <div className={styles.item}>
              <img src={selectedIconPath} />
            </div>
            <div className={styles.mask} onClick={() => showModal(1)}>
              <Icon type="edit" style={{ marginRight: 8 }} />
              修改
            </div>
          </div>
        ) : (
          <div className={styles.selectedIcon} onClick={() => showModal(1)}>
            <Icon type="plus" theme="outlined" />
          </div>
        )}
      </div>
    );
  }
}
class AddNavLink extends Component {
  render() {
    const { value, showModal, activeId, tabs } = this.props;
    return (
      <div style={{ textAlign: 'left' }}>
        {value ? (
          <Fragment>
            <Button
              type="primary"
              className="xkd-width-116 xkd-text-ellipsis"
              style={{
                backgroundColor: 'rgba(187, 221, 255,0.5)',
                color: '#2E74FF',
                borderColor: 'rgba(24,144,255,0.5)',
                width: 'auto',
                minWidth: 116,
              }}
            >
              {value}
            </Button>
            {activeId == 0 || activeId == tabs.length - 1 ? null : (
              <a style={{ marginLeft: 10, fontSize: '14px' }} onClick={() => showModal(2)}>
                修改
              </a>
            )}
          </Fragment>
        ) : (
          <Button onClick={() => showModal(2)}>选择链接</Button>
        )}
      </div>
    );
  }
}
@Form.create()
class StoreNavigation extends Component {
  // state = {
  //   tabIndex: 0,
  //   pagePath: '',
  //   pageName:'',
  //   selectedIconPath:'',
  //   iconPath:'',
  //   iconModalVisible: false,
  //   pagePathModalVisible:false,
  //   tabBarList:[],
  //   navList:[],
  //   isEdit:false,
  //   currentSelectedIcon:'',
  //   currentIconType:1,
  //   dataList:[],
  //   contentType:1
  // };
  state = {
    iconModalVisible: false,
    currentIconType: 1,
    contentType: '1',
    dataList: [],
    tabBarList: [],
    text: '',
    pageName: '',
    activeId: '0',
    removeTabIndex: '2',
    tabs: [],
    SelectedColor: '#ff476c',
    UnderReview: false,
    // tabs: [{
    //   title: '导航一',
    //   key: '0',
    //   //disabled: true
    // }, {
    //   title: '导航二',
    //   key: '1',
    //  // disabled: true
    // }, {
    //   title: '导航五',
    //   key: '4',
    //  // disabled: true
    // }]
  };

  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      {
        title: 'Tab 3',
        content: 'Content of Tab 3',
        key: '3',
        closable: false,
      },
    ];
  }

  componentWillMount() {
    const { dispatch, form } = this.props;
    const { zentForm } = this.props;
    //const { setFieldsValue } = form;
    const { tabs } = this.state;
    const that = this;
    dispatch({
      type: 'storenavigation/GetStoreNavigator',
      callback: {
        success: res => {
          //showMessage('444')
          if (res.Code == 0) {
            res.Data.NavigatorData.forEach((item, index) => {
              if (index == res.Data.NavigatorData.length - 1) {
                tabs.push({
                  title: `导航五`,
                  key: `${index}`,
                });
              } else {
                tabs.push({
                  title: `导航${transformChinese(index + 1)}`,
                  key: `${index}`,
                });
              }
            });
            that.setState(
              {
                UnderReview: res.Data.UnderReview,
                tabs,
                tabBarList: res.Data.NavigatorData,
                text: res.Data.NavigatorData[0].text,
                pagePath: res.Data.NavigatorData[0].pagePath,
                pageName: res.Data.NavigatorData[0].pageName,
                selectedIconPath: res.Data.NavigatorData[0].selectedIconPath,
                iconPath: res.Data.NavigatorData[0].iconPath,
                currentSelectedIcon: res.Data.NavigatorData[0].selectedIconPath,
                SelectedColor: res.Data.SelectedColor || '#ff476c',
                currentIconType:
                  res.Data.SelectedColor === '#ff476c'
                    ? 1
                    : res.Data.SelectedColor === '#c3a769'
                      ? 2
                      : res.Data.SelectedColor === '#02b8b1'
                        ? 3
                        : res.Data.SelectedColor === '#fcc600'
                          ? 4
                          : res.Data.SelectedColor === '#2e74ff'
                            ? 5
                            : 1,
              },
              () => {
                dispatch({
                  type: 'storenavigation/GetIconList',
                  payload: {
                    Type: that.state.currentIconType,
                  },
                  callback: {
                    success: () => {
                      // showMessage('44554')
                    },
                  },
                });
              }
            );
            // zentForm.setFieldsValue({
            //   text: res.Data.NavigatorData[0].text
            // });
          }
          // baseCallbak(res,()=>{
          //   commonCallbak(res.Code,false,(code)=>{
          //     Notify.error(code)
          //   });
          // })
        },
      },
    });
  }

  onTabChange = index => {
    const { tabBarList, text, iconPath, pageName, activeId } = this.state;
    const {
      form: { setFieldsValue },
    } = this.props;
    if (!tabBarList[activeId].text) {
      return message.error('请输入导航名称');
    }
    if (!tabBarList[activeId].iconPath) {
      return message.error('请选择图标');
    }
    if (!tabBarList[activeId].pageName) {
      return message.error('请选择链接');
    }
    this.setState(
      {
        activeId: index,
        text: tabBarList[index].text,
        pagePath: tabBarList[index].pagePath,
        pageName: tabBarList[index].pageName,
        selectedIconPath: tabBarList[index].selectedIconPath,
        iconPath: tabBarList[index].iconPath,
        currentSelectedIcon: tabBarList[index].selectedIconPath,
      },
      () => {
        setFieldsValue({
          text: this.state.text,
        });
        this.forceUpdate();
      }
    );
  };

  handleSelectIcon = iconInfo => {
    const { tabBarList, text, iconPath, pageName, activeId } = this.state;
    tabBarList[activeId].selectedIconPath = iconInfo.selectedIcon;
    tabBarList[activeId].iconPath = iconInfo.icon;
    this.setState({
      tabBarList,
      currentSelectedIcon: iconInfo.icon,
      iconPath: iconInfo.icon,
      selectedIconPath: iconInfo.selectedIcon,
      currentSelectedIcon: iconInfo.selectedIcon,
    });
    this.hideModal(1);
  };

  hideModal(type) {
    if (type == 1) {
      this.setState({
        iconModalVisible: false,
      });
    } else {
      this.setState({
        pagePathModalVisible: false,
      });
    }
  }

  showModal = type => {
    const { dispatch } = this.props;
    if (type == 1) {
      this.setState({
        iconModalVisible: true,
      });
    } else {
      this.selectPathModal.showModal();
      // this.setState({
      //   pagePathModalVisible: true,
      // })
      // dispatch({
      //   type: 'storenavigation/GetFunctionPathList',
      //   payload: {
      //     PageSize: 5,
      //     PageIndex: 1,
      //   },
      //   callback: {
      //     success: res => {
      //       this.setState({
      //         dataList: res.Data.PageList,
      //         //pagePathModalVisible: true,
      //         contentType: 1,
      //       });
      //     },
      //   },
      // });
    }
  };

  handleIconModalCancel = () => {
    this.hideModal(1);
  };

  changeColorTab = type => {
    const { dispatch } = this.props;
    this.setState(
      {
        currentIconType: type,
        currentSelectedIcon: this.state.currentSelectedIcon,
      },
      () => {
        dispatch({
          type: 'storenavigation/GetIconList',
          payload: {
            Type: type,
          },
        });
        //this.forceUpdate();
      }
    );
  };

  selectPath = record => {
    const { tabBarList, activeId, contentType } = this.state;
    tabBarList[activeId].pagePath = record.PagePath;
    tabBarList[activeId].pageName = record.PageName;
    this.setState({
      pagePath: record.PagePath,
      pageName: record.PageName,
      //pagePathModalVisible: false,
    });
    this.setState({
      tabBarList,
    });
  };

  SaveStoreNavAndPub = (values, zentForm) => {
    const that = this;
    const { dispatch } = this.props;
    const { tabBarList } = this.state;
    let index = 0;
    for (const item of tabBarList) {
      index++;
      if (!item.text) {
        message.error(`请将导航${transformChinese(index)}填写完整`);
        return false;
      }
      if (countnums(item.text) > 20) {
        return false;
      }
      if (!item.iconPath) {
        message.error(`请将导航${transformChinese(index)}填写完整`);
        return false;
      }
      if (!item.pageName) {
        message.error(`请将导航${transformChinese(index)}填写完整`);
        return false;
      }
    }
    dispatch({
      type: 'storenavigation/SaveStoreNavAndPub',
      payload: {
        CustomJs: tabBarList,
        SelectedColor: that.state.SelectedColor,
      },
      callback: {
        success: res => {
          if (res.Code == 0) {
            this.setState({
              UnderReview: true,
            });
            message.success('保存发布成功');
          }
        },
        error: res => {
          message.error(res.Msg);
        },
      },
    });
  };

  submit = (values, zentForm) => {
    const { dispatch } = this.props;
    const { tabBarList } = this.state;
    let index = 0;
    for (const item of tabBarList) {
      index++;
      if (!item.text) {
        message.error(`请将导航${transformChinese(index)}填写完整`);
        return false;
      }
      if (countnums(item.text) > 20) {
        return false;
      }
      if (!item.iconPath) {
        message.error(`请将导航${transformChinese(index)}填写完整`);
        return false;
      }
      if (!item.pageName) {
        message.error(`请将导航${transformChinese(index)}填写完整`);
        return false;
      }
    }
    dispatch({
      type: 'storenavigation/SaveStoreNav',
      payload: {
        CustomJs: tabBarList,
        SelectedColor: this.state.SelectedColor,
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

  textChange = e => {
    const { activeId, tabBarList } = this.state;
    const value = e.target.value;
    tabBarList[activeId].text = value;
    this.setState(
      {
        tabBarList,
        text: value,
      },
      () => {}
    );
  };

  selectCurrentIconType = (type, selectedColor) => {
    const { activeId, tabBarList, currentIconType } = this.state;
    tabBarList.forEach(item => {
      item.selectedIconPath = `${item.selectedIconPath.substr(
        0,
        item.selectedIconPath.length - 5
      )}${type}.png`;
    });
    this.setState(
      {
        tabBarList,
        // currentIconType:type,
        SelectedColor: selectedColor,
        selectedIconPath: tabBarList[activeId].selectedIconPath,
        currentSelectedIcon: tabBarList[activeId].selectedIconPath,
      },
      () => {
        this.changeColorTab(type);
      }
    );
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { tabs, tabBarList } = this.state;

    if (tabs.length == 3) {
      const title = tabs[1].title;
      if (title == '导航三' || title == '导航四') {
        if (title == '导航三') {
          tabs.splice(tabs.length - 2, 0, {
            title: `导航${transformChinese(tabs.length - 1)}`,
            key: `0`,
          });
          tabBarList.splice(1, 0, {
            iconPath: '',
            pageName: '',
            pagePath: '',
            selectedIconIndex: 0,
            selectedIconPath: '',
            text: '',
          });
        } else {
          tabs.splice(tabs.length - 2, 0, {
            title: `导航${transformChinese(tabs.length)}`,
            key: `0`,
          });
          tabBarList.splice(1, 0, {
            iconPath: '',
            pageName: '',
            pagePath: '',
            selectedIconIndex: 0,
            selectedIconPath: '',
            text: '',
          });
        }
      }
    } else if (tabs.length == 4) {
      if (tabs[tabs.length - 2].title === '导航四') {
        if (tabs[tabs.length - 3].title === '导航三') {
          tabBarList.splice(tabs.length - 3, 0, {
            iconPath: '',
            pageName: '',
            pagePath: '',
            selectedIconIndex: 0,
            selectedIconPath: '',
            text: '',
          });
          tabs.splice(tabs.length - 3, 0, {
            title: `导航二`,
            key: `0`,
          });
        } else {
          tabBarList.splice(tabs.length - 2, 0, {
            iconPath: '',
            pageName: '',
            pagePath: '',
            selectedIconIndex: 0,
            selectedIconPath: '',
            text: '',
          });
          tabs.splice(tabs.length - 2, 0, {
            title: `导航三`,
            key: `0`,
          });
        }
      } else {
        tabBarList.splice(tabs.length - 1, 0, {
          iconPath: '',
          pageName: '',
          pagePath: '',
          selectedIconIndex: 0,
          selectedIconPath: '',
          text: '',
        });
        tabs.splice(tabs.length - 1, 0, {
          title: `导航四`,
          key: `0`,
        });
      }
    } else if (tabs.length == 2) {
      //   if (tabs[tabs.length - 2].title === '导航四') {

      // }
      tabBarList.splice(1, 0, {
        iconPath: '',
        pageName: '',
        pagePath: '',
        selectedIconIndex: 0,
        selectedIconPath: '',
        text: '',
      });
      tabs.splice(1, 0, {
        title: `导航二`,
        key: `1`,
      });
    }
    tabs.forEach((item, i) => {
      item.key = `${i}`;
    });
    this.setState({
      tabs,
      tabBarList,
    });
  };

  remove = key => {
    const {
      form: { setFieldsValue },
    } = this.props;
    const { tabs, tabBarList, activeId } = this.state;
    //let text = tabs[activeId].title;
    const indx = tabs.findIndex(itme => itme.key === key);
    const tabArr = [];
    tabs.splice(indx, 1);
    tabBarList.splice(indx, 1);
    tabs.forEach((item, i) => {
      item.key = `${i}`;
    });
    this.setState(
      {
        tabs,
        tabBarList,
        text: `${tabBarList[activeId].text}`,
        pageName: `${tabBarList[activeId].pageName}`,
        // activeId: `${activeId != key ? activeId : key}`,
        iconPath: `${tabBarList[activeId].iconPath}`,
        selectedIconPath: `${tabBarList[activeId].selectedIconPath}`,
        currentSelectedIcon: `${tabBarList[activeId].iconPath}`,
      },
      () => {
        setFieldsValue({
          text: this.state.text,
        });
      }
    );
  };

  selectRef = ref => {
    this.selectPathModal = ref;
  };

  render() {
    const {
      user,
      loading,
      loading1,
      loading2,
      loading3,
      loading4,
      loading5,
      iconObj,
      dataList,
    } = this.props;
    const {
      iconModalVisible,
      tabIndex,
      tabBarList,
      currentIconType,
      currentSelectedIcon,
      tabs,
      contentType,
    } = this.state;
    const {
      handleSubmit,
      zentForm,
      isSubmitting,
      isSubmitting2,
      global,
      form: { getFieldDecorator },
    } = this.props;
    const obj3 = {
      hideAdd: this.state.tabs.length >= 5,
      onChange: this.onTabChange.bind(this),
      activeKey: this.state.activeId,
      type: 'editable-card',
      onEdit: this.onEdit,
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
        //span: 2
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
        //span: 8
      },
    };
    return (
      <Fragment>
        <Spin spinning={loading}>
          <Card bordered={false}>
            <Row gutter={24}>
              <Col span={6} sm={6} xs={6}>
                <div style={{ width: '100%' }}>
                  <img style={{ width: '100%', verticalAlign: 'top' }} src={storeNavigation} />
                  <div
                    style={{
                      padding: '4px 0',
                      width: '100%',
                      height: '56px',
                      background: 'rgba(255,255,255,1)',
                      border: '1px solid #E8E8E8',
                      boxShadow: '0px -1px 0px rgba(232,232,232,1)',
                    }}
                  >
                    {this.state.tabBarList.map((item, index) => (
                      <div
                        style={{
                          float: 'left',
                          width: `${100 / this.state.tabBarList.length}%`,
                          textAlign: 'center',
                        }}
                        key={index}
                      >
                        <img
                          src={this.state.activeId == index ? item.selectedIconPath : item.iconPath}
                          style={{ width: '24px' }}
                        />
                        <p
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: this.state.activeId == index ? this.state.SelectedColor : '',
                            fontSize: '12px',
                          }}
                        >
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <img src={iconList.List[0]}/> */}
              </Col>
              <Col span={16} sm={18} xs={18} className={styles.right}>
                <Row>
                  <Col span={2} style={{ minWidth: 80 }}>
                    导航颜色：
                  </Col>
                  <Col span={20}>
                    <div>
                      <Tag
                        color="#fff"
                        //borderColor="#D9D9D9"
                        style={{
                          height: 26,
                          marginRight: 16,
                          border: '1px solid #D9D9D9',
                          padding: '4px',
                        }}
                        onClick={() => this.selectCurrentIconType(1, '#ff476c')}
                        className={`${
                          this.state.currentIconType == 1 ? styles.iconTypeActive : ''
                        }`}
                      >
                        <div
                          style={{ width: 28, height: 16, background: '#ff476c' }}
                          //className="xkd-margin4"
                        />
                      </Tag>
                      <Tag
                        color="#fff"
                        //borderColor="#D9D9D9"
                        style={{
                          height: 26,
                          marginRight: 16,
                          border: '1px solid #D9D9D9',
                          padding: '4px',
                        }}
                        onClick={() => this.selectCurrentIconType(2, '#c3a769')}
                        className={`${
                          this.state.currentIconType == 2 ? styles.iconTypeActive : ''
                        }`}
                      >
                        <div
                          style={{ width: 28, height: 16, background: '#c3a769' }}
                          //className="xkd-margin4"
                        />
                      </Tag>
                      <Tag
                        color="#fff"
                        // borderColor="#D9D9D9"
                        style={{
                          height: 26,
                          marginRight: 16,
                          border: '1px solid #D9D9D9',
                          padding: '4px',
                        }}
                        onClick={() => this.selectCurrentIconType(3, '#02b8b1')}
                        className={`${
                          this.state.currentIconType == 3 ? styles.iconTypeActive : ''
                        }`}
                      >
                        <div
                          style={{ width: 28, height: 16, background: '#02b8b1' }}
                          //className="xkd-margin4"
                        />
                      </Tag>
                      <Tag
                        color="#fff"
                        // borderColor="#D9D9D9"
                        style={{
                          height: 26,
                          marginRight: 16,
                          border: '1px solid #D9D9D9',
                          padding: '4px',
                        }}
                        onClick={() => this.selectCurrentIconType(4, '#fcc600')}
                        className={`${
                          this.state.currentIconType == 4 ? styles.iconTypeActive : ''
                        }`}
                      >
                        <div
                          style={{ width: 28, height: 16, background: '#fcc600' }}
                          //className="xkd-margin4"
                        />
                      </Tag>
                      <Tag
                        color="#fff"
                        //borderColor="#D9D9D9"
                        style={{
                          height: 26,
                          marginRight: 16,
                          border: '1px solid #D9D9D9',
                          padding: '4px',
                        }}
                        onClick={() => this.selectCurrentIconType(5, '#2e74ff')}
                        className={`${
                          this.state.currentIconType == 5 ? styles.iconTypeActive : ''
                        }`}
                      >
                        <div
                          style={{ width: 28, height: 16, background: '#2e74ff' }}
                          //className="xkd-margin4"
                        />
                      </Tag>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: 16 }}>
                  <Col span={2} style={{ minWidth: 80, lineHeight: '38px' }}>
                    导航设置：
                  </Col>
                  <Col span={20}>
                    <div className={styles.tabBar}>
                      {/* <Tabs {...obj3} type="card"/> */}
                      <Tabs {...obj3}>
                        {this.state.tabs.map((pane, index) => (
                          <TabPane
                            tab={pane.title}
                            key={pane.key}
                            closable={
                              index == 0 || index + 1 == this.state.tabs.length ? false : true
                            }
                          />
                        ))}
                      </Tabs>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: 16 }}>
                  <Col span={20} offset={2}>
                    <Form layout="horizontal" className="horizontal-form">
                      <FormItem {...formItemLayout} label="导航名称">
                        {getFieldDecorator('text', {
                          initialValue: this.state.text,
                          rules: [
                            {
                              pattern: /^[a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D\d]{1,5}$/,
                              message: '导航名称最多5个字符！',
                            },
                            {
                              required: true,
                              message: '导航名称不能为空',
                            },
                          ],
                        })(<Input onChange={this.textChange} className="xkd-width-per-50" />)}
                      </FormItem>
                      <FormItem {...formItemLayout} label="图标">
                        {getFieldDecorator('iconPath', {
                          initialValue: {
                            iconPath: this.state.iconPath,
                            selectedIconPath: this.state.selectedIconPath,
                          },
                          rules: [
                            {
                              required: true,
                              message: '请选择图标',
                            },
                          ],
                        })(<AddNavIcons showModal={this.showModal} />)}
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="链接"
                        help={
                          this.state.activeId == 0 ||
                          this.state.activeId == this.state.tabs.length - 1
                            ? '注：因小程序限制，导航一与导航五不可删除，且链接无法修改'
                            : ''
                        }
                      >
                        {getFieldDecorator('pagePath', {
                          initialValue: this.state.pageName,
                          rules: [
                            {
                              required: true,
                              message: '请选择链接',
                            },
                          ],
                        })(
                          <AddNavLink
                            showModal={this.showModal}
                            tabs={this.state.tabs}
                            activeId={this.state.activeId}
                          />
                        )}
                      </FormItem>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
          <SelectedIcon
            visible={iconModalVisible}
            iconList={iconObj.List || []}
            selectedIconList={iconObj.selectedList || []}
            onIconModalCancel={this.handleIconModalCancel}
            onSelectIcon={this.handleSelectIcon}
            currentSelectedIcon={currentSelectedIcon}
            currentIconType={currentIconType}
            changeColorTab={this.changeColorTab}
            showTab={false}
            loading={loading5}
          />

          <SelectedPagePath selectPath={this.selectPath} onRef={this.selectRef} />
        </Spin>
        <div className="xkd-bottom-actions">
          <Button
            onClick={() => this.submit()}
            loading={isSubmitting}
            disabled={loading}
            className="xkd-mr16"
          >
            仅保存
          </Button>
          {!this.state.UnderReview ? (
            <Button
              type="primary"
              onClick={() => this.SaveStoreNavAndPub()}
              loading={isSubmitting2}
              disabled={loading}
            >
              保存并发布
            </Button>
          ) : (
            <Tooltip
              placement="top"
              title="小程序正在发布版本，请等待当前版本发布完毕或在“小程序 - 版本管理”中撤销当前版本审核。"
            >
              <Button disabled>保存并发布</Button>
            </Tooltip>
          )}
        </div>
      </Fragment>
    );
  }
}
//const Wrapped = createForm({ scrollToError: true })(StoreNavigation);
export default connect(({ storenavigation, global, loading }) => ({
  storenavigation,
  global,
  tabBarList: storenavigation.tabBarList,
  iconObj: storenavigation.iconObj,
  isSubmitting: loading.effects['storenavigation/SaveStoreNav'],
  isSubmitting2: loading.effects['storenavigation/SaveStoreNavAndPub'],
  loading: loading.effects['storenavigation/GetStoreNavigator'],
  loading1: loading.effects['storenavigation/GetFunctionPathList'],
  loading2: loading.effects['storenavigation/GetProductPathList'],
  loading3: loading.effects['storenavigation/GetMicroPagePathList'],
  loading4: loading.effects['storenavigation/GetActivityPathList'],
  loading5: loading.effects['storenavigation/GetIconList'],
}))(StoreNavigation);
