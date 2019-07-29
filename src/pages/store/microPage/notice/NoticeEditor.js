// Editor
import React from 'react';
import { Input } from 'zent';

import { DesignEditor, ControlGroup } from 'zent/lib/design/editor/DesignEditor';

export const PLACEHOLDER = '请填写内容，如果过长，将会在手机上滚动显示';

export default class NoticeEditor extends DesignEditor {
  render() {
    const { value, showError, validation } = this.props;

    return (
      <div className="rc-design-component-notice-editor">
      
        <ControlGroup
          label="公告:"
          required
          showError={showError || this.getMetaProperty('content', 'touched')}
          error={validation.content}
        >
          <Input
            name="content"
            placeholder={PLACEHOLDER}
            value={value.content}
            onChange={this.onInputChange}
            onBlur={this.onInputBlur}
          />
        </ControlGroup>
      
      </div>
    );
  }

  static designType = 'notice';
  static designDescription = '公告';
  static getInitialValue(settings, globalConfig) {
    return {
      content: '',
      scrollable: false
    };
  }

  static validate(value) {
    return new Promise(resolve => {
      const errors = {};
      const { content } = value;
      if (!content || !content.trim()) {
        errors.content = '请填写公告内容';
      }

      resolve(errors);
    });
  }
}