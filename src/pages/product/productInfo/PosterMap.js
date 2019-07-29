import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class PosterMap extends Component {
  render() {
    return <div>商品海报</div>;
  }
}

export default PosterMap;
