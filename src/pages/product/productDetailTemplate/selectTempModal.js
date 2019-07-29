import React, { Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Modal,Row,Col,Radio } from 'antd';
import styles from './tempModal.less';

const RadioGroup = Radio.Group;
export default class TemplateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      specificationsType: 1, 
      detailType:1,   
    };        
  }
  componentDidMount() {
    const { onRef } = this.props;
    onRef(this);   
  }

  showModal = () => {
    this.setState({
        visible:true
    })
  };

  hideModal = () => {
    this.setState({
        visible:false
    })
  }

  onChangeSpecifications = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
        specificationsType: e.target.value,
    });
  }

  onChangeDetail = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
        detailType: e.target.value,
    });
  }

  comfirm = () => {
    router.push(`/${window.storeId}/goods/detailtemplates/add`)
  }

  render() {    
    const { templateList } = this.props;  
    const { visible } = this.state;
    return (
      <Modal
        title={'选择模板样式'}
        width={960}
        visible={visible}
        onCancel={this.hideModal}
        onOk={this.comfirm}
      >  
        <Row className="xkd-mb16">
            <Col span={4}>
                <div className={styles.lineHeight80}>商品规格</div>
            </Col>
            <Col span={20}>
                <Row gutter={16}>
                    <Col span={12}>
                        <img src={'https://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/mchfile/100000000001/image/03a4b55ec1c348d7982eb38ecdf14d85.jpg'} className="xkd-width-per-100"/>
                    </Col>
                    <Col span={12}>
                        <img src={'https://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/mchfile/100000000001/image/03a4b55ec1c348d7982eb38ecdf14d85.jpg'} className="xkd-width-per-100"/>
                    </Col>
                </Row> 
                <RadioGroup onChange={this.onChangeSpecifications} value={this.state.specificationsType} className={styles.RadioGroup}>
                    <Row>
                        <Col span={12}>
                            <Radio value={1}>折叠规格版</Radio>            
                        </Col>
                        <Col span={12}>               
                            <Radio value={2}>展开规格版</Radio>  
                        </Col>
                    </Row>         
                </RadioGroup>
            </Col>
        </Row>
        <Row>
            <Col span={4}>                
                <div className={styles.lineHeight80}>商品详情</div>
            </Col>
            <Col span={20}>
                <Row gutter={16}>
                    <Col span={12}>
                        <img src={'https://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/mchfile/100000000001/image/03a4b55ec1c348d7982eb38ecdf14d85.jpg'} className="xkd-width-per-100"/>
                    </Col>
                    <Col span={12}>
                        <img src={'https://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/mchfile/100000000001/image/03a4b55ec1c348d7982eb38ecdf14d85.jpg'} className="xkd-width-per-100"/>
                    </Col>
                </Row>   
                <RadioGroup onChange={this.onChangeDetail} value={this.state.detailType} className={styles.RadioGroup}>
                    <Row>
                        <Col span={12}>
                            <Radio value={1}>折叠详情版</Radio>            
                        </Col>
                        <Col span={12}>               
                            <Radio value={2}>展开详情版</Radio>  
                        </Col>
                    </Row>         
                </RadioGroup>
            </Col>
        </Row>
      </Modal>
    );
  }
}
