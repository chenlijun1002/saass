import React from 'react';
import {ColorPicker,Button,Checkbox} from 'zent'


import { DesignEditor, ControlGroup } from 'zent/lib/design/editor/DesignEditor';
import Richtext from './editor';
import styles from './index';
const reserColor = '#f9f9f9';

export default class RichtextEditor extends DesignEditor {
  static defaultProps = {
    richTextConfig: {},
  };

  handleResetBackground = () => {
    this.onCustomInputChange('color')(reserColor);
  };

  onColorChange = color => {
    this.onCustomInputChange('color')(color);
  };

  onFullscreenChange = e => {
    let isFullscreen = Number(e.target.checked);
    this.onCustomInputChange('fullscreen')(isFullscreen);
  };

  onEditorChange = val => {
    this.onCustomInputChange('content')(val);
  };

  render() {
    const { value, richTextConfig } = this.props;

    return (
      <div>
        <div className={`xkd-moduleTitle`} style={{fontSize:'14px'}}>文本模块</div>
        <div className="zent-design-component-richtext-editor" style={{fontSize:'14px'}}>        
          <ControlGroup focusOnLabelClick={false} label="背景颜色：">
            <div className="input-append">
              <ColorPicker
                className="zent-design-component-richtext-editor__color-picker-popover"
                color={value.color}
                onChange={this.onColorChange}
              />
              <Button onClick={this.handleResetBackground}  style={{border:0,color:'#27f',fontSize:'14px',marginLeft:'-8px'}}>重置</Button>
            </div>

            <label htmlFor="fullscreen" className="control-label">
              是否全屏：
            </label>
            <Checkbox
              className="zent-design-component-richtext-editor-checkbox-wrap"
              name="fullscreen"
              checked={value.fullscreen}
              onChange={this.onFullscreenChange}
            >
              全屏显示
            </Checkbox>
          </ControlGroup>

          <div className="zent-design-component-richtext-editor-group">
            <Richtext
              value={value.content}
              onChange={this.onEditorChange}
              editorConfig={{
                initialFrameWidth: 386,
                initialFrameHeight: 600,
              }}
              {...richTextConfig}
            />
          </div>
        </div>
      </div>
    );
  }

  static designType = 'rich_text';
  static designDescription = '文本模块';

  static getInitialValue() {
    return {
      color: reserColor,
      content: '',
      fullscreen: 0,
    };
  }
}
