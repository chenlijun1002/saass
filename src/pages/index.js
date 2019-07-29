import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';


@connect(({ global }) => ({ oemInfo: global.oemInfo }))
export default class Routers extends React.Component {
  render() {
    debugger;
    let storeId = this.props.location.pathname.split('/')[1];
    if (this.props.oemInfo.defaultIndex)
      router.push(`/${storeId}${this.props.oemInfo.defaultIndex.toLowerCase()}`);
    // return <div>{this.props.children || index}</div>;
  }
}
