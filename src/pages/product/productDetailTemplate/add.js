import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Button, message, Spin } from 'antd';
import SelectPath from '@/components/plugins/selectPath/index';
import { Design } from 'zent';
import configConf from './config/index';
import ConfigEditor from './config/ConfigEditor';
import whitespaceConf from '../../store/microPage/whitespace/index';
import lineConf from '../../store/microPage/line/index';
import richtextConf from '../../store/microPage/richtext/index';
import imageAdConf from '../../store/microPage/imagead/index';
import videoConf from '../../store/microPage/video/index';
import imagenavConf from '../../store/microPage/imagenav/index';
import storebanner from '../../store/microPage/storebanner/index';
import imageHotArea from '../../store/microPage/imageHotArea/index';
import baseInfoConf from './productBaseInfo/index';
import baseInfoEditor from './productBaseInfo/baseInfoEditor';
import detailConf from './productDetail/index';
import detailEditor from './productDetail/detailEditor';
import 'zent/css/index.css';
import 'zent/css/design-config.css';
import 'zent/css/design-whitespace.css';
import 'zent/css/design-line.css';
import 'zent/css/design-image-ad.css';

const namespace = 'micropage';
const components = [
  Object.assign({}, configConf, {
    dragable: false, // 是否可以拖拽
    appendable: false, // 是否出现在底部的添加组件区域
    // editable: true,// 是否可以编辑，UMP里面有些地方config是不能编辑的
    configurable: false,
    highlightWhenSelect: false,
  }),
  richtextConf,
  imageAdConf,
  videoConf,
  imagenavConf,
  Object.assign({ limit: 1 }, storebanner),
  imageHotArea, // 热区
  whitespaceConf,
  lineConf,
];
const groupedComponents = [
  Object.assign({}, configConf, {
    dragable: false, // 是否可以拖拽
    appendable: false, // 是否出现在底部的添加组件区域
    // editable: true,// 是否可以编辑，UMP里面有些地方config是不能编辑的
    configurable: false,
    highlightWhenSelect: false,
  }),
  Design.group('基础组件'),
  richtextConf,
  imageAdConf,
  imagenavConf,
  Object.assign({ limit: 1 }, storebanner),
  videoConf,
  imageHotArea, // 热区
  Design.group('其他组件'),
  whitespaceConf,
  lineConf,
  Object.assign({}, baseInfoConf, {
    dragable: false, // 是否可以拖拽
    appendable: false, // 是否出现在底部的添加组件区域
    // editable: true,// 是否可以编辑，UMP里面有些地方config是不能编辑的
    configurable: false,
    //highlightWhenSelect: false,
  }),
  Object.assign({}, detailConf, {
    //dragable: false, // 是否可以拖拽
    appendable: false, // 是否出现在底部的添加组件区域
    // editable: true,// 是否可以编辑，UMP里面有些地方config是不能编辑的
    configurable: false,
    //highlightWhenSelect: false,
  }),
];
class Simple extends Component {
  state = {
    grouped: true,
    value: [
      {
        type: configConf.type,
        ...ConfigEditor.getInitialValue(),
      },
      {
        type:baseInfoConf.type,
        ...baseInfoEditor.getInitialValue(),
      },
      {
        type:detailConf.type,
        ...detailEditor.getInitialValue(),
      }
    ],
    settings: {
      previewBackground: '#fff',
    },
    pageId: 0,
    id: 0,
    type: 0,
  };

  componentWillMount() {
    const { dispatch, match } = this.props;
    const id = match.params.id ? match.params.id / 1 : 0;
    const type = `/${window.storeId}/store/pages/edit/${match.params.id}` === match.url ? 1 : 2;
    this.setState({
      id,
      type,
    });
    // dispatch({
    //     type: `${namespace}/Detail`,
    //     params: { id: id },
    //     callback: data => {
    //         if (data.DataJson) {
    //         data.DataJson.forEach(item => {
    //             if (item.type === 'image-hot') {
    //             item.images.forEach(v => {
    //                 const imageUrl = v.imageUrl;
    //                 v.imageUrl = `${imageUrl}?x-oss-process=style/720`;
    //             });
    //             }
    //             if (item.type === 'storebanner') {
    //             const shareimg = item.shareimg;
    //             item.shareimg =
    //                 `${shareimg}?x-oss-process=style/720` ||
    //                 'http://insidexkd.oss-cn-shanghai.aliyuncs.com/xkdnewyun/Template/t1/images/storeBackground.png?x-oss-process=style/720';
    //             }
    //             if (item.type === 'image-nav' || item.type === 'image-ad') {
    //             item.images.forEach(v => {
    //                 const imageUrl = v.imageUrl;
    //                 v.imageUrl = `${imageUrl}?x-oss-process=style/720`;
    //             });
    //             }
    //         });
    //         }
    //         this.setState({
    //         value: data.DataJson || [],
    //         settings: { previewBackground: data.BgColor },
    //         });
    //     },
    // });
  }

  onChange = newValue => {
    this.setState({
      value: newValue,
    });
  };
  
  saveDesign = instance => {
    this.design = instance && instance.getDecoratedComponentInstance();
  };

  submit = () => {
    this.triggerDesignValidation()
      .then(() => {
        const { dispatch } = this.props;
        const { value, pageId: id } = this.state;
        const microinfo = value[0];
        const datajson = value;
        //const id = this.state.pageId;
        const clonedata = { ...microinfo, DataJson: JSON.stringify(datajson), Id: id };
        console.log(clonedata)
        return;
        // dispatch({
        //   type: 'micropage/Changedata',
        //   payload: clonedata,
        // });
        dispatch({
          type: 'productDetail/CreateTemplate',
          payload: clonedata,
          callback: {
            success: res => {
              if (res.Code === 0) {
                message.success('提交成功');
                setTimeout(() => {
                  router.replace(
                    {
                      pathname: `/${window.storeId}/goods/detailtemplates`,
                    },
                    1500
                  );
                });
              } else {
                message.error(res.Msg);
              }
            },
          },
        });
        this.design.markAsSaved();
      })
      .catch(validations => {
        console.log(validations);
      });
  };

  triggerDesignValidation() {
    return this.design.validate();
  }

  render() {
    const { grouped, id, type, settings, value } = this.state;
    const { submitLoading, draftLoading, loading1, loading2 } = this.props;
    console.log(value,88)
    return (
      <Fragment>
        <Spin spinning={id === 0 ? false : type === 1 ? loading1 : loading2}>
          <Card>
            <Design
              ref={this.saveDesign}
              cache={false}
              cacheId="zent-design-test"
              confirmUnsavedLeave={false}
              components={grouped ? groupedComponents : components}
              value={value}
              onChange={this.onChange}
              //settings={settings}
              //onSettingsChange={this.onSettingsChange}
              scrollTopOffset={-270}
              globalConfig={window._global}  
             // preview={imageAdConf}            
            />
          </Card>
        </Spin>
        <div className="xkd-bottom-actions">
          <Button onClick={this.notImplemented} className="xkd-mr16">取消</Button>
          <Button
            type="primary"
            onClick={this.submit}
            loading={submitLoading}
            disabled={id === 0 ? false :  loading1 }
          >
            保存
          </Button>          
        </div>       
      </Fragment>
    );
  }
}
export default connect(({ loading, storeinfo }) => ({
  loading2: loading.effects['micropage/DraftDetail'],
  loading1: loading.effects['micropage/Detail'],
  draftLoading: loading.effects['micropage/SaveDraft'],
  submitLoading: loading.effects['micropage/AddPage'],
  storeinfo: storeinfo,
}))(Simple);
