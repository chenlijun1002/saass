import { Modal, Button, message, Row, Col } from 'antd';
import React from 'react';
import MultiCrops from 'react-multi-crops';
import SelectPath from '@/components/plugins/selectPath/index';
import styles from './index.less';
import PropTypes from 'prop-types';

export default class EditHotAreaModal extends React.Component {
  static propTypes = {
    // onRef: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // pageName: '',
      coordinates: [],
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  showEditModal = () => {
    const { data, index } = this.props;
    this.setState({
      visible: true,
      coordinates: data[index].hotData,
    });
  };

  editHotAreaModal = ref => {
    this.editHotAreaModal = ref;
  };

  hideEditModal = () => {
    this.setState({
      visible: false,
    });
  };

  changeCoordinate = (coordinate, index, coordinates) => {
    this.setState({
      coordinates,
    });
  };

  // 删除时
  deleteCoordinate = (coordinate, index, coordinates) => {
    this.setState({
      coordinates,
    });
  };

  // 选择路径
  selectPath = record => {
    const { coordinates, index } = this.state;
    coordinates[index].PageName = record.PageName;
    coordinates[index].PagePath = record.PagePath;
    this.setState({
      pagePathModalVisible: false,
    });
  };
  selectRef = ref => {
    this.selectPathModal = ref;
  };

  // 点击打开链接modal
  showSelectPathModal = arr => {
    this.setState({
      // pagePathModalVisible: true,
      index: arr,
    });
    this.selectPathModal.showModal();
  };

  // 保存
  clickSubmit = () => {
    let pageName = '';
    const { coordinates } = this.state;
    const { clickEditHotAreaButton } = this.props;
    coordinates.forEach(item => {
      if (!item.PageName) {
        pageName = true;
      }
    });
    if (pageName) {
      message.error('请添加关联链接', 2);
      return false;
    }
    clickEditHotAreaButton(coordinates);
    this.hideEditModal();
  };

  render() {
    const topNav = ['添加热区', '调整热区大小和位置', '设置关联链接', '保存生效'];
    const { visible } = this.state;
    return (
      <div>
        <Modal
          title="绘制热区"
          visible={visible}
          onOk={this.hideEditModal}
          onCancel={this.hideEditModal}
          footer={null}
          width={640}
          className={styles.modal}
          maskClosable={false}
        >
          <div>
            <div className={styles.steps}>
              {topNav.map((item, index) => (
                <div key={index} className={styles.step}>
                  <div className={styles.circle}>{index + 1}</div>
                  <div className={styles.middle}>{item}</div>
                  {index !== 3 && <div className={styles.right}>-</div>}
                </div>
              ))}
            </div>
            <div className={styles.multiCrops}>
              <MultiCrops
                src={this.props.img}
                width={592}
                coordinates={this.state.coordinates}
                onChange={this.changeCoordinate}
                onDelete={this.deleteCoordinate}
              />
              {this.state.coordinates &&
                this.state.coordinates.map((item, index) => {
                  const width = item.width;
                  const height = item.height;
                  const top = item.y + item.height / 4;
                  const left = item.x + item.width / 4;
                  return (
                    <div
                      style={{ position: 'absolute', top: top, left: left, color: '#fff' }}
                      key={index}
                    >
                      {
                        <div
                          style={{ width: width / 2, height: height / 2 }}
                          className={styles.modalText}
                        >
                          {item.PageName ? (
                            <a
                              onClick={() => this.showSelectPathModal(index)}
                              style={{ textAlign: 'center', color: '#595959' }}
                            >
                              {item.PageName}
                              <br />
                              <span style={{ color: '#38f' }}>修改</span>
                            </a>
                          ) : (
                            <a
                              onDoubleClick={() => this.showSelectPathModal(index)}
                              style={{ color: '#595959' }}
                            >
                              双击设置
                              <br />
                              关联链接
                            </a>
                          )}
                        </div>
                      }
                    </div>
                  );
                })}
            </div>
            <Row className={styles.footRow}>
              <Col span={12} offset={12}>
                <span style={{ fontSize: 12, marginRight: 16 }}>
                  在图片区域内按住鼠标左键拖拽添加热区
                </span>
                <Button onClick={this.clickSubmit}>保存</Button>
              </Col>
            </Row>
          </div>
        </Modal>
        <SelectPath onRef={this.selectRef} selectPath={this.selectPath} />
      </div>
    );
  }
}
