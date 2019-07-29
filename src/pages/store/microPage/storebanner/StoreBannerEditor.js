import React from 'react';
import { Radio } from 'zent';
//import  from 'colorpicker';

import { DesignEditor, ControlGroup } from 'zent/lib/design/editor/DesignEditor';
import SelectedImage from '@/components/plugins/selectImage/index';
const RadioGroup = Radio.Group;
export default class StoreBannerEditor extends DesignEditor {
    render() {
        const { prefix, value, showError, validation } = this.props;

        return (
            <div>
                <div className={`xkd-moduleTitle`} style={{ fontSize: '14px' }}>
                    店招模块
                </div>
                <ControlGroup
                    label="显示样式："
                    showError={showError || this.getMetaProperty('layout', 'touched')}
                    error={validation.lineType}
                >
                    <RadioGroup value={value.layout} onChange={this.onInputChange}>
                        <Radio name="layout" value="1">
                            样式一
                  </Radio>
                        <Radio name="layout" value="2">
                            样式二
                  </Radio>
                        <Radio name="layout" value="3">
                            样式三
                  </Radio>
                        <Radio name="layout" value="4">
                            样式四
                  </Radio>
                    </RadioGroup>
                </ControlGroup>
                <div className="zent-design-editor__control-group-container xkd-mt16">
                    <div className="zent-design-editor__control-group-label">背景图片：</div>

                    <div className="zent-design-editor__control-group-control">
                        {
                            value.shareimg ? (
                                <div className="upload-add-image-button" onClick={this.OpenImageModal}>
                                    <img src={value.shareimg} />
                                </div>
                            ) : (
                                    <div className="upload-add-image-button" onClick={this.OpenImageModal}>
                                        +
                                    </div>
                                )
                        }
                        <div style={{ color: '#8C8C8C' }} className="xkd-mt8">上传图片建议尺寸750*314px</div>
                    </div>
                    {/* <ImgPlugin onRef={this.imgModal} selectimg={this.onImageChange} ></ImgPlugin> */}
                    <SelectedImage onRef={this.imgModal}    selectImage={this.onImageChange}/>
                </div>
            </div>
        );
    }

    static designType = 'storebanner';
    static designDescription = '店招模块';
    static getInitialValue() {
        return {
            layout: "1",
            shareimg: ""
        };
    }
    imgModal = (ref) => {

        this.imgmodal = ref;
    }
    showModal = () => {
        this.imgmodal.handleShowModal();
    }
    OpenImageModal = () => {

        this.imgmodal.handleShowModal();
    };

    onImageChange = (res) => {
        this.props.onChange({ shareimg: res.imageUrl,width:292,height:220 });       
        this.imgmodal.handleModalVisible();
    };
}