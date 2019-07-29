import React, { PureComponent, Fragment } from 'react';
// import { Menu, Icon, Spin, Tag, Dropdown, Avatar } from 'antd';
import { Menu} from 'zent';
import { connect } from 'dva';
import router from 'umi/router';
import Debounce from 'lodash-decorators/debounce';
import { getMenuList } from '@/utils/utils';
import { clearTokenCookie, getMainHost } from '@/utils/utils';
import styles from './Header.less';
const { MenuItem } = Menu;
@connect(({ global }) => ({ oemInfo: global.oemInfo }))
export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  getCurrentRouterInfo(level) {
    let menuList = getMenuList(this.props.menus, level);
    let currentRouterInfo = {
      index: -1,
      name: '',
    };
    if (level == 'one') {
      let firstRouter = this.props.location.pathname.split('/')[2];
      for (var i = 0; i < menuList.length; i++) {
        if (menuList[i].path === '/' + firstRouter) {
          currentRouterInfo.index = i;
          currentRouterInfo.name = menuList[i].name;
          break;
        }
      }
    } else if (level == 'two') {
      let twoRouter = this.props.location.pathname.substr(14).split('/');
      if (twoRouter.length > 2) {
        for (var i = 0; i < menuList.length; i++) {
          if (menuList[i].path === '/' + twoRouter[0] + '/' + twoRouter[1] + '/' + twoRouter[2]||menuList[i].path === '/' + twoRouter[0] + '/' + twoRouter[1]) {
            currentRouterInfo.index = i;
            currentRouterInfo.name = menuList[i].name;
            break;
          }
        }
      } else {
        for (var i = 0; i < menuList.length; i++) {
          if (menuList[i].path === '/' + twoRouter[0] + '/' + twoRouter[1]) {
            currentRouterInfo.index = i;
            currentRouterInfo.name = menuList[i].name;
            break;
          }
        }
      }
    }
    return currentRouterInfo;
  }
  onMenuClick = ({ key }) => {
    switch (key) {
      case 'changePass':
        //router.push('/modifyPss');
        break;
      case 'dataSetting':
        //router.push('/companySetting');
        break;
      case 'securitySetting':
        //router.push('/safeSetting');
        break;
      case 'logout':
        //document.cookie="token=0;domain=xiaokeduo.net;expires="+ new Date(0).toUTCString();
        clearTokenCookie(getMainHost());
        setTimeout(() => {
          window.location.href = this.props.oemInfo.passPortUrl;
        }, 200);
        break;
      default:
        break;
    }
  };
  toggle = () => {
    const { toggle } = this.props;
    toggle();
    //document.querySelector(`#layoutRight`).classList.add(`${styles.layoutRight_show}`);
  };
  render() {
    const { onMenuClick, oemInfo, topChildren } = this.props;
    let twoRouterInfo = this.getCurrentRouterInfo('two');
    // let top=ReactDOM.render()
   // console.log(topChildren, 123);
    return (
      <div
        className={styles.header}
        style={{ padding: 0, height: '64px', lineHeight: '64px' }}
        id="header"
      >
        {/* {topChildren?topChildren:
          (<Fragment>
            <div className={styles.breadcrumbs}>{twoRouterInfo.name}</div>
            <div className={styles.right} onClick={this.toggle}>         
              帮助和服务
            </div>
          </Fragment> )
        }         */}
        <Fragment>
          <div className={styles.breadcrumbs}>{twoRouterInfo.name}</div>
          <div className={styles.right} onClick={this.toggle}>
            帮助和服务
          </div>
        </Fragment>
      </div>
    );
  }
}
