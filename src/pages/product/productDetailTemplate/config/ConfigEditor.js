/* eslint-disable no-script-url */

import React from 'react';
import { Button, Input, Radio } from 'zent';
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
          商品页模板
        </div>
        <div className={`${prefix}-design-component-config-editor`}>
          <ControlGroup
            showError={showError || this.getMetaProperty('name', 'touched')}
            error={validation.name}
            required
            label="模板名称："
            className="xkd-ml-4"
          >
            <Input
              value={value.name}
              onChange={this.onInputChange}
              onBlur={this.onInputBlur}
              name="name"
              placeholder="最多20个字符"
            />
          </ControlGroup>
          <ControlGroup
            label="规格样式："
            labelAlign="top"
            className={`${prefix}-design-component-config-editor__background`}
            focusOnLabelClick={false}
            showError={showError || this.getMetaProperty('colortype', 'touched')}
            error={validation.colortype}
          >
            <RadioGroup value={value.specificationsType} onChange={this.onInputChange}>
              <Radio name="specificationsType" value={COLOR_TYPE.SYSTEM}>
                折叠版
              </Radio>
              <Radio name="specificationsType" value={COLOR_TYPE.CUSTOM}>
                展开版
              </Radio>
            </RadioGroup>
          </ControlGroup>  
          <ControlGroup
            label="详情样式："
            labelAlign="top"
            className={`${prefix}-design-component-config-editor__background`}
            focusOnLabelClick={false}
            showError={showError || this.getMetaProperty('colortype', 'touched')}
            error={validation.colortype}
          >
            <RadioGroup value={value.detailType} onChange={this.onInputChange}>
              <Radio name="detailType" value={COLOR_TYPE.SYSTEM}>
                折叠版
              </Radio>
              <Radio name="detailType" value={COLOR_TYPE.CUSTOM}>
                展开版
              </Radio>
            </RadioGroup>
          </ControlGroup>          
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
      // 模板名称
      name: '',
      specificationsType: 1,
      detailType:1
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
