import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Avatar, Button, Icon, Radio, Tag,Spin } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './success.less';
const RadioButton = Radio.Button;
function jiequ(arr,n) {
        var num = n;//一个数组里面的元素个数
       // var arr = [1,2,3,4,5,6,7,8,9,10];
        if(arr&&arr.length){
          var Arr = new Array(Math.ceil(arr.length/num));
          for(var i = 0; i<Arr.length;i++){
          Arr[i] = new Array();
          for(var j = 0; j<num; j++){
          Arr[i][j] = '';
          }
          }
          for(var i = 0; i<arr.length;i++){
            Arr[parseInt(i/num)][i%num] = arr[i]; 
          } 
          return Arr
        }
        return []
        
}
@connect(({ xcxauth, loading }) => ({
  xcxauth,
  authInfo: xcxauth.authInfo,
  loading: loading.effects['xcxauth/GetAuthInfo'],
}))
class AuthSuccess extends Component {
  state={
    isAuth:true
  }
  componentWillMount() {
    const { dispatch } = this.props;
    let that=this;
    dispatch({
      type: 'xcxauth/GetAuthStatus',
      callback: {
        success: res => {
          console.log(res, 777);
          if (res.Code == 0) {
            dispatch({
              type: 'xcxauth/GetAuthInfo',
            });
          } else {
            that.setState({
              isAuth:false
            })
           // router.push('/100000000001/xcxauth/error/4');
          }
        },
      },
    });
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
  reload = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'xcxauth/GetAuthInfo',
    });
  };
  render() {
    const {
      authInfo,
      authInfo: { Permission: authList },
      loading,
    } = this.props;
    //console.log(authInfo,789)
    //const {authList:{Permission}} =authInfo;
    console.log(authList);
    const newlist=jiequ(authList,2);
    return (
      <Fragment>
        { 
          this.state.isAuth?
          <Spin spinning={loading}>
          <Card title={'授权信息'}>
                <Row>
                  <Col style={{ marginBottom: 10 }}>
                    <Row>
                      <Col span={3} style={{ textAlign: 'right' }}>
                        <span>小程序名称：</span>
                      </Col>
                      <Col span={21} style={{ textAlign: 'left' }}>
                        <span>{authInfo.AppName}</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginBottom: 10 }}>
                    <Row>
                      <Col span={3} style={{ textAlign: 'right' }}>
                        <span>小程序AppId：</span>
                      </Col>
                      <Col span={21} style={{ textAlign: 'left' }}>
                        <span>{authInfo.AppId}</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginBottom: 10 }}>
                    <Row>
                      <Col span={3} style={{ textAlign: 'right' }}>
                        <span>服务范围：</span>
                      </Col>
                      <Col span={21} style={{ textAlign: 'left' }}>
                        <span>{authInfo.CatesDescr}</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginBottom: 10 }}>
                    <Row>
                      <Col span={3} style={{ textAlign: 'right' }}>
                        <span>认证信息：</span>
                      </Col>
                      <Col span={21} style={{ textAlign: 'left' }}>
                        <span>{authInfo.VerifyType}</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginBottom: 10 }}>
                    <Row>
                      <Col span={3} style={{ textAlign: 'right' }}>
                        <span>发布状态：</span>
                      </Col>
                      <Col span={21} style={{ textAlign: 'left' }}>
                        <span>{authInfo.StatuName}</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>        
          </Card>
          <Card title={'已授权权限'} style={{marginTop:24}}>                         
            {newlist && newlist.length
              ? newlist.map((item, index) => {
                  return (
                    <Row style={{marginBottom: 10}} key={index} >
                    {
                      item.map((v,i)=>{
                        return (
                          <Col key={i} span={12}>
                            <Tag
                              style={{
                                color: v.Auth ? '#2E74FF' : '#BFBFBF',
                                border: v.Auth ? '1px solid #2E74FF' : '1px solid #BFBFBF',
                              }}
                            >
                              {v.Auth ? '已授权' : '未授权'}
                            </Tag>
                            <span>{v.Name}</span>
                          </Col>
                        )
                      })
                    } 
                    </Row>
                  );
                })
              : null}                          
          </Card>
          <Fragment>
          <div className="xkd-bottom-actions">
            <Button onClick={() => this.reload()} loading={loading} >
                  刷新小程序信息
                </Button>
                <Button onClick={() => this.goAuth()} loading={loading} style={{marginLeft:10}}>
                  重新授权
                </Button>      
          </div>
              {/* <div style={{textAlign:'center',marginTop:24}}>
              <Button onClick={() => this.reload()} loading={loading} >
                刷新小程序信息
              </Button>
              <Button onClick={() => this.goAuth()} loading={loading} style={{marginLeft:10}}>
                重新授权
              </Button>
              </div> */}
            </Fragment>
          </Spin>  
          :
          <Fragment>
             <div className="xkd-bottom-actions">              
                  <Button onClick={() => this.goAuth()} loading={loading}>
                  立即授权
                </Button>      
            </div>           
          </Fragment> 
        }                  
      </Fragment>
    );
  }
}

export default AuthSuccess;
