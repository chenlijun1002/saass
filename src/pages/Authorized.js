import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import { connect } from 'dva';
import { getToken } from '@/utils/utils';
import Redirect from 'umi/redirect';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);
window.authorization = getToken();

export default class Page extends React.Component {
  // componentWillMount(){
  //     const { dispatch } = this.props;
  //     if (/^\d{12}$/.test(this.props.match.params.storeId)){
  //         dispatch({
  //             type: 'global/getConfigApp',
  //         });
  //     }
  // }
  render() {
    return <div>{this.props.children}</div>;
  }
}

// export default ({ children }) => (
//   <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login" />}>
//     {children}
//   </Authorized>
// );
