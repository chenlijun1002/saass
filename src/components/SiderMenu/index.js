import React from 'react';
import { Link } from 'dva/router';
import { getMenuList } from '@/utils/utils';
import { connect } from 'dva';
import router from 'umi/router';
import iconStyle from '../../assets/css/iconfont.less';
import styles from './index.less';
import { Pop, Menu, Icon } from 'zent';
import Divider from '@/components/Divider/index';
import { clearTokenCookie, getMainHost } from '@/utils/utils';
const { MenuItem, SubMenu } = Menu;
@connect(({ global }) => ({
  menus: global.menuData,
  storeLogo: global.oemInfo.storeLogo,
  oemInfo: global.oemInfo,
  menuInfo:global.menuInfo
}))
export default class SiderMenu extends React.Component {
  state = {
    childrenMenus: [],
    hoverId:0
  };
  chnageChildrenMenus() {
    let { menus } = this.props;
    let childrenMenus = menus.length > 0 ? menus[0].menus : [];
    let oneRoute = this.props.location.pathname.substr(13);   
    for (var i = 0; i < menus.length; i++) {
      if (oneRoute.substr(1).split('/').length > 2) {
        if (
          menus[i].path ==
            `/${oneRoute.substr(1).split('/')[0]}/${oneRoute.substr(1).split('/')[1]}` ||
          menus[i].path == `/${oneRoute.substr(1).split('/')[0]}`
        ) {
          childrenMenus = menus[i].menus;
          break;
        }
      } else {
        if (menus[i].path == `/${oneRoute.substr(1).split('/')[0]}`) {
          childrenMenus = menus[i].menus;
          break;
        }
      }
    }
    return childrenMenus;
  }
  getCurrentRouterInfo(level) {
    let menuList = this.props.menus;
    let currentRouterInfo = {
      index: -1,
      name: this.props.menus.length > 0 ? this.props.menus[0].name : [],
    };
    let urlRouter = this.props.location.pathname.substr(13);
    if (level == 'one') {
      for (var i = 0; i < menuList.length; i++) {       
        if (urlRouter.substr(1).split('/').length > 2) {
          if (
            menuList[i].path ===
              `/${urlRouter.substr(1).split('/')[0]}/${urlRouter.substr(1).split('/')[1]}` ||
            menuList[i].path === `/${urlRouter.substr(1).split('/')[0]}`
          ) {
            currentRouterInfo.index = i;
            currentRouterInfo.id = menuList[i].id;
            currentRouterInfo.name = menuList[i].name;
            break;
          }
        } else {
          if (menuList[i].path === `/${urlRouter.substr(1).split('/')[0]}`) {
            currentRouterInfo.index = i;
            currentRouterInfo.id = menuList[i].id;
            currentRouterInfo.name = menuList[i].name;
            break;
          }
        }
      }
    } else if (level == 'two') {
      for (var i = 0; i < menuList.length; i++) {
        let isBreak = false;
        let childrenMenus = menuList[i].menus;
        if (childrenMenus.length > 0) {
          for (var k = 0; k < childrenMenus.length; k++) {
            let childrenMenusN = childrenMenus[k].menus;
            if (childrenMenusN.length > 0) {
              for (var j = 0; j < childrenMenusN.length; j++) {               
                if (urlRouter.substr(1).split('/').length > 2) {
                  if (
                    childrenMenusN[j].path ===
                      `/${urlRouter.substr(1).split('/')[0]}/${
                        urlRouter.substr(1).split('/')[1]
                      }` ||
                    childrenMenusN[j].path ===
                      `/${urlRouter.substr(1).split('/')[0]}/${urlRouter.substr(1).split('/')[1]}/${
                        urlRouter.substr(1).split('/')[2]
                      }` ||
                    childrenMenusN[j].path === `${urlRouter}`
                  ) {
                    currentRouterInfo.index = j;
                    currentRouterInfo.id = childrenMenusN[j].id;
                    currentRouterInfo.name = childrenMenusN[j].name;
                    isBreak = true;
                    break;
                  }
                } else {
                  if (childrenMenusN[j].path === urlRouter) {
                    currentRouterInfo.index = j;
                    currentRouterInfo.id = childrenMenusN[j].id;
                    currentRouterInfo.name = childrenMenusN[j].name;
                    isBreak = true;
                    break;
                  }
                }
              }
            }
            if (isBreak) break;
          }
        }
      }
    }
    //console.log(currentRouterInfo, '方法内部currentRouterInfo');
    return currentRouterInfo;
  }
  onMenuClick = (e, key) => {
    //console.log(key,'key');return;
    switch (key) {
      case 'stoteinfo':
        //router.push('/modifyPss');
        //window.location.href = this.props.oemInfo.mchcenterUrl;
        router.replace({
          pathname: `/${window.storeId}/setting/store/info`,
        });
        break;
      case 'mchcenter':
        //router.push('/modifyPss');
        window.location.href = this.props.oemInfo.mchcenterUrl;
        break;
      case 'securitySetting':
        //router.push('/safeSetting');
        window.location.href = `${this.props.oemInfo.mchcenterUrl}/#/companySetting`;
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
  onError= (e)=>{    
    e.target.src='http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/systemfile/store/storelogo.png?x-oss-process=style/180';
    
  }
  render() {
    let {
      menus,
      storeLogo,
      oemInfo,
      menuInfo,
      location: { pathname },
    } = this.props;    
    let firstBackgroundColor=menuInfo&&menuInfo.firstBackgroundColor?menuInfo.firstBackgroundColor.substr(1):'363636',
      firstHoverColor=menuInfo&&menuInfo.firstHoverColor?menuInfo.firstHoverColor.substr(1):'ffffffd9',
      firstSelectedColor=menuInfo&&menuInfo.firstSelectedColor?menuInfo.firstSelectedColor.substr(1):'ffffffd9',
      firstTextColor=menuInfo&&menuInfo.firstTextColor?menuInfo.firstTextColor.substr(1):'ffffff73',
      secondBackgroundColor=menuInfo&&menuInfo.secondBackgroundColor?menuInfo.secondBackgroundColor.substr(1):'f0f7ff',
      secondHoverColor=menuInfo&&menuInfo.secondHoverColor?menuInfo.secondHoverColor.substr(1):'f0f7ff',
      secondSelectedColor=menuInfo&&menuInfo.secondSelectedColor?menuInfo.secondSelectedColor.substr(1):'2e74ff',
      secondTextColor=menuInfo&&menuInfo.secondTextColor?menuInfo.secondTextColor.substr(1):'000000d9';
    let firstRouterInfo = this.getCurrentRouterInfo('one');
    let twoRouterInfo = this.getCurrentRouterInfo('two');
    //console.log(twoRouterInfo, 'twoRouterInfo');
    let childrenMenus = this.chnageChildrenMenus();
    const menu = (
      <Menu onClick={this.onMenuClick} className="hello" style={{ width: '144px' }}>
        <MenuItem key="stoteinfo" className="food">
          店铺信息
        </MenuItem>
        <MenuItem key="mchcenter" className="food">
          切换店铺
          <span className={`iconfont icon-retweet`} style={{ float: 'right', marginRight: 8 }} />
        </MenuItem>
        {/* <SubMenu title={"电器分类"} overlayClassName="sub">
        
      </SubMenu>      */}
        <MenuItem key="1-2" className={styles.height60} key="securitySetting">
          <p style={{ lineHeight: '36px' }}>{oemInfo.storeName}</p>
          <p style={{ lineHeight: '14px' }}>{oemInfo.telPhone}</p>
          <Icon type="right" style={{ float: 'right', marginRight: 2, color: '#777' }} />
        </MenuItem>
        <MenuItem key="logout">
          退出登录
          <span className={`iconfont icon-poweroff`} style={{ float: 'right', marginRight: 8 }} />
        </MenuItem>
      </Menu>
    );
    //console.log(firstRouterInfo,twoRouterInfo,childrenMenus,menus,123)
    //console.log(`${oemInfo.cdnUrl}/${storeLogo}`,888)
    return (
      <div
        className={styles['page-sider-menu']}
        style={{ width: pathname === `/${window.storeId}/mall/dashboard` ? 72 : 184 }}
      >
        <div className={styles['page-sider-menu-content']}>
          <div className={`${styles['page-sider-menu-content-left']} ${styles[`bg-${firstBackgroundColor}`]}`}>
            <div className={styles['seller-logo']}>
              <Pop
                trigger={'hover'}
                position="bottom-left"
                content={<div>{menu}</div>}
                className={styles.pop}
                style={{ padding: 0 }}
              >
              {
                oemInfo.cdnUrl?
                <img src={`${oemInfo.cdnUrl}/${storeLogo}?x-oss-process=style/180`} onError={this.onError}/>
                :<span></span>
              }
                
              </Pop>
            </div>
            <div
              className={styles['sider-menu-first-list']}
              style={{
                height: 'calc(100% - 72px)',
                width: 88,
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              {menus.map((item, index) => (
                <Link
                  className={`${styles['menu-first-link']} ${
                    firstRouterInfo.id == item.id ? styles.active : ''
                  }`}
                  to={'/' + this.props.location.pathname.split('/')[1] + item.path}
                  key={item.id}
                  onClick={this.chnageChildrenMenus.bind(this)}
                >
                  <div className={styles['menu-first-item-content']}>
                    <span className={`iconfont ${item.icon}`} />
                    <div className={styles['menu-first-name']}>{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {pathname === `/${window.storeId}/mall/dashboard` ? null : (
            <div className={styles['page-sider-menu-content-right']}>
              <div className={styles['one-menu-breadcrumbs']}>{firstRouterInfo.name}</div>
              <div style={{ width: 112, height: '100%', overflowX: 'hidden' }}>
                <div className={styles['sider-menu-second-list']}>
                  {childrenMenus.map((item, indx) => (
                    <div className={styles['menu-second-item-group']} key={`${item.id}_${indx}`}>
                      {/* <div className={styles['menu-second-title']}>{item.name}</div> */}
                      {item.menus.map(
                        (childrenItem, index) =>
                          childrenItem.isShow || true ? (
                            <div className={`${styles.link}`} key={`${index}-${childrenItem.id}`}>
                              <Link
                                className={`${twoRouterInfo.id == childrenItem.id ? styles.active : ''} ${twoRouterInfo.id == childrenItem.id ? styles[`color-${secondTextColor}`] : ''}  ${twoRouterInfo.id == childrenItem.id ? styles[`bg-${secondSelectedColor}`] : ''} ${ this.state.hoverId == childrenItem.id ?styles[`hover-${secondSelectedColor}`]:''}`}
                                a={secondTextColor}
                                onMouseEnter={()=>{
                                  this.setState({
                                    hoverId:childrenItem.id
                                  })
                                }}
                                to={
                                  '/' +
                                  this.props.location.pathname.split('/')[1] +
                                  childrenItem.path
                                }
                                key={childrenItem.path}
                              >
                                {childrenItem.name}
                              </Link>
                            </div>
                          ) : null
                      )}
                      {indx == childrenMenus.length - 1 ? null : (
                        <Divider style={{ margin: '12px' }} key={`${indx}p${item}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
