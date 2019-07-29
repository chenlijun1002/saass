import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class ProductCats extends Component {
  render() {
    return <div>商品类目</div>;
  }
}

export default ProductCats;
