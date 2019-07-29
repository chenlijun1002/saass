import React, { Component } from 'react';

class Statistical extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Row gutter={16} className={styles.cardList}>
                <Col span={8}>
                    <Card bordered={true}>
                        <Row>
                            <Col span={12}>
                                <p className={styles.mb8}>已上传视频数（个）</p>
                                {
                                    this.props.videoList.OverView.Msg
                                }
                                <h2>{this.props.videoList.OverView ? this.props.videoList.OverView.VideoNum : 0}</h2>
                            </Col>
                            <Col span={12} className={styles.onRight}>
                                <img src={charts} className={styles.mt20} alt="" />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={true}>
                        <Row>
                            <Col span={12}>
                                <p className={styles.mb8}>已购时长（分钟）</p>
                                <h2>{this.props.videoList.OverView ? this.props.videoList.OverView.AlreadyBuyTime : 0}</h2>
                            </Col>
                            <Col span={12} className={styles.onRight}>
                                <img src={charts} className={styles.mt20} alt="" />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={true}>
                        <Row>
                            <Col span={6}>
                                <Progress strokeLinecap="square" showInfo={false} type="circle" strokeColor={'#2E74FF'} percent={percent} />
                            </Col>
                            <Col span={12}>
                                <p className={styles.mg8}><span className={styles.square}></span>剩余{this.props.videoList.OverView ? this.props.videoList.OverView.RemainUsedTime : 0}分钟</p>
                                <p className={styles.lh24}><span className={styles.square}></span>已用{this.props.videoList.OverView ? this.props.videoList.OverView.AlreadyUsedTime : 0}分钟</p>
                            </Col>
                            <Col span={6} className={styles.onRight}>
                                <Button className={styles.mt20}>加购</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Statistical;
