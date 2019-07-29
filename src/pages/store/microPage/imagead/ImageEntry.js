import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from 'zent/lib/input';
import Button from 'zent/lib/Button';
import uuid from 'zent/lib/utils/uuid';
import { Draggable } from 'react-beautiful-dnd';
import createObjectURL from 'zent/lib/utils/createObjectURL';
import cx from 'classnames';
import {
  IMAGE_AD_ENTRY_UUID_KEY,
  IMAGE_AD_DND_TYPE,
} from 'zent/lib/design/components/image-ad/constants';
import SelectedImage from '@/components/plugins/selectImage/index';
//import SelectLink from '../SelectLink/selectLinkMenu'
import SelectPath from '@/components/plugins/selectPath/index';
export class ImageEntry extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    imageId: PropTypes.string,
    imageUrl: PropTypes.string,
    linkUrl: PropTypes.string,
    linkUrlTitle: PropTypes.string,
    linkTitle: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };
  state = {
    localImage: '',
    pagePathModalVisible: false,
    contentType: '1',
  };
  selectPath = record => {
    this.props.onChange({
      linkUrl: record.PagePath,
      linkTitle: record.PageName,
      linkUrlTitle: record.PageName,
    });
    this.setState({
      pagePathModalVisible: false,
    });
  };
  showSelectPathModal = () => {
    // this.setState({
    //   pagePathModalVisible:true
    // })
    this.selectPathModal.showModal();
  };
  render() {
    const {
      imageId,
      imageUrl,
      linkTitle,
      linkUrl,
      error,
      prefix,
      index,
      linkUrlTitle,
    } = this.props;
    const { localImage } = this.state;
    return (
      <Fragment>
        <Draggable draggableId={imageId} type={IMAGE_AD_DND_TYPE} index={index}>
          {provided => (
            <div>
              <div
                className={`${prefix}-design-component-image-ad-editor__image-entry xkd-bg-f5 xkd-border0`}
                ref={provided.innerRef}
                style={provided.draggableStyle}
                {...provided.dragHandleProps}
              >
                <div
                  className={`${prefix}-design-component-image-ad-editor__image-entry-image-container`}
                  onClick={this.OpenImageModal}
                >
                  <img src={imageUrl} alt={linkTitle} />
                  <div
                    className={cx(
                      `${prefix}-design-component-image-ad-editor__image-entry-image-upload`,
                      {
                        [`${prefix}-design-component-image-ad-editor__image-entry-image-upload--has-image`]: imageUrl,
                        [`${prefix}-design-component-image-ad-editor__image-entry-image-upload--no-image`]: !imageUrl,
                      }
                    )}
                  >
                    {imageUrl ? (
                      <span>选择图片</span>
                    ) : (
                      <a>
                        <b>+</b>
                        添加图片
                      </a>
                    )}
                  </div>
                </div>
                <div className={`${prefix}-design-component-image-ad-editor__image-entry-controls`}>
                  <div
                    className={`${prefix}-design-component-image-ad-editor__image-entry-image-control`}
                  >
                    <label>标题:</label>
                    <Input value={linkTitle} onChange={this.onTitleChange} />
                  </div>
                  <div
                    className={`${prefix}-design-component-image-ad-editor__image-entry-image-control`}
                  >
                    <label>链接:</label>
                    {/* <Button  onClick={this.onUrlChange}>{linkUrl||"选择链接"}</Button> */}
                    {/* <SelectLink text={linkTitle} onClick={this.onUrlChange} /> */}
                    {linkUrlTitle !== '选择链接' ? (
                      <Button onClick={this.showSelectPathModal} type="primary" outline>
                        {linkUrlTitle}
                      </Button>
                    ) : (
                      <Button onClick={this.showSelectPathModal}>
                        {linkUrlTitle || '选择链接'}
                      </Button>
                    )}
                  </div>
                </div>
                {error && (
                  <div className={`${prefix}-design-component-image-ad-editor__image-entry-error`}>
                    {error}
                  </div>
                )}
              </div>
              {/* <ImgPlugin onRef={this.imgModal}  selectimg={this.onImageChange} ></ImgPlugin> */}
              {provided.placeholder}
            </div>
          )}
        </Draggable>
        <SelectPath onRef={this.selectRef} selectPath={this.selectPath} />
        <SelectedImage onRef={this.imgModal} selectImage={this.onImageChange} />
      </Fragment>
    );
  }
  onTitleChange = evt => {
    const {
      target: { value },
    } = evt;
    this.props.onChange({ linkTitle: value });
  };
  onUrlChange = evt => {
    const { key } = evt;
    const linkTitle = evt.item.props.children;
    this.props.onChange({ linkUrl: key, linkTitle: linkTitle });
  };
  OpenImageModal = () => {
    //const { target: { files } } = evt;
    //const imageUrl = "http://editerupload.eepw.com.cn/201809/61001537857032.jpg";
    //this.props.onChange({ imageUrl });
    this.imgmodal.handleShowModal();
  };
  onImageChange = res => {
    //const { target: { files } } = evt;
    this.props.onChange({ imageUrl: res.imageUrl, width: res.width, height: res.height });
    this.imgmodal.handleModalVisible();
  };
  selectRef = ref => {
    this.selectPathModal = ref;
  };
  imgModal = ref => {
    this.imgmodal = ref;
  };
  showModal = () => {
    this.imgmodal.handleShowModal();
  };
}
export function createEmptyImageEntry(override) {
  return {
    imageUrl: '',
    linkTitle: '选择链接',
    linkUrl: '',
    linkUrlTitle: '选择链接',
    [IMAGE_AD_ENTRY_UUID_KEY]: uuid(),
    ...override,
  };
}
