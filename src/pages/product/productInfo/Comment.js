import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Comment extends Component {
  render() {
    return <div>客户评价</div>;
  }
}

export default Comment;
