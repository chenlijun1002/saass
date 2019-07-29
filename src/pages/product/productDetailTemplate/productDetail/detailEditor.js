/* eslint-disable no-script-url */

import React from 'react';
import { Button, Input, Radio } from 'zent';
import { DesignEditor, ControlGroup } from 'zent/lib/design/editor/DesignEditor';
import { DEFAULT_BACKGROUND } from 'zent/lib/design/preview/constants';
import { COLOR_TYPE } from './constants';
import TextArea from 'antd/lib/input/TextArea';
import SelectedImage from '@/components/plugins/selectImage/index';
const RadioGroup = Radio.Group;
export default class BaseInfoEditor extends DesignEditor {
  static designType = 'productDetail';
  static designDescription = '';
  render() {
    const { value, settings, prefix, showError, validation } = this.props;
    return (
      <div>
        <div className={`xkd-moduleTitle`} style={{ fontSize: '14px' }}>
          商品详情
        </div>
        <div className={`${prefix}-design-component-config-editor`}>
          <div>请在商品页中进行编辑，<a>点此查看</a></div>          
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
