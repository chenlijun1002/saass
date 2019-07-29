import React, { Component } from 'react';
import { connect } from 'dva';
// const Wrapper = WrappedComponent => {
//   @connect(({ global }) => ({}))
//   class WrappedLayout extends Component {
//     state={aa:'00'}
//     componentDidMount() {
//       const { dispatch } = this.props;
//       // if (/^\d{12}$/.test(this.props.match.params.storeId)) {
//       //   dispatch({
//       //     type: 'global/getConfigApp',
//       //   });
//       // }
//     }
//     render() {
//       return <WrappedComponent {...this.props} />;
//     }
//   }

//   return WrappedLayout;
// };
class WrappedLayout extends Component {
  state={aa:'00'}
  componentDidMount() {
    const { dispatch } = this.props;   
    this.props.callback(this.props.children)
  }
  render() {
    return <div></div>
  }
}
export default WrappedLayout;
