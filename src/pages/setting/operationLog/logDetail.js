import { Modal, Button, Row, Col, Table } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
const namespace = 'oplog';
class LogDetail extends React.Component {
  componentDidMount() {}

  // showModal = () => {
  //     const { dispatch ,detailId} = this.props;
  //     this.setState({
  //         visible: true,
  //     },()=>{
  //         dispatch({
  //           type: `${namespace}/Detail`,
  //           params: {id:detailId},
  //           callback:()=>{
  //               this.forceUpdate()
  //           }
  //         })
  //     });
  // }

  handleOk = () => {
    const { _this } = this.props;
    _this.setState({ loading: true });
    setTimeout(() => {
      _this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    const { _this } = this.props;
    _this.setState({ visible: false }, () => {
      this.forceUpdate();
    });
  };
  render() {
    const columns = [
      {
        title: '字段',
        dataIndex: 'Name',
        key: 'Name',
      },
      {
        title: '修改前',
        dataIndex: 'Old',
        key: 'Old',
      },
      {
        title: '修改后',
        dataIndex: 'New',
        key: 'New',
      },
    ];

    const {
      _this,
      oplog: {
        detail: { Data },
      },
    } = this.props;
    console.log(Data);
    return (
      <div>
        <Modal
          visible={_this.state.visible}
          title="操作详情"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width={640}
        >
          <Row gutter={16} className="xkd-mb16">
            <Col span={10}>
              操作账号:
              {Data ? Data.UserName : ''}{' '}
            </Col>
            <Col span={6}>
              操作模块：
              {Data ? Data.ModuleName : ''}
            </Col>
          </Row>
          <Row>
            <Col className={styles.Modal}>
              <Table
                dataSource={Data ? Data.Descr : null}
                columns={columns}
                scroll={{ y: 300 }}
                rowKey={`${Math.random()}`}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
export default connect(({ oplog, global, loading }) => ({
  oplog,
}))(LogDetail);
