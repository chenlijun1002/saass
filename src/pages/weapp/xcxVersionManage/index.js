import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Button, Divider, message, Modal,Form,Input } from 'antd';
import moment from 'moment';
//import NumberInfo from '@/components/NumberInfo';
//import QRcode from '@/components/QRcode';
import styles from './index.less';
const FormItem=Form.Item;
const QRCode = require('qrcode.react');
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
const HandleForm = props => {
  const {  _this } = props;
  const { versionInfo ,form,dispatch} = _this.props;
  const { getFieldDecorator, getFieldValue,setFieldValue }=form;
  const {qrurl}=_this.state;
 // let path = versionInfo && versionInfo.Debug ? versionInfo.Debug.Url : null;
  const { modalVisible, modalFooter, type } = _this.state;
  const okHandle = () => {
    if (type == 1) {
      dispatch({
        type: 'xcxversionmanage/UndocodeAudit',
        payload:{
          id:versionInfo.Debug.AuditId
        },
        callback: {
          success: (res) => {
            if(res.Code==0){
              message.success('撤销成功');
            handleModalVisible();
            setTimeout(()=>{
              dispatch({
                type: 'xcxversionmanage/GetVersionInfo',
              }); 
            },1500)
            }else{
              message.error(res.Msg);
            }
          },
        },
      });
    } else if(type==3) {
      form.validateFieldsAndScroll((err, values) => {
        if (err) return;
        dispatch({
          type: 'xcxversionmanage/BindTester',
          payload:{
            wechartId:values.wechartId
          },
          callback: {
            success: (res) => {
              if(res.Code==0){
                message.success('绑定成功');
              handleModalVisible();
              }else{
                message.error(res.Msg);
              }
            },
          },
        });
      })      
    }else{
      handleModalVisible();
    }
  };
  const handleModalVisible = () => {
    _this.setState({
      modalVisible: false,
    });
    if(type==3){
      setFieldValue({
        wechartId:''
      })
    }
  };
  const bind=(
    <Form style={{ marginTop: 8 }} >            
            <FormItem {...formItemLayout} hideRequiredMark label="微信号">
              {getFieldDecorator('wechartId', {
                 rules: [
                   { required: true, message: '请输入微信号'}],
              })(<Input placeholder="请输入微信号" style={{ width: '100%' }} />)}
            </FormItem>
    </Form>                                                
  );
  const repeal =(
    <div>
      <p>每天最多可撤销一次，每月最多可撤销10次。确定撤销该版本？</p>
     </div> 
  );
  return (
    <Modal
      title={type == 1 ? '撤销' : type==2?'预览':'绑定体验者'}
      visible={modalVisible}
      onCancel={handleModalVisible}
      onOk={okHandle}
      cancelText="关闭"
       className={`${type==2?styles.preview:''}`}
    >
      {/* {type == 1 ? '确定撤销该版本？' : <QRcode QR_path={path} />} */}
      
  {type==1?repeal:type==2?(<div style={{textAlign:'center',padding: "0 86px"}}>{qrurl?<QRCode size={300} value={qrurl||'ww'}/>:null}</div>):type==3?bind:null}
    </Modal>
  );
};
@connect(({ xcxversionmanage, loading }) => ({
  xcxversionmanage,
  versionInfo: xcxversionmanage.versionInfo,
  loading: loading.effects['xcxversionmanage/GetVersionInfo'],
  updateLoading:loading.effects['xcxversionmanage/Commit'],
  ReleaseLoading:loading.effects['xcxversionmanage/Release'],
  SubmitForAuditLoading:loading.effects['xcxversionmanage/SubmitForAudit'],
  repealLoading:loading.effects['xcxversionmanage/UndocodeAudit'],
  loadingWxaCode:loading.effects['xcxversionmanage/GetWxaCode'],
}))
@Form.create()
export default class Analysis extends Component {
  state = {
    salesType: 'all',
    type:'',
    currentTabKey: '',
    modalVisible: false,
    qrurl:'',
    status:1,
    QRurl:''
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'xcxversionmanage/GetVersionInfo',
    });   
  }
  preview = (type) => {
    const { versionInfo } = this.props;
    if(type==1){
      this.setState({
        qrurl:`https://open.weixin.qq.com/sns/getexpappinfo?appid=${versionInfo.Development.QrCode}&iswxtpa=1#wechat-redirect`,
      })
    }else{
      this.setState({
        qrurl:`https://open.weixin.qq.com/sns/getexpappinfo?appid=${versionInfo.Debug.QrCode}&iswxtpa=1#wechat-redirect`,
      })
    }    
    this.show(2);
  };
  //立即发布
  Release = () =>{
    const { versionInfo, dispatch } = this.props;
    dispatch({
      type: 'xcxversionmanage/Release',
      callback: {
        success: (res) => {
          
          if(res.Code==0){
            message.success('发布成功');
          setTimeout(()=>{
            dispatch({
              type: 'xcxversionmanage/GetVersionInfo',
            }); 
          },1500)
           }else{
            message.error(res.Msg);
           }
        },
      },
    });
  }
  //立即更新//上传代码
  update = () => {
    const { versionInfo, dispatch } = this.props;
    dispatch({
      type: 'xcxversionmanage/Commit',
      payload:{
        templateId:versionInfo.Development.TemplateId
      },
      callback: {
        success: (res) => {         
          if(res.Code==0){
            message.success('更新成功');
            setTimeout(()=>{
              dispatch({
                type: 'xcxversionmanage/GetVersionInfo',
              }); 
            },1500)
           }else{
            message.error(res.Msg);
           }
        },
      },
    });   
  };
  //提交审核
  SubmitForAudit = () =>{
    const { versionInfo, dispatch } = this.props;
    dispatch({
      type: 'xcxversionmanage/SubmitForAudit',
      callback: {
        success: (res) => {                 
          if(res.Code==0){
            message.success('提交审核成功');
            setTimeout(()=>{
              dispatch({
                type: 'xcxversionmanage/GetVersionInfo',
              }); 
            },1500)
           }else{
            message.error(res.Msg);
           }
        },
      },
    });
  }
  //撤销审核
  repeal = () => {
    const { versionInfo, dispatch } = this.props;
    // this.setState({
    //   type:1
    // },()=>{
    //   this.show(1);
    // })  
    this.show(1);  
    console.log(versionInfo.Debug);
  };
  //绑定体验者
  BindTester = ()=>{
    const { versionInfo, dispatch } = this.props;
    this.show(3);
    // dispatch({
    //   type: 'xcxversionmanage/BindTester',
    //   callback: {
    //     success: (res) => {
    //       if(res.Code==0){
    //         message.success('绑定成功');
    //       }else{
    //         message.error(res.Msg);
    //       }
    //     },
    //   },
    // });
  }
  //更新小程序码
  GetWxaCode = ()=>{
    const { versionInfo, dispatch } = this.props;
    dispatch({
      type: 'xcxversionmanage/GetWxaCode',
      callback: {
        success: (res) => {
         if(res.Code==0){
          message.success('更新小程序码成功');
          this.setState({
            QRurl:res.Data.ImgUrl
          })
          // setTimeout(()=>{
          //   dispatch({
          //     type: 'xcxversionmanage/GetVersionInfo',
          //   }); 
          // },1500)
         }else{
          message.error(res.Msg);
         }
        },
      },
    });
  }
  show = type => {
    this.setState({
      type,
      modalVisible: true,
    });
  };
  render() {
    const { xcxversionmanage, versionInfo,loadingWxaCode, loading,updateLoading,ReleaseLoading,SubmitForAuditLoading,repealLoading } = this.props;
    //const {status} = this.state;
    console.log(versionInfo);
    const node1 = (
      <span style={{ color: '#BFBFBF' }}>
        如果您还不是体验者，请先前往公众平台设置。
        <a>查看帮助</a>
      </span>
    );
    const node2 = <span style={{ color: '#BFBFBF' }}>自动发布失败原因自动发布失败原因</span>;
    const btn = <Button>体验者预览</Button>;
    return (
      <Fragment>
        <Card loading={loading} bordered={false} >
          <Row gutter={24}>
            <Col md={8} sm={12} xs={24} offset={8} style={{ textAlign: 'center' }}>             
              <div>
                <p ><span className={styles.versionTitle}>线上版本</span></p>
                {
                  versionInfo&&versionInfo.Release&&versionInfo.Release.Version?(
                    <p 
                      style={{
                        fontSize:48,                    
                        lineHeight:"22px",
                        color:'#262626',
                        margin:'24px 0 32px 0'
                      }}
                    >
                       {versionInfo.Release.Version}
                    </p>
                  ):(<p style={{fontSize:'14px',color:'#999',marginBottom:24}}>—— 尚未提交线上版本 ——</p>)
                }
                {
                  versionInfo&&versionInfo.Release&&versionInfo.Release.CreateTime?
                  (<p style={{color:'#595959'}}>于{versionInfo.Release.CreateTime.substr(0,versionInfo.Release.CreateTime.indexOf('.')).replace('T',' ')}更新成功。</p>):null
                }
                {
                  versionInfo&&versionInfo.Release?
                  (
                    <Fragment>
                    <div style={{textAlign:'center',position:'relative'}} className={styles.maskBox}>
                      {
                        versionInfo&&versionInfo.Release&&versionInfo.Release.QrCodeUrl?
                        // (<QRCode size={150} value={this.state.QRurl||versionInfo.Release.QrCodeUrl}/>):null
                      (<img style={{width:150}} src={this.state.QRurl||versionInfo.Release.QrCodeUrl}/>):null 
                      }
                      <div className={styles.mask}><Button type="primary" className={styles.button} onClick={() => this.GetWxaCode()} style={{ marginTop:20 }} loading={loadingWxaCode}>刷新</Button></div>
                    </div>                    
                    </Fragment>
                  ):null
                }                
              </div>
            </Col>
          </Row>          
          {
            versionInfo&&versionInfo.Debug?
            (
              <Fragment>
                <Divider dashed={true} />
                <Row gutter={24}>
                  <Col  style={{ textAlign: 'center' }}>              
                    <Row gutter={24}>
                      <Col md={8} sm={12} xs={24} offset={8}>
                        <div>
                          <p >
                            <span className={styles.versionTitle}>
                            {versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='审核中'?'审核版本':versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='审核失败'||versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='撤回'?'待审核版本':versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='发布失败'?'待发布版本':'当前最新版本'}
                            </span>
                          </p>
                          <p 
                            style={{
                              fontSize:48,                    
                              lineHeight:"22px",
                              color:'#262626',
                              margin:'24px 0 32px 0'
                            }}
                          >
                            {versionInfo.Debug.Version}
                          </p>
                          {
                            versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='发布失败'||versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='审核中'||versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='审核失败'?
                            (<p style={{color:'#bfbfbf'}}>于{versionInfo.Debug.CreateTime}提交审核。<a onClick={()=>this.BindTester()}>添加体验者</a></p>):null
                          }
                        </div>
                      </Col>
                    </Row> 
                    <Row>
                      <Col>
                        <div
                          style={{
                            width:850,
                            height:90,
                            background:"rgba(250,250,250,1)",
                            margin:'0 auto',
                            padding:'24px 40px',
                            color:'#595959'
                          }}
                        >
                          {
                            versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='待审核'?
                            (<span style={{display:'block',textAlign:'left'}}>
                              小程序更新上传成功，请点击“提交审核”按钮，提交至微信官方进行审核；建议提交审核前先点击“版本预览”按钮进行预 览，如果您没有体验权限，请
                              <a>添加体验者</a>
                            </span>):
                            versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='审核中'?
                              (
                                <span>
                                  已提交至微信官方进行审核，大概需要1-7个工作日，请耐心等待
                                </span>
                              ):
                              versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='审核失败'?
                              (
                                <span>
                                  {versionInfo.Debug.Reason}
                                </span>
                              ):
                              versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='撤回'?
                              (
                                <span>
                                  主动撤回
                                </span>
                              ):
                              versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='发布失败'?
                              (
                                <span>
                                  {versionInfo.Debug.Reason}
                                </span>
                              ):null
                          }
                        </div>
                      </Col>
                    </Row> 
                    <Row>
                      <Col style={{ textAlign: 'center',marginTop:24 }}>
                        <Button onClick={() => this.preview()} style={{ marginRight:20 }}>版本预览</Button>
                        {
                          versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='待审核'?
                        (<Button onClick={() => this.SubmitForAudit()} loading={SubmitForAuditLoading}>提交审核</Button>):
                        versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='审核中'?
                        (<Button onClick={() => this.repeal()} loading={repealLoading}>撤销审核</Button>):
                        versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='审核成功'||versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='发布失败'?
                          (<Button onClick={() => this.Release()} loading={ReleaseLoading}>立即发布</Button>):
                          versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='撤回'||versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='审核失败'?
                          (<Button onClick={() => this.SubmitForAudit()} loading={SubmitForAuditLoading}>重新审核</Button>):null
                        }                  
                      </Col>
                    </Row> 
                  </Col>
                </Row>
               </Fragment> 
            ):null
          }
          {
            versionInfo&&versionInfo.Development&&(versionInfo.Development.HasNew||versionInfo.Development.StatuName==='审核失败')?
            (
              <Fragment>
                <Divider dashed={true} />               
                <Row gutter={24}>
                  <Col  style={{ textAlign: 'center' }}>              
                    <Row gutter={24}>
                      <Col md={8} sm={12} xs={24} offset={8}>
                        <div>
                          <p ><span className={styles.versionTitle}>{versionInfo&&versionInfo.Development&&versionInfo.Development.StatuName==='上传成功'?'当前最新版本':'开发版本'}</span></p>
                          <p 
                            style={{
                              fontSize:48,                    
                              lineHeight:"22px",
                              color:'#262626',
                              margin:'24px 0 32px 0'
                            }}
                          >
                            {versionInfo.Development.Version}
                          </p>                                                  
                        </div>
                      </Col>
                    </Row> 
                    <Row>
                      <Col>                                              
                        {
                            versionInfo&&versionInfo.Development&&versionInfo.Development.StatuName==='上传成功'?
                            (<div
                              style={{
                                width:850,
                                height:90,
                                background:"rgba(250,250,250,1)",
                                margin:'0 auto',
                                padding:'24px 40px',
                                color:'#595959'
                              }}
                            >
                             <span style={{display:'block',textAlign:'left'}}>
                                  小程序更新上传成功，请点击“提交审核”按钮，提交至微信官方进行审核；建议提交审核前先点击“版本预览”按钮进行预览，如果您没有体验权限，请
                                  <a onClick={()=>this.BindTester()}>添加体验者</a>
                                </span>
                            </div>):
                            null
                          }
                      </Col>
                    </Row> 
                    <Row>
                      <Col style={{ textAlign: 'center',marginTop:24 }}>
                      {
                          versionInfo&&versionInfo.Development&&versionInfo.Development.StatuName==='待升级'||versionInfo&&versionInfo.Development&&versionInfo.Development.StatuName==='待上传'?
                          (<Button onClick={() => this.update()} disabled={versionInfo&&versionInfo.Debug&&versionInfo.Debug.StatuName==='审核中'?true:false} loading={updateLoading}>
                          立即更新
                          </Button>):null
                        }                        
                        {
                          versionInfo&&versionInfo.Development&&versionInfo.Development.StatuName==='上传成功'?
                        (
                          <Fragment>
                          <Button onClick={() => this.preview(1)} style={{ marginRight:20 }}>版本预览</Button>
                          <Button onClick={() => this.SubmitForAudit()} loading={SubmitForAuditLoading}>提交审核</Button>
                        </Fragment>
                      ):
                        versionInfo&&versionInfo.Development&&versionInfo.Development.StatuName==='审核中'?
                        (<Button onClick={() => this.repeal()} loading={repealLoading}>撤销审核</Button>):
                        versionInfo&&versionInfo.Development&&versionInfo.Development.StatuName==='审核成功'||versionInfo&&versionInfo.Development&&versionInfo.Development.StatuName==='发布失败'?
                          (<Button onClick={() => this.Release()} loading={ReleaseLoading}>立即发布</Button>):
                          versionInfo&&versionInfo.Development&&versionInfo.Development.StatuName==='审核失败'?
                          (<Button onClick={() => this.SubmitForAudit()} loading={SubmitForAuditLoading}>重新审核</Button>):null
                        }                  
                      </Col>
                    </Row> 
                  </Col>
                </Row>
              </Fragment>
            ):null
          }
        </Card>
        <HandleForm _this={this} />
      </Fragment>
    );
  }
}
