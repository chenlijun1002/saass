import React from 'react';
import Radio from 'zent/lib/radio';
import Icon from 'zent/lib/icon';
import Layout from 'zent/lib/layout';
import Slider from 'zent/lib/slider';
import { Droppable } from 'react-beautiful-dnd';
import createObjectURL from 'zent/lib/utils/createObjectURL';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import { DesignEditor, ControlGroup } from 'zent/lib/design/editor/DesignEditor';
const { Row, Col } = Layout
import styles from './index.less'
import type1 from '../../../../assets/image-ad1.png'
import type2 from '../../../../assets/image-ad2.png'
import type3 from '../../../../assets/image-ad3.png'
import type4 from '../../../../assets/image-ad4.png'
import type5 from '../../../../assets/image-ad5.png'
import {
  FILLSTYLE,
  IMAGE_AD_LIMIT,
  IMAGE_AD_ENTRY_UUID_KEY,
  IMAGE_AD_DND_TYPE,
  IMAGE_LAYOUT
} from './constants';
import { ImageEntry, createEmptyImageEntry } from './ImageEntry';
const RadioGroup = Radio.Group;
// TODO: 拖拽
export default class ImageAdEditor extends DesignEditor {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      localImage: '',
      space:this.props.value.space
    };
  }
  render() {
    const { prefix, showError, validation, value } = this.props;
    const { localImage } = this.state;
    const imageErrors = validation.images;
    const allowAddImage = this.isAddImageEntryAllowed();
    return (
      <div>
      <div className={`xkd-moduleTitle`} style={{fontSize:'14px'}}>图片广告</div>
      <div className={`${prefix}-design-component-image-ad-editor`}>

        <div>
          <Row>
            <Col span={3} className="xkd-font14 xkd-text-right">
              选择模块：
            </Col>
            <Col span={21}>
            <div onClick={() => this.onLayoutChange(IMAGE_LAYOUT.ROTATION)} className={`${styles.layoutMode} ${value.layout == IMAGE_LAYOUT.ROTATION ?styles.active:''}`}>              
              <div className={styles.box}>
                <img src={type1} />
              </div>
              <div className="xkd-font14">轮播海报</div>
            </div>
            <div onClick={() => this.onLayoutChange(IMAGE_LAYOUT.ONELINE)} className={`${styles.layoutMode} ${value.layout == IMAGE_LAYOUT.ONELINE ?styles.active:''}`}>              
              <div className={styles.box}>
                <img src={type2} />
              </div>
              <div className="xkd-font14"> 一行一个</div>
            </div>
            <div onClick={() => this.onLayoutChange(IMAGE_LAYOUT.SLIDELARGE)} className={`${styles.layoutMode} ${value.layout == IMAGE_LAYOUT.SLIDELARGE ?styles.active:''}`}>              
              <div className={styles.box}>
                <img src={type3} />
              </div>
              <div className="xkd-font14">横向滑动(大)</div>
            </div>
            <div onClick={() => this.onLayoutChange(IMAGE_LAYOUT.SLIDESMALL)} className={`${styles.layoutMode} ${value.layout == IMAGE_LAYOUT.SLIDESMALL ?styles.active:''}`}>              
              <div className={styles.box}>
                <img src={type4} />
              </div>
              <div className="xkd-font14">横向滑动(小)</div>
            </div>
            <div onClick={() => this.onLayoutChange(IMAGE_LAYOUT.SLIDESNAV)} className={`${styles.layoutMode} ${value.layout == IMAGE_LAYOUT.SLIDESNAV ?styles.active:''}`}>              
              <div className={styles.box}>
                <img src={type5} />
              </div>
              <div  className="xkd-font14">横向滑动(导航)</div>
            </div>
            </Col>
          </Row> 
          {
            value.layout == IMAGE_LAYOUT.ROTATION?
            <Row className="xkd-mt16" >
              <Col span={3} className="xkd-font14 xkd-text-right" style={{lineHeight:'24px'}}>
                布局：
              </Col>
              <Col span={21} className={styles.display}>
                <ControlGroup
                  //label=""
                  showError={showError || this.getMetaProperty('fillstyle', 'touched')}
                  error={validation.fillstyle}
                >
                  <RadioGroup value={value.fillstyle} onChange={this.onInputChange}>
                    <Radio name="fillstyle" value={FILLSTYLE.FILL}>
                      <span className="xkd-font14">填充</span>
                    </Radio>
                    <Radio name="fillstyle" value={FILLSTYLE.SPACE}>                      
                      <span className="xkd-font14">留白</span>
                    </Radio>
                  </RadioGroup>
                </ControlGroup>
              </Col>            
            </Row> 
            :value.layout == IMAGE_LAYOUT.ONELINE||value.layout == IMAGE_LAYOUT.SLIDELARGE||value.layout == IMAGE_LAYOUT.SLIDESMALL||value.layout == IMAGE_LAYOUT.SLIDESNAV?
            <Row className="xkd-mt16">
              <Col span={3}  className="xkd-font14 xkd-text-right" style={{lineHeight:'30px'}}>
                图片间隙：
              </Col>
              <Col span={20} className={`${styles.display} xkd-ml8`}>
              <Slider value={value.space} onChange={this.onSpaceChange} max={30}/>
              </Col>            
            </Row> 
           

        
            :value.layout == IMAGE_LAYOUT.ONELINE?<div></div>:null
          }
          <Row className="xkd-mt16">           
            <Col span={21} offset={3}>
              <Droppable
                droppableId={`${prefix}-design-component-image-ad-editor__entry-list`}
                type={IMAGE_AD_DND_TYPE}
                direction="vertical"
              >
                {(provided, snapshot) => {
                  return (
                    <ul
                      ref={provided.innerRef}
                      className={`${prefix}-design-component-image-ad-editor__entry-list`}
                    >
                      {value.images.map((img, index) => {
                        const imageId = img[IMAGE_AD_ENTRY_UUID_KEY];
                        return (
                          <li
                            key={imageId||index}
                            className={`${prefix}-design-component-image-ad-editor__entry`}
                          >
                            <ImageEntry
                              prefix={prefix}
                              imageId={imageId}
                              imageUrl={img.imageUrl}
                              linkTitle={img.linkTitle}
                              linkUrl={img.linkUrl}
                              linkUrlTitle={img.linkUrlTitle}
                              onChange={this.onImageEntryChange(imageId)}
                              index={index}
                              error={
                                showError && imageErrors ? imageErrors[imageId] : ''
                              }
                            />
                            {!snapshot.isDraggingOver && (
                              <Icon
                                type="close-circle"
                                className={`${prefix}-design-component-image-ad-editor__entry-close-btn`}
                                onClick={this.removeImageEntry(imageId)}
                              />
                            )}
                            {/* {!snapshot.isDraggingOver &&
                              allowAddImage && (
                                <Icon
                                  type="plus"
                                  className={`${prefix}-design-component-image-ad-editor__entry-prepend-btn`}
                                  onClick={this.prependImageEntry(imageId)}
                                />
                              )}
                            {!snapshot.isDraggingOver &&
                              allowAddImage && (
                                <Icon
                                  type="plus"
                                  className={`${prefix}-design-component-image-ad-editor__entry-append-btn`}
                                  onClick={this.appendImageEntry(imageId)}
                                />
                              )} */}
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
        </div>       
        {/* {
          value.layout == IMAGE_LAYOUT.ROTATION ? (
            <ControlGroup
              label="填充方式:"
              showError={showError || this.getMetaProperty('fillstyle', 'touched')}
              error={validation.fillstyle}
            >
              <RadioGroup value={value.fillstyle} onChange={this.onInputChange}>
                <Radio name="fillstyle" value={FILLSTYLE.FILL}>
                  填充
                </Radio>
                <Radio name="fillstyle" value={FILLSTYLE.SPACE}>
                  留白
                </Radio>
              </RadioGroup>
            </ControlGroup>
          ) :  (
            <ControlGroup
              label="图片间隙:"
              showError={showError || this.getMetaProperty('space', 'touched')}
              error={validation.space}
            >
              <Slider value={value.space} onChange={this.onSpaceChange} />
            </ControlGroup>

          ) 
        } */}        
        {allowAddImage && (
          <Row>          
            <Col span={21} offset={3}>
              <a
                className={`${prefix}-design-component-image-ad-editor__add-entry-btn xkd-border-dash xkd-border-color-e8`}
                onClick={this.onAddImageEntry}
              >
                <div className="xkd-text-center xkd-margin-auto xkd-color-59">
                  + 添加一个广告
                  <div className="xkd-color-bf">建议尺寸750*350像素</div>
                </div>
              </a>
            </Col>
          </Row>  
        )}
        {/* <div className={`${prefix}-design-component-image-ad-editor__hint`}>
          最多添加 {IMAGE_AD_LIMIT} 个广告，拖动选中的图片广告可对其排序
        </div> */}

      </div>
      </div>
    );
  }
  changeSpace = (e) =>{
    const {  space } = this.props;
    onChange({
      images: value.images.concat(createEmptyImageEntry({ imageUrl }))
    });
  }
  onAddImageEntry = () => {
    // const { target: { files } } = evt;
    // const imageUrl = createObjectURL(files[0]);
   //const imageUrl = "https://testfile.xiaokeduo.com/system/StoreAdmin/Shop/Public/images/diy/waitupload.png";
    const imageUrl="https://img.yzcdn.cn/public_files/2018/03/08/837f3d12e14b299778ae5fea5c05a3a3.png";
    const { value, onChange } = this.props;
    onChange({
      images: value.images.concat(createEmptyImageEntry({ imageUrl,width:160,height:160 }))
    });
  };
  removeImageEntry = id => () => {
    const { value: { images }, onChange } = this.props;
    onChange({
      images: images.filter(img => img[IMAGE_AD_ENTRY_UUID_KEY] !== id)
    });
  };
  prependImageEntry = id => () => {
    const { value: { images }, onChange } = this.props;
    const index = findIndex(images, img => img[IMAGE_AD_ENTRY_UUID_KEY] === id);
    if (index !== -1) {
      const newImages = images.slice();
      newImages.splice(index, 0, createEmptyImageEntry());
      onChange({
        images: newImages
      });
    }
  };
  appendImageEntry = id => () => {
    const { value: { images }, onChange } = this.props;
    const index = findIndex(images, img => img[IMAGE_AD_ENTRY_UUID_KEY] === id);
    if (index !== -1) {
      const newImages = images.slice();
      newImages.splice(index + 1, 0, createEmptyImageEntry());
      onChange({
        images: newImages
      });
    }
  };
  onImageEntryChange = id => delta => {
    const { value: { images }, onChange } = this.props;       
    onChange({
  
      images: images.map(img => {
        if (img[IMAGE_AD_ENTRY_UUID_KEY] !== id) {
          return img;
        }
        return {
          ...img,
          ...delta
        };
      })
    });
  };

  onLayoutChange = (layout) => {
    //const { target: { files } } = evt;
    this.props.onChange({ layout });
  };
  onSpaceChange = (space) => {
    //const { target: { files } } = evt;
    this.props.onChange({ space });
  };
  isAddImageEntryAllowed() {
    const { value: { images } } = this.props;
    return images.length < IMAGE_AD_LIMIT;
  }
  shouldHandleDragEnd(type) {
    return type === IMAGE_AD_DND_TYPE;
  }


  onDragEnd(result) {
    const { source, destination } = result;
    // dropped outside
    if (!destination) {
      return;
    }
    const { value, onChange } = this.props;
    const newValue = {
      ...value,
      images: this.reorder(value.images, source.index, destination.index)
    };
    onChange(newValue);
  }
  static designType = 'image-ad';
  static designDescription = (
    <span>
      图片<br />广告
    </span>
  );
  static getInitialValue() {
    return {
      fillstyle: FILLSTYLE.FILL,
      layout: IMAGE_LAYOUT.ROTATION,
      space: 0,
      images: []
    };
  }
  static validate(value) {
    return new Promise(resolve => {
      const errors = {};
      errors.images = value.images.reduce((imageErrors, img) => {
        if (!img.imageUrl) {
          imageErrors[img[IMAGE_AD_ENTRY_UUID_KEY]] = '请选择广告图片';
        }
        return imageErrors;
      }, {});
      // 如果没有错误就删除这个 key
      if (isEmpty(errors.images)) {
        delete errors.images;
      }
      resolve(errors);
    });
  }
}