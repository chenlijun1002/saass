import React from 'react';
import Radio from 'zent/lib/radio';
import Icon from 'zent/lib/icon';
import Layout from 'zent/lib/layout';
import { ColorPicker, Select } from 'zent';
import { Droppable } from 'react-beautiful-dnd';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import { DesignEditor, ControlGroup } from 'zent/lib/design/editor/DesignEditor';
import {
    NAV_TYPE,
    IMAGE_NAV_LIMIT,
    IMAGE_NAV_ENTRY_UUID_KEY,
    IMAGE_NAV_DND_TYPE,
    NAV_SLIDE
} from './constants';
import { NavEntry, createEmptyImageNavEntry } from './NavEntry';
import styles from './index.less'
import type1 from '../../../../assets/image-nav1.png'
import type2 from '../../../../assets/image-nav2.png'
const RadioGroup = Radio.Group;
const { Row, Col } = Layout
export default class ImageNavEditor extends DesignEditor {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            localImage: ''
        };
    }
    render() {
        const data = [
            { id: 4, name: '4个导航' },
            { id: 5, name: '5个导航' },
            { id: 6, name: '6个导航' },
            { id: 7, name: '7个导航' },
            { id: 8, name: '8个导航' },
            { id: 9, name: '9个导航' },
            { id: 10, name: '10个导航' }
        ];

        const { prefix, showError, validation, value } = this.props;
        const { localImage } = this.state;
        const imageErrors = validation.images;
        const allowAddImage = this.isAddNavEntryAllowed();
        return (
            <div>
                <div className={`xkd-moduleTitle`} style={{fontSize:'14px'}}>图文导航</div>
                <div className={`${prefix}-design-component-image-ad-editor`}>
                    <Row>
                        <Col span={3}>
                        已选模块：
                        </Col>
                        <Col span={21}>
                            <div onClick={() => this.onLayoutChange(NAV_TYPE.IMAGES)} className={`${styles.layoutMode} ${value.layout == NAV_TYPE.IMAGES ?styles.active:''}`}>              
                            <div className={styles.box}>
                                <img src={type1} />
                            </div>
                            <div >图文导航</div>
                            </div>
                            <div onClick={() => this.onLayoutChange(NAV_TYPE.FONT)} className={`${styles.layoutMode} ${value.layout == NAV_TYPE.FONT ?styles.active:''}`}>              
                            <div className={styles.box}>
                                <img src={type2} />
                            </div>
                            <div > 文字导航</div>
                            </div>                                                                    
                        </Col>
                    </Row>
                    {/* <div onClick={() => this.onLayoutChange(NAV_TYPE.IMAGES)}>
                        {value.layout == NAV_TYPE.IMAGES ? "已选" : null}
                        图片导航
                    </div>
                    <div onClick={() => this.onLayoutChange(NAV_TYPE.FONT)}>
                        {value.layout == NAV_TYPE.FONT ? "已选" : null}
                        文子导航
                    </div> */}
                    <Row className="xkd-mt16">
                        <Col span={3}>
                            滑动设置：
                        </Col>
                        <Col span={21} className={styles.display}>
                            <ControlGroup
                                //label="滑动设置:"
                                showError={showError || this.getMetaProperty('slide', 'touched')}
                                error={validation.fillstyle}
                            >
                                <RadioGroup value={value.slide} onChange={this.onInputChange}>
                                    <Radio name="slide" value={NAV_SLIDE.FIXED}>
                                        固定
                                    </Radio>
                                    <Radio name="slide" value={NAV_SLIDE.SLIDE}>
                                        滑动
                                    </Radio>
                                </RadioGroup>
                            </ControlGroup>                       
                        </Col>            
                    </Row> 
                    {/* <ControlGroup
                        label="滑动设置:"
                        showError={showError || this.getMetaProperty('slide', 'touched')}
                        error={validation.fillstyle}
                    >
                        <RadioGroup value={value.slide} onChange={this.onInputChange}>
                            <Radio name="slide" value={NAV_SLIDE.FIXED}>
                                固定
                            </Radio>
                            <Radio name="slide" value={NAV_SLIDE.SLIDE}>
                                滑动
                            </Radio>
                        </RadioGroup>
                    </ControlGroup> */}
                    {
                        value.slide == NAV_SLIDE.SLIDE ? (
                            <Row className="xkd-mt16">
                                {/* <Col span={3}>
                                一屏显示：
                                </Col> */}
                                <Col span={21}>
                                    <div className="zent-design-editor__control-group-container">
                                        <div className="zent-design-editor__control-group-label">一屏显示：</div>
                                        <div className="zent-design-editor__control-group-control">
                                        <Select data={data} optionValue="id" optionText="name" value={value.linecount} onChange={(e) => this.onLineCountChange(e)} />
                                        </div>                            
                                    </div>                                
                                </Col>
                            </Row>  
                        ) : null
                    }
                    <Row className="xkd-mt16">
                        {/* <Col span={3}>
                            背景颜色：
                        </Col> */}
                        <Col span={21}>                        
                            <div className="zent-design-editor__control-group-container">
                                <div className="zent-design-editor__control-group-label">背景颜色：</div>
                                <div className="zent-design-editor__control-group-control">
                                    <ColorPicker color={value.bgcorlor} onChange={this.bgcorlorChange} />
                                    <a onClick={() => this.bgcorlorChange("#fff")}>重置</a>
                                </div>                            
                            </div> 
                        </Col>
                    </Row>
                    <Row className="xkd-mt16">
                        {/* <Col span={3}>
                        文字颜色：
                        </Col> */}
                        <Col span={21}>                                                
                            <div className="zent-design-editor__control-group-container">
                                <div className="zent-design-editor__control-group-label">文字颜色：</div>
                                <div className="zent-design-editor__control-group-control">
                                    <ColorPicker color={value.fontcorlor} onChange={this.fontcorlorChange} />
                                    <a onClick={() => this.fontcorlorChange("#000")}>重置</a>
                                </div>                            
                            </div> 
                        </Col>
                    </Row>                     
                    {/* <Droppable
                        droppableId={`${prefix}-design-component-image-nav-editor__entry-list`}
                        type={IMAGE_NAV_DND_TYPE}
                        direction="vertical"
                    >
                        {(provided, snapshot) => {
                            return (
                                <ul
                                    ref={provided.innerRef}
                                    className={`${prefix}-design-component-image-ad-editor__entry-list`}
                                >
                                    {value.images.map((img, index) => {
                                        const imageId = img[IMAGE_NAV_ENTRY_UUID_KEY];
                                        return (
                                            <li
                                                key={imageId||index}
                                                className={`${prefix}-design-component-image-ad-editor__entry`}
                                            >
                                                <NavEntry
                                                    prefix={prefix}
                                                    imageId={imageId||index}
                                                    imageUrl={img.imageUrl}
                                                    linkTitle={img.linkTitle}
                                                    linkUrl={img.linkUrl}
                                                    onChange={this.onNavEntryChange(imageId||index)}
                                                    index={index}
                                                    error={
                                                        showError && imageErrors ? imageErrors[imageId] : ''
                                                    }
                                                />
                                                {!snapshot.isDraggingOver && (
                                                    <Icon
                                                        type="close-circle"
                                                        className={`${prefix}-design-component-image-ad-editor__entry-close-btn`}
                                                        onClick={this.removeNavEntry(imageId)}
                                                    />
                                                )}
                                                {!snapshot.isDraggingOver &&
                                                    allowAddImage && (
                                                        <Icon
                                                            type="plus"
                                                            className={`${prefix}-design-component-image-ad-editor__entry-prepend-btn`}
                                                            onClick={this.prependNavEntry(imageId)}
                                                        />
                                                    )}
                                                {!snapshot.isDraggingOver &&
                                                    allowAddImage && (
                                                        <Icon
                                                            type="plus"
                                                            className={`${prefix}-design-component-image-ad-editor__entry-append-btn`}
                                                            onClick={this.appendNavEntry(imageId)}
                                                        />
                                                    )}
                                            </li>
                                        );
                                    })}
                                    {provided.placeholder}
                                </ul>
                            );
                        }}
                    </Droppable> */}
                    <Row className="xkd-mt16">           
                        <Col span={21} offset={3}>
                            <Droppable
                                droppableId={`${prefix}-design-component-image-ad-editor__entry-list`}
                                type={IMAGE_NAV_DND_TYPE}
                                direction="vertical"
                            >
                                {(provided, snapshot) => {
                                return (
                                    <ul
                                    ref={provided.innerRef}
                                    className={`${prefix}-design-component-image-ad-editor__entry-list`}
                                    >
                                    {value.images.map((img, index) => {
                                        const imageId = img[IMAGE_NAV_ENTRY_UUID_KEY];
                                        return (
                                        <li
                                            key={imageId}
                                            className={`${prefix}-design-component-image-ad-editor__entry`}                                            
                                        >
                                            <NavEntry
                                            prefix={prefix}
                                            imageId={imageId}
                                            imageUrl={img.imageUrl}
                                            linkTitle={img.linkTitle}
                                            linkUrl={img.linkUrl}
                                            linkUrlTitle={img.linkUrlTitle}
                                            onChange={this.onNavEntryChange(imageId||index)}
                                            index={index}
                                            layout={value.layout}
                                            error={
                                                showError && imageErrors ? imageErrors[imageId] : ''
                                            }
                                            />
                                            {!snapshot.isDraggingOver && (
                                            <Icon
                                                type="close-circle"
                                                className={`${prefix}-design-component-image-ad-editor__entry-close-btn`}
                                                onClick={this.removeNavEntry(imageId)}
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
                    {/* {allowAddImage && (
                        <a
                            className={`${prefix}-design-component-image-ad-editor__add-entry-btn`}
                            onClick={this.onAddNavEntry}
                        >
                            <b>+</b>添加一个导航

                    </a>
                    )} */}
                    {allowAddImage && (
                        <Row>          
                            <Col span={21} offset={3}>
                            <a
                                className={`${prefix}-design-component-image-ad-editor__add-entry-btn xkd-border-dash xkd-border-color-e8`}
                                onClick={this.onAddNavEntry}
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
                        最多添加 {IMAGE_NAV_LIMIT} 个导航，拖动选中的图片导航可对其排序
                    </div> */}
                </div>
            </div>
        );
    }
    static designType = 'image-nav';
    static designDescription = (
        <span>
            图文导航
      </span>
    );
    shouldHandleDragEnd(type) {
        return type === IMAGE_NAV_DND_TYPE;
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
    bgcorlorChange = (color) => {
        let bgcorlor = color;
        this.props.onChange({ bgcorlor });
    }
    fontcorlorChange = (color) => {
        let fontcorlor = color;
        this.props.onChange({ fontcorlor });
    }
    onLayoutChange = (layout) => {
        //const { target: { files } } = evt;
        this.props.onChange({ layout });
    };

    onAddNavEntry = () => {
        // const { target: { files } } = evt;
        // const imageUrl = createObjectURL(files[0]);
        //const imageUrl = "https://testfile.xiaokeduo.com/system/StoreAdmin/Shop/Public/images/diy/waitupload.png";
        const imageUrl="https://img.yzcdn.cn/public_files/2018/03/08/837f3d12e14b299778ae5fea5c05a3a3.png";
        const { value, onChange } = this.props;
        onChange({
            images: value.images.concat(createEmptyImageNavEntry({ imageUrl,width:160,height:160 }))
        });
    };
    appendNavEntry = id => () => {
        const { value: { images }, onChange } = this.props;
        const index = findIndex(images, img => img[IMAGE_NAV_ENTRY_UUID_KEY] === id);
        if (index !== -1) {
            const newImages = images.slice();
            newImages.splice(index + 1, 0, createEmptyImageNavEntry());
            onChange({
                images: newImages
            });
        }
    };

    onNavEntryChange = id => delta => {
        const { value: { images }, onChange } = this.props;
       
        onChange({
           
            images: images.map(img => {
                if (img[IMAGE_NAV_ENTRY_UUID_KEY] !== id) {
                    return img;
                }
                return {
                    ...img,
                    ...delta
                };
            })
        });
    };
    removeNavEntry = id => () => {
        const { value: { images }, onChange } = this.props;
        onChange({
            images: images.filter(img => img[IMAGE_NAV_ENTRY_UUID_KEY] !== id)
        });
    };
    prependNavEntry = id => () => {
        const { value: { images }, onChange } = this.props;
        const index = findIndex(images, img => img[IMAGE_NAV_ENTRY_UUID_KEY] === id);
        if (index !== -1) {
            const newImages = images.slice();
            newImages.splice(index, 0, createEmptyImageNavEntry());
            onChange({
                images: newImages
            });
        }
    };
    onLineCountChange = (e) => {
        let linecount = e.target.value;
        this.props.onChange({ linecount });
      
    };
    static getInitialValue() {
        return {
            slide: NAV_SLIDE.FIXED,
            layout: NAV_TYPE.IMAGES,
            linecount: 4,
            bgcorlor: "#fff",
            fontcorlor: "#000",
            space: 0,
            images: []
        };
    }
    isAddNavEntryAllowed() {
        const { value: { images } } = this.props;
        return images.length < IMAGE_NAV_LIMIT;
    }
    static validate(value) {
        return new Promise(resolve => {
            const errors = {};
            errors.images = value.images.reduce((imageErrors, img) => {
                if (!img.imageUrl) {
                    imageErrors[img[IMAGE_NAV_ENTRY_UUID_KEY]] = '请选择导航图片';
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