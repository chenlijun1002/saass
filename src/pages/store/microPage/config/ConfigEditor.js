/* eslint-disable no-script-url */

import React from 'react';
import { Button, Input, ColorPicker, Radio } from 'zent';
import { DesignEditor, ControlGroup } from 'zent/lib/design/editor/DesignEditor';
import { DEFAULT_BACKGROUND } from 'zent/lib/design/preview/constants';
import { COLOR_TYPE } from './constants';
import TextArea from 'antd/lib/input/TextArea';
import SelectedImage from '@/components/plugins/selectImage/index';
const RadioGroup = Radio.Group;
export default class ConfigEditor extends DesignEditor {
  render() {
    const { value, settings, prefix, showError, validation } = this.props;
    return (
      <div>
        <div className={`xkd-moduleTitle`} style={{ fontSize: '14px' }}>
          通用设置
        </div>
        <div className={`${prefix}-design-component-config-editor`}>
          <ControlGroup
            showError={showError || this.getMetaProperty('name', 'touched')}
            error={validation.name}
            required
            label="页面名称："
            className="xkd-ml-4"
          >
            <Input
              value={value.name}
              onChange={this.onInputChange}
              onBlur={this.onInputBlur}
              name="name"
              placeholder="请输入微页面名称"
            />
          </ControlGroup>
          <ControlGroup
            label="背景颜色："
            labelAlign="top"
            className={`${prefix}-design-component-config-editor__background`}
            focusOnLabelClick={false}
            showError={showError || this.getMetaProperty('colortype', 'touched')}
            error={validation.colortype}
          >
            <RadioGroup value={value.colortype} onChange={this.onInputChange}>
              <Radio name="colortype" value={COLOR_TYPE.SYSTEM}>
                默认背景色
              </Radio>
              <Radio name="colortype" value={COLOR_TYPE.CUSTOM}>
                自定义背景色
              </Radio>
            </RadioGroup>
          </ControlGroup>
          {value.colortype == COLOR_TYPE.CUSTOM ? (
            // <div>
            //   <div
            //     className={`${prefix}-design-component-config-editor__background-control`}
            //   >
            //     <ColorPicker
            //       color={getBackground(value, settings)}
            //       onChange={this.onBackgroundChange}
            //     />
            //     <Button onClick={this.resetBackground}>重置</Button>
            //   </div>
            //   <div
            //     className={`${prefix}-design-component-config-editor__background-hint`}
            //   >

            //   </div>
            // </div>
            <div
              className="zent-design-editor__control-group-container xkd-mb24"
              style={{ marginTop: '-8px' }}
            >
              <div className="zent-design-editor__control-group-label">
                <div style={{ width: 70 }} />
              </div>

              <div className="zent-design-editor__control-group-control">
                <ColorPicker
                  color={getBackground(value, settings)}
                  onChange={this.onBackgroundChange}
                />
                <Button
                  onClick={this.resetBackground}
                  style={{ border: 0, color: '#27f', fontSize: '14px', marginLeft: '-8px' }}
                >
                  重置
                </Button>
              </div>
            </div>
          ) : null}
          <ControlGroup
            showError={showError || this.getMetaProperty('remark', 'touched')}
            error={validation.remark}
            label="页面描述："
          >
            <TextArea
              value={value.remark}
              onChange={this.onInputChange}
              onBlur={this.onInputBlur}
              name="remark"
              placeholder="展示在分享信息中，最多30个字"
            />
          </ControlGroup>

          <div className="zent-design-editor__control-group-container xkd-mt16">
            <div className="zent-design-editor__control-group-label">分享图片：</div>

            <div className="zent-design-editor__control-group-control">
              {value.shareimg ? (
                <div className="upload-add-image-button" onClick={this.OpenImageModal}>
                  <img src={value.shareimg} />
                </div>
              ) : (
                <div className="upload-add-image-button" onClick={this.OpenImageModal}>
                  +
                </div>
              )}
              <div style={{ color: '#8C8C8C' }} className="xkd-mt8">
                上传图片建议尺寸750*600px
              </div>
            </div>
            {/* <ImgPlugin onRef={this.imgModal} selectimg={this.onImageChange} /> */}
            <SelectedImage onRef={this.imgModal}    selectImage={this.onImageChange}/>
          </div>
        </div>
      </div>
    );
  }

  onColorChange = this.onCustomInputChange('bgcolor');

  onBackgroundChange = bgcolor => {
    // 修改 Config 组件的值
    this.onColorChange(bgcolor);

    // 修改 settings
    this.props.onSettingsChange({
      previewBackground: bgcolor,
    });
  };

  resetBackground = () => {
    this.onBackgroundChange(DEFAULT_BACKGROUND);
  };

  filterTag = (item, keyword) => item.text.indexOf(keyword) > -1;

  static designType = 'config';
  static designDescription = '页面配置';

  static getInitialValue() {
    return {
      // 标题
      name: '',

      //  背景颜色
      bgcolor: '',
      colortype: COLOR_TYPE.SYSTEM,
      // 页面描述
      remark: '',
      //分享图片
      shareimg: '',
    };
  }

  imgModal = ref => {
    this.imgmodal = ref;
  };
  showModal = () => {
    this.imgmodal.handleShowModal();
  };
  OpenImageModal = () => {
    this.imgmodal.handleShowModal();
  };

  onImageChange = res => {
    this.props.onChange({ shareimg: res.imageUrl });
    this.imgmodal.handleModalVisible();
  };

  static validate(value) {
    return new Promise(resolve => {
      const errors = {};
      const { name } = value;
      if (!name || !name.trim()) {
        errors.name = '请填写页面名称';
      } else if (name.length > 50) {
        errors.name = '页面名称长度不能多于 50 个字';
      }

      resolve(errors);
    });
  }
}

function getBackground(value, settings) {
  return (value && value.bgcolor) || settings.previewBackground || DEFAULT_BACKGROUND;
}
