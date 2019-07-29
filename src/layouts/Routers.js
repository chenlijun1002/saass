import React from 'react';
import router from 'umi/router';
console.log('app_type', APP_TYPE);
if (APP_TYPE === 'fat' || APP_TYPE === 'pro') {  
  // || APP_TYPE === ''
  window.console.log = function(a) {};
}

export default class Routers extends React.Component {
  componentWillMount() {
    let oneRouter = this.props.location.pathname.split('/')[1];
    if (!/^\d{12}$/.test(oneRouter) && oneRouter != 'exception') {
      router.push('/exception/404');
      return false;
    } else {
      window.storeId = this.props.location.pathname.split('/')[1];
    }
  }
  render() {
    return { ...this.props.children };
  }
}
