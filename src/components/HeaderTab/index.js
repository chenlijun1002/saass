import React, { Component, Fragment } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Tabs} from 'zent';
import styles from './index.less';
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
  title: 'Product',
  bodyRender: (data) => {
    return (
      <div>{data.item_id}</div>
    );
  }
}, {
  title: 'PV',
  name: 'bro_uvpv',
  width: '200px'
}, {
  title: 'Stock',
  name: 'stock_num',
  width: '100px',
  textAlign: 'center',
  isMoney: true
}, {
  width: '6em',
  title: 'Sales',
  name: 'sold_num'
}];


class Pagination extends React.Component {
  constructor(props) {
    super(props);    
   
  }  
  componentWillMount(){    

  }  
  componentDidMount(){
   
  }
  getId = ()=>{
    const { dispatch, type,activeId, onChange,tabs} = this.props;
    for(let i=0;i<tabs.length;i++){
        if(tabs[i].key===this.props.location.pathname){

        }
    }
  }
  render() {
    const { dispatch, type,activeId, onChange,tabs} = this.props;     
    return (
        <div className={styles.headerTab} style={{position:'absolute'}}>
            <Tabs
            type={type}
            activeId={this.props._this.props.location.pathname}
            onChange={onChange}
            tabs={tabs} />
        </div> 
    );
  }
}


export default connect(({ storenavigation,global, loading }) => ({
    storenavigation,   
  }))(Pagination)