import React from 'react';
import { Input } from 'zent';
import Radio from 'zent/lib/radio';
import Layout from 'zent/lib/layout';
import Icon from 'zent/lib/icon';
import { Droppable } from 'react-beautiful-dnd';
import { DesignEditor, ControlGroup } from 'zent/lib/design/editor/DesignEditor';

import styles from './Video.less';
import VideoPlugin from '@/components/plugins/videoplugin/videoplugin';
import SelectedImage from '@/components/plugins/selectImage/index';
export const PLACEHOLDER = '请输入图片地址';
const RadioGroup = Radio.Group;
const { Row, Col } = Layout
import {
    IMAGE_TYPE,

} from './constants';
import { Button } from 'antd';
import { connect } from 'dva';


@connect(({ global }) => ({
    oemInfo: global.oemInfo,
}))

export default class VideoEditor extends DesignEditor {
    state = {
        videoImg: '',
        videoName: '',
        isLoading: false,
        videoObj: {}
    }
    render() {
        const { prefix, showError, validation, value } = this.props;

        return (
            <div>
                <div className={`xkd-moduleTitle`} style={{ fontSize: '14px' }}>视频组件</div>
                <div className="rc-design-component-notice-editor">
                    {/* <div className="video-edit-wrap">
                        <div>
                            <a className="add-video" onClick={this.OpenVideoModal} href="javascript:;">
                                添加视频
                                <i className="zenticon zenticon-plus"></i>
                            </a>
                            <p className="editor-bottom-help-desc">建议视频宽高比16:9</p>
                        </div>
                    </div> */}
                    <div className="zent-design-editor__control-group-container">
                        <div className="zent-design-editor__control-group-label xkd-font14 xkd-text-right">选择视频：</div>
                        <div className="zent-design-editor__control-group-control">
                            <Button onClick={this.OpenVideoModal} >选择视频</Button>
                        </div>
                    </div>
                    {/* <div className="zent-design-editor__control-group">
                        <div className="zent-design-editor__control-group-container">
                            <div className="zent-design-editor__control-group-label zent-design-editor__control-group-label--top">
                                视频:                        
                            </div>
                            <div className="zent-design-editor__control-group-control">
                            <div className="zent-radio-group">
                            <label className="zent-radio-wrap zent-radio-checked"><span className="zent-radio"><span class="zent-radio-inner"></span><input type="radio" name="sourceFrom" value="on" /></span><span>选择视频</span></label>
                            <label className="mt10 zent-radio-wrap"><span className="zent-radio"><span className="zent-radio-inner"></span><input type="radio" name="sourceFrom" value="on" /></span><span><span>
                                粘贴视频地址
                                <span className="suspension-window-editor-notice">小程序 v2.15 及以上版本支持</span></span></span></label>
                            </div>
                            <div className="video-edit-wrap">
                            <div>
                            <div className="video-cover is-success">
                                <span className="video-close">x</span>
                                <div className="image-cover"></div>
                            </div>
                            <p className="editor-bottom-help-desc">建议视频宽高比16:9</p>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div> */}
                    <Row>
                        <Col span={22} offset={3}>
                            <div className="xkd-bg-f5" className={styles.videoPreview}>
                                <p className="xkd-font14"><span>已选择：</span>{this.state.videoName}</p>
                                <div>
                                    <div className={`${styles.videoBox} xkd-mt16 xkd-pb8 xkd-inline-block`}>
                                        {
                                            this.state.videoImg && this.state.videoImg.length > 0 ?
                                                <img src={`${this.state.videoImg}?x-oss-process=style/240`} width='100' height='100' />
                                                :
                                                ''
                                        }
                                    </div>
                                    <a onClick={()=> {console.log('刷新')}} className="xkd-ml8 xkd-font14">刷新</a>
                                </div>
                                <p className="xkd-color-8c xkd-font14">建议视频宽高比16：9</p>
                                <p className="xkd-font14"><Icon type="info-circle-o" className="xkd-color-primary xkd-mr8" />该视频转码、审核中，手机端会屏蔽视频，转码审核通过后可正常播放。</p>
                            </div>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={3} className="xkd-font14 xkd-text-right xkd-mr8">
                            封面图：
                        </Col>
                        <Col span={20} className={styles.display}>
                            <ControlGroup
                                //label="封面图:"
                                showError={showError || this.getMetaProperty('imgtype', 'touched')}
                                error={validation.imgtype}
                            >
                                <RadioGroup value={value.imgtype} onChange={this.onInputChange} >
                                    <Radio name="imgtype" value={IMAGE_TYPE.SYSTEM} className="xkd-font14">
                                        原视频封面
                                    </Radio>
                                    <Radio name="imgtype" value={IMAGE_TYPE.CUSTOM} className="xkd-font14">
                                        自定义封面
                                    </Radio>
                                </RadioGroup>

                            </ControlGroup>
                            {
                                <Row>
                                    <Col >
                                        {
                                            value.imgtype == IMAGE_TYPE.CUSTOM ?
                                                <div >
                                                    <div className="rc-design-common-choice-image-component image-editor">
                                                        <div className="has-not-choose-image" onClick={this.OpenImageModal}>

                                                            {
                                                                value.videoimg ? (
                                                                    <img src={`${value.videoimg}?x-oss-process=style/240`} />
                                                                ) : (
                                                                        <div>
                                                                            <i className="zenticon zenticon-plus plus-icon"></i>
                                                                            <div>添加图片</div>
                                                                        </div>
                                                                    )
                                                            }
                                                        </div>
                                                    </div>
                                                    <p className="xkd-color-8c xkd-font14">建议图片宽高比16:9</p>
                                                </div> : null
                                        }
                                    </Col>
                                </Row>
                            }
                        </Col>
                    </Row>
                    {
                        this.state.isLoading &&
                        <VideoPlugin onRef={this.videoModal} onIsLoading={this.onChangeLoading} selectvideo={this.onVideoChange} ></VideoPlugin>
                    }
                    {/* <ImgPlugin onRef={this.imgModal} selectimg={this.onImageChange} ></ImgPlugin> */}
                    <SelectedImage onRef={this.imgModal}    selectImage={this.onImageChange}/>
                </div>
            </div>
        )
    }
    static designType = 'video';
    static designDescription = '视频组件';
    static getInitialValue(settings, globalConfig) {
        return {
            videourl: '',
            imgtype: IMAGE_TYPE.SYSTEM,
            videoimg: '',
            scrollable: false
        };
    }
    onVideoChange = (item) => {
        let cdnUrl = this.props.oemInfo && this.props.oemInfo['cdnUrl'] + '/';

        let _videoName = item.DisplayName;
        let _videoUrl = cdnUrl + item.Path;
        let _imgUrl;
        if (item.Img.length > 0) {
            _imgUrl = cdnUrl + item.Img;
        } else {
            _imgUrl = '';
        }

        this.setState({
            videoImg: _imgUrl,
            videoName: _videoName,
            videoObj: item
        });

        this.props.onChange({ videourl: _videoUrl });
        this.videomodal.handleCancel();
    };
    static validate(value) {
        return new Promise(resolve => {
            const errors = {};
            const { videourl } = value;
            if (!videourl || !videourl.trim()) {
                errors.content = '请填写视频地址';
            }
            resolve(errors);
        });
    }

    videoModal = (ref) => {
        this.videomodal = ref;
    }

    onChangeLoading = () => {
        this.setState({
            isLoading: false
        });
    }

    OpenVideoModal = () => {
        this.setState({
            isLoading: true
        }, () => {
            this.videomodal.showModal();
        });
    };
    onImageChange = (res) => {
        //const { target: { files } } = evt;
        // this.props.onChange({ videoimg: imageUrl });
        this.props.onChange({ videoimg:res.imageUrl,width:res.width,height:res.height });
        this.imgmodal.handleModalVisible();
    };
    OpenImageModal = () => {
        //const { target: { files } } = evt;
        //const imageUrl = "http://editerupload.eepw.com.cn/201809/61001537857032.jpg";
        //this.props.onChange({ imageUrl });
        this.imgmodal.handleShowModal();
    };
    imgModal = (ref) => {

        this.imgmodal = ref;
    }
    showModal = () => {
        this.imgmodal.handleShowModal();
    }

}