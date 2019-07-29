import React from 'react';
import Layout from 'zent/lib/layout';
import { DesignEditor, ControlGroup } from 'zent/lib/design/editor/DesignEditor';
import ImageEntry from './imageEntry';
import { Droppable } from 'react-beautiful-dnd';
import { message, Icon } from 'antd';
import uuid from 'zent/lib/utils/uuid';
import SelectedImage from '@/components/plugins/selectImage/index';
import styles from './index.less';
const { Row, Col } = Layout;

import {
  FILLSTYLE,
  IMAGE_HOT_LIMIT,
  IMAGE_HOT_ENTRY_UUID_KEY,
  IMAGE_HOT_DND_TYPE,
} from './constants';

export default class HotAreaEditor extends DesignEditor {
  static designType = 'image-hot';
  static designDescription = <span>图片热区</span>;
  static getInitialValue() {
    return {
      fillstyle: FILLSTYLE.FILL,
      images: [],
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      hotImageData: [],
    };
  }

  shouldHandleDragEnd(type) {
    return type === IMAGE_HOT_DND_TYPE;
  }

  onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const { value, onChange } = this.props;
    const newValue = {
      ...value,
      images: this.reorder(value.images, source.index, destination.index),
    };
    onChange(newValue);
  }

  isAddImageEntryAllowed() {
    const {
      value: { images },
    } = this.props;
    return images.length < IMAGE_HOT_LIMIT;
  }

  imgModal = ref => {
    this.imgmodal = ref;
  };

  showModal = () => {
    this.imgmodal.handleShowModal();
  };

  clickAddBackgroundImage = () => {
    this.imgmodal.handleShowModal();
  };

  onImageChange = res => {
    const {
      value: { images },
    } = this.props;
    images.push({
      imageUrl: res.imageUrl,
      width: res.width,
      height: res.height,
    });
    this.props.onChange({ images });
    this.imgmodal.handleModalVisible();
  };

  onImageEntryChange = index => delta => {
    const {
      value: { images },
      onChange,
    } = this.props;
    (images[index].imageUrl = delta.imageUrl),
      (images[index].width = delta.width),
      (images[index].height = delta.height),
      onChange({ images });
  };

  // 保存
  clickEditHotAreaButton = item => {
    const {
      value: { images },
      onChange,
    } = this.props;
    images[this.state.hotImageIndex].hotData = item;
    onChange({ images });
    this.setState({
      hotImageData: item,
    });
  };

  // 点击的哪张图片
  clickImageIndex = index => {
    this.setState({
      hotImageIndex: index,
    });
  };

  // 点击删除图片
  clickRemoveImage = index => {
    const {
      value: { images },
      onChange,
    } = this.props;
    images.splice(index, 1);
    onChange({ images });
  };

  render() {
    const { prefix, showError, validation, value } = this.props;
    const imageErrors = validation.images;
    const allowAddImage = this.isAddImageEntryAllowed();
    return (
      <div>
        <div className="xkd-moduleTitle" style={{ fontSize: '14px' }}>
          图片热区
        </div>
        <Row className="xkd-mt16">
          <Col span={21}>
            <div className={styles.navText}>
              <span>添加图片:</span>
              <span>最多添加10个广告,鼠标拖拽调整广告顺序</span>
            </div>
          </Col>
          <Col span={21}>
            <Droppable
              droppableId={`${prefix}-design-component-image-ad-editor__entry-list`}
              type={IMAGE_HOT_DND_TYPE}
              direction="vertical"
            >
              {(provided, snapshot) => {
                return (
                  <ul
                    ref={provided.innerRef}
                    className={`${prefix}-design-component-image-ad-editor__entry-list`}
                  >
                    {value.images &&
                      value.images.map((img, index) => {
                        const imageId = index;
                        return (
                          <li
                            key={imageId}
                            className={`${prefix}-design-component-image-ad-editor__entry`}
                          >
                            <ImageEntry
                              prefix={prefix}
                              imageId={imageId}
                              imageUrl={img.imageUrl}
                              onChange={this.onImageEntryChange(index)} // 更改图片
                              index={index}
                              width={img.width}
                              height={img.height}
                              clickEditHotAreaButton={this.clickEditHotAreaButton} // 热区编辑的保存事件
                              hotImageData={img.hotData} // 画的热区数据
                              clickImageIndex={() => this.clickImageIndex(index)} // 点击的哪张图片事件
                              hotImageIndex={this.state.hotImageIndex} // 点击图片的下标
                              error={showError && imageErrors ? imageErrors[imageId] : ''}
                              data={value.images}
                            />
                            {!snapshot.isDraggingOver && (
                              <Icon
                                type="close-circle"
                                className={`${prefix}-design-component-image-ad-editor__entry-close-btn`}
                                onClick={() => this.clickRemoveImage(index)}
                              />
                            )}
                          </li>
                        );
                      })}
                    {provided.placeholder}
                  </ul>
                );
              }}
            </Droppable>
          </Col>
        </Row>
        <Col span={21}>
          <div className={styles.navText}>点击图片打开热区编辑器</div>
        </Col>
        {allowAddImage && (
          <Row>
            <Col span={21}>
              <a
                className={`${prefix}-design-component-image-ad-editor__add-entry-btn xkd-border-dash xkd-border-color-e8`}
                onClick={this.clickAddBackgroundImage}
              >
                <div className="xkd-text-center xkd-margin-auto xkd-color-59">
                  + 添加一个背景图
                  <div className="xkd-color-bf">建议尺寸750*350像素</div>
                </div>
              </a>
            </Col>
          </Row>
        )}
        <SelectedImage onRef={this.imgModal} selectImage={this.onImageChange} />
      </div>
    );
  }
}
