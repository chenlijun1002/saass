import React, { Component } from 'react';
import play from '../../../../assets/play.png';
export default class VideoPreview extends Component {
  render() {
    const { value } = this.props;
    let { videoimg, videourl } = value;

    return (
      <div className="video-container">

        <video controls="controls"  poster={videoimg} src={videourl}>
          当前浏览器不支持最新的video播放
        </video>
        
        {videoimg ? (
          <div style={{ position: 'relative', height: 165 }}>
            <img
              src={play}
              style={{
                position: 'absolute',
                width: 50,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
