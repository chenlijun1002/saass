import React from 'react';
import { Spin } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import SiderMenu from '@/components/SiderMenu';
import Authorized from '@/utils/Authorized';
import Footer from './Footer';
import pathToRegexp from 'path-to-regexp';
import GlobalHeader from './Header';
import router from 'umi/router';
import Context from './MenuContext';
import { getAuthorityRouters, getAllRouters, getSystemRouters ,getAllMenus} from '@/utils/utils';
import Exception403 from '../pages/system/exception/403';
import layoutConfig from '../../config/layout.config';
import '../global.less';
import styles from './Basic.less';
//import 'zent/css/index.css';
import { Icon } from 'zent';
function formatter(data, parentPath = '', parentAuthority, parentName) {
  return data.map(item => {
    let locale = 'menu';
    if (parentName && item.name) {
      locale = `${parentName}.${item.name}`;
    } else if (item.name) {
      locale = `menu.${item.name}`;
    } else if (parentName) {
      locale = parentName;
    }
    const result = {
      ...item,
      locale,
      authority: item.authority || parentAuthority,
    };
    if (item.routes) {
      const children = formatter(item.routes, `${parentPath}${item.path}/`, item.authority, locale);
      // Reduce memory usage
      result.children = children;
    }
    delete result.routes;
    return result;
  });
}

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};
@connect(({ global,loading }) => ({
  loading:loading.effects['global/getConfigApp'],
  menus: global.menuData,
  stroeLogo: global.oemInfo.stroeLogo,
  showTop: global.showTop,
  topChildren: global.topChildren
}))
//@Wrapper
export default class BasicLayout extends React.PureComponent {
  state = {
    rendering: true,
    isMobile: false,
    menuData: [],
    showTop: true
  };
  componentWillMount() {
    const { dispatch, route: { routes }, location: { pathname } } = this.props;
    let systemRouters = getSystemRouters(routes);
    let isExist = false; //判断路由是否在系统路由存在
    if (/^\d{12}$/.test(this.props.match.params.storeId)) {
      window.storeId = this.props.match.params.storeId;
      systemRouters.forEach(item => {
        let result = pathToRegexp(item).exec(pathname);
        if (result) {
          isExist = true;
        }
      })

      if (!isExist) {
        router.replace({
          pathname: `/exception/404`,
        });
        return false;
      }
      dispatch({
        type: 'global/getConfigApp',
      });
    }
  }
  componentDidMount() {
    const { location: { pathname } } = this.props;
    let dom = document.querySelector(`#layoutRight`);
    window.addEventListener('resize', function () {
      let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      let winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidht;
      if (winWidth < 1440) {
        //document.querySelector(`#layoutRight`).classList.add(`${styles.layoutRight_none}`);
        // document.querySelector(`#layoutContent`).classList.add(`${styles.mr0}`); 
        if (pathname !== `/${window.storeId}/mall/dashboard`) {
          if (dom.classList.contains(`${styles.layoutRight_show}`)) {
            dom.classList.remove(`${styles.layoutRight_show}`);
          }
        }
      } else {
        //document.querySelector(`#layoutRight`).classList.remove(`${styles.layoutRight_none}`);        
        //document.querySelector(`#layoutRight`).classList.add(`${styles.layoutRight_show}`);
        //document.querySelector(`#layoutContent`).classList.remove(`${styles.mr0}`);
      }
    })
    window.addEventListener('hashchange', function () {
      window.scrollTo(0, 0);
    })
  }
  getMenuData() {
    const {
      route: { routes },
    } = this.props;
    return formatter(routes);
  }
  getPageTitle = pathname => {
    return '新云';
  };

  getLayoutStyle = () => {
    const { isMobile } = this.state;
    const { fixSiderbar, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  getContentStyle = () => {
    const { fixedHeader, location: { pathname } } = this.props;
    return {
      margin: '16px 16px 0',
      marginRight: pathname === `/${window.storeId}/mall/dashboard` ? 16 : 200,
      paddingTop: fixedHeader ? 64 : 0,
      paddingBottom: this.getFooterLayout() ? 80 : 0
    };
  };
  toggle = () => {
    document.querySelector(`#layoutRight`).classList.add(`${styles.layoutRight_show}`);
  }
  close = () => {
    document.querySelector(`#layoutRight`).classList.remove(`${styles.layoutRight_show}`);
  }
  getTopLayout = () => {
    let config = layoutConfig.hideTop;
    const { location: { pathname } } = this.props;
    let index = config.findIndex((item) => pathname === `/${window.storeId}${item}`);
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }
  getFooterLayout = () => {
    let config = layoutConfig.hideFooter;
    const { location: { pathname } } = this.props;
    let index = config.findIndex((item) => pathname === `/${window.storeId}${item}`);
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }
  getMenuLayout = () => {
    let config = layoutConfig.hideMenu;
    const { location: { pathname } } = this.props;
    let index = config.findIndex((item) => pathname === `/${window.storeId}${item}`);
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const {
      children,
      location: { pathname },
      menus,
      showTop,
      route: { routes },
      topChildren,
      loading
    } = this.props;
    const layout = (
      <Spin spinning={loading}>
      <div style={{ position: 'relative', minHeight: '100vh', flexDirection: 'row', display: "flex", flex: "auto", background: "#f0f2f5", boxSizing: "border-box" }}>
        <SiderMenu {...this.props} />
        <div
          style={{
            // ...this.getLayoutStyle(),           
            flexDirection: 'column',
            display: "flex",
            flex: "auto",
            background: "#f0f2f5",
            boxSizing: "border-box",
            minHeight: '100vh',
            marginLeft: pathname === `/${window.storeId}/mall/dashboard` ? 72 : 184,
            // marginRight:184,
            minWidth: "1040px"
          }}
        >
          {this.getTopLayout() ? null : <GlobalHeader {...this.props} toggle={this.toggle} topChildren={topChildren} />}
          <div style={this.getContentStyle()} className={styles.layoutContent}>
            <Authorized
              AuthorityRouters={getAllMenus(menus,this.props.match.params.storeId)}
              allRouters={getSystemRouters(routes)}  //获取所有路由
              currentRouter={this.props.location.pathname}
              noMatch={<Exception403 />}
            >
              {children}
            </Authorized>
          </div>
          {
            this.getFooterLayout() ? null :
              <Footer />
          }
          {/* <div className={styles.bottomOpration}></div>           */}
        </div>
        {
          this.getTopLayout() ? null :
            <div
              className={styles.layoutRight}
              id="layoutRight"
            >
              <div className={styles.help}>
                帮助和服务
             <Icon type="close" className={styles.close} onClick={this.close} />
              </div>
            </div>
        }
      </div>
      </Spin>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
      </React.Fragment>
    );
  }
}
