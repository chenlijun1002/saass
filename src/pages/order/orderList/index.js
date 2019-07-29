import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import router from 'umi/router';
import { Card } from 'antd';
import HeaderTab from '@/components/HeaderTab'
import Divider from '@/components/Divider'
import Develop from '@/components/DevelopmentPage'
import styles from './index.less'
const datasets = [{
  item_id: '5024217',
  bro_uvpv: '0/0',
  stock_num: '60',
  sold_num: 0,
}, {
  item_id: '5024277',
  bro_uvpv: '0/0',
  stock_num: 59,
  sold_num: 0,
}, {
  item_id: '13213123',
  bro_uvpv: '0/0',
  stock_num: 159,
  sold_num: 0,
}];

const columns = [{
  title: '页面名称',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: 'pv（页面访问量）',
  name: 'bro_uvpv',
  textAlign: 'right',
  width: '15%'
}, {
  title: 'uv（独立访客数）',
  name: 'stock_num',
  width: '15%',
  textAlign: 'right',
  //isMoney: true
}, {    
    title: '操作',
    width: '25%', 
  name: 'sold_num',
  bodyRender: (data) => {
    return (
      <div>
          <span className={`${styles.brandColor} ${styles.pointer}`}>设为主页</span>
          <Divider type="vertical"/>
          <span className={`${styles.brandColor} ${styles.pointer}`} onClick={()=>this.editPage(1)}>编辑</span>
          <Divider type="vertical"/>
          <span className={`${styles.brandColor} ${styles.pointer}`}>预览</span>
      </div>
    );
  }
}];


class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      current: 0,
      total: 101,
      maxPageToShow: 8,
      pageSize: 20,
     // activeId:`${this.props.location.pathname}`,
      tabs: [{
        title: '全部',
        key: `/${window.storeId}/order/list/all`,
       // disabled: true
      }, {
        title: '待付款',
        key:  `/${window.storeId}/order/list/waitpay`
      },{
        title: '代发货',
        key:  `/${window.storeId}/order/list/waitdelivery`
      },{
        title: '已发货',
        key:  `/${window.storeId}/order/list/delivered`
      },{
        title: '已完成',
        key:  `/${window.storeId}/order/list/success`
      },{
        title: '已关闭',
        key:  `/${window.storeId}/order/list/closed`
      },{
        title: '退款中',
        key:  `/${window.storeId}/order/list/refunding`
      }]
    };
  }
  componentWillMount(){
    const { dispatch, form } = this.props;           
  }

  onChange = (data)=> {
    console.log(data);
    this.setState({
      current: data.current,
      pageSize: data.pageSize,
    });
  }
  onTabChange=(id)=> {
      console.log(id,router,'=========')
    this.setState({
      activeId: id
    },()=>{
        router.replace({
            pathname: `${id}`
        })
        // if(id==1){
        //     router.replace({
        //         pathname: `/${window.storeId}/store/pages`
        //     })
        // }else{
        //     router.replace({
        //         pathname: `/${window.storeId}/store/pages/draft`
        //     })
        // }
    });

  }

  render() {
    return (
        <Fragment>
        <HeaderTab 
                _this={this}
                type="slider"
                activeId={this.state.activeId}
                onChange={this.onTabChange}
                tabs={this.state.tabs}
            >
        {/* <Tabs
            type="slider"
            activeId={this.state.activeId}
            onChange={this.onTabChange}
            tabs={this.state.tabs} /> */}
         
        </HeaderTab> 
        
        <Card>  
            <Develop/>
        </Card>
        </Fragment>
    );
  }
}


export default connect(({ storenavigation,global, loading }) => ({
    storenavigation,   
  }))(Pagination)