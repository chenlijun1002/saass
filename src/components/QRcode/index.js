import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import svgpath from 'svgpath';
import qr from 'qr-image';
import { relative } from 'path';
export default class CodePainterExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null, // 保存二维码SVG的path
    };
  }
  componentWillMount() {
    const { QR_path } = this.props;
    const originPath = qr.svgObject(QR_path).path; //  获得二维码的绘制路径
    this.setState({ path: originPath });
  }
  render() {
    const { QR_path } = this.props;
    const originPath = qr.svgObject(QR_path).path;
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <svg
          style={{ position: 'absolute', top: 0, left: 0 }}
          ref={ref => (this._qrcodeSVG = ref)}
          transform="scale(2)"
        >
          <path d={QR_path ? originPath : null} />
        </svg>
      </div>
    );
  }
}
