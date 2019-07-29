import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Avatar, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './Index.less';
//import { Button } from 'antd/lib/radio';

@connect(({ xcxauth, loading }) => ({
  xcxauth,
  authStoreInfo: xcxauth.authStoreInfo,
  loading: loading.effects['xcxauth/GetPreAuthUrl'],
}))
class Auth extends Component {
  state = {
    resultType: 0,
  };
  componentWillMount() {
    const { dispatch, match } = this.props;
    if (match.params.type) {
      this.setState({
        resultType: match.params.type,
      });
      console.log(match.params.type);
      if (match.params.type == 1) {
        dispatch({
          type: 'xcxauth/GetAuthStoreInfo',
        });
      }
    }
  }
  goAuth = () => {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'xcxauth/GetPreAuthUrl',
      //type:'xcxauth/GoToWeixin',
      callback: {
        success: res => {
          // dispatch({
          //   type: 'xcxauth/GoToWeixin',
          //   payload: {
          //     MpUrl: res.Data.MpUrl,
          //     NotifyUrl: res.Data.NotifyUrl,
          //   },
          // });
          window.location.href = `${res.Data.MpUrl}`;
        },
      },
    });
  };
  removeAuth = () => {
    const { dispatch, match } = this.props;
    // dispatch({
    //   type: 'xcxauth/removeAuth',
    // });
    console.log(window.storeId, '=========');
    router.push(`/${window.storeId}/xcxauth/error/4`);
    if (match.params.type) {
      this.setState(
        {
          resultType: match.params.type,
        },
        () => {
          this.forceUpdate();
        }
      );
    }
  };
  togother = () => {
    // const {dispatch,match}=this.props;
    // dispatch({
    //   type:'xcxauth/removeAuth',
    // })
    this.goAuth();
  };
  render() {
    //const { resultType } = this.state;
    const { loading, authStoreInfo, match } = this.props;
    let resultType = match.params.type;
    const information = (
      <div className={styles.information}>
        <Row>
          <Col span={8} className={styles.label}>
            小程序名称
          </Col>
        </Row>
        <Row style={{ marginBottom: 24 }}>
          <Col span={8} className={styles.label}>
            {authStoreInfo.AppName}
          </Col>
        </Row>
        <Row style={{ marginBottom: 8 }}>
          <Col span={8} className={styles.label}>
            授权店铺信息
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.label}>
            <Card bordered>
              <Row>
                <Col span={3}>
                  <Avatar
                    shape="square"
                    style={{ backgroundColor: '#F0F0F0' }}
                    size={64}
                    src={authStoreInfo.StoreHeadImg}
                  />
                </Col>
                <Col span={21}>{authStoreInfo.StoreName}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        {resultType == 1 ? (
          <Fragment>
            <Button onClick={() => this.togother()}>使用其他小程序授权</Button>
            <Button type="primary" onClick={() => this.removeAuth()}>
              取消
            </Button>
          </Fragment>
        ) : (
          <Button onClick={() => this.goAuth()} loading={loading}>
            立即授权
          </Button>
        )}
      </Fragment>
    );
    const description =
      resultType == 1
        ? '您的小程序已经授权了其他店铺，请先取消上一个店铺的授权，再登录当前店铺进行授权'
        : resultType == 2
          ? '服务器异常，请重新授权'
          : resultType == 3
            ? '本系统仅支持小程序授权，请点击“立即授权”按钮重新进行授权'
            : '';
    const result1 = (
      <Result
        type="error"
        title="授权失败"
        description={description}
        extra={resultType == 1 ? information : ''}
        actions={actions}
        // className={styles.result}
      />
    );
    const actions2 = (
      <Fragment>
        <Button onClick={() => this.goAuth()} loading={loading}>
          立即授权
        </Button>
      </Fragment>
    );
    const result2 = (
      <Result
        type="noAuth"
        //title="授权失败"
        description="授权小程序后方可访问商城"
        // extra={information}
        actions={actions2}
        // className={styles.result}
      />
    );
    return (
      <div>
        <Card>{resultType == 1 || resultType == 2 || resultType == 3 ? result1 : result2}</Card>
      </div>
    );
  }
}

export default Auth;
