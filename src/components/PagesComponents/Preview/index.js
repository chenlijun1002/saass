import React, { Component } from 'react';
import { Card, Row, Col, Progress, Button } from 'antd';
import styles from './index.less';

// 预览组件
class Preview extends Component {
  render() {
    const { Percent, Residue, Used, ButtonValue } = this.props;

    return (
      <Card bordered={true}>
        <Row>
          <Col span={6}>
            <Progress
              strokeLinecap="square"
              showInfo={false}
              type="circle"
              strokeColor={'#2E74FF'}
              percent={Percent}
            />
          </Col>
          <Col span={12}>
            <p className={styles.mg8}>
              <span className={styles.square} />
              剩余
              {Residue}
            </p>
            <p className={styles.lh24}>
              <span className={styles.square} />
              已用
              {Used}
            </p>
          </Col>
          <Col span={6} className={styles.onRight}>
            <Button
              className={styles.mt20}
              onClick={() => {
                console.log(`${ButtonValue}`);
              }}
            >
              {ButtonValue}
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Preview;
