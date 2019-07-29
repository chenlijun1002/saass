import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import charts from './../../../assets/charts.png';
import styles from './index.less';

// 统计组件
class Statistical extends Component {
  render() {
    const { Title, Num } = this.props;

    return (
      <Card bordered={true}>
        <Row>
          <Col span={16}>
            <p className={styles.mb8}>{Title}</p>
            <h2 className={styles.h2}>{Num}</h2>
          </Col>
          <Col span={8} className={styles.onRight}>
            <img src={charts} className={styles.mt20} alt="" />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Statistical;
