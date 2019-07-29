import React, { Component } from 'react';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import styles from '../index.less';


function getImgHeight(w, obj) {
  if (!obj) {
    return;
  }
  let height = (obj.offsetHeight * w) / obj.offsetWidth;
  return height;
}

export default class HotAreaPreview extends Component {
  render() {
    const { value, prefix } = this.props;
    const { layout, linecount, bgcorlor, fontcorlor, images, fillstyle } = value;
    if (isEmpty(images)) {
      return (
        <div
          className={cx(
            `${prefix}-design-component-image-ad-preview`,
            `${prefix}-design-component-image-ad-preview--no-data`
          )}
        >
          <div style={{position:'relative',width:'100%',height:100}}>
            <div
              className={`${styles.brandColor} ${styles.occupancyWindow}`}
            >点击编辑图片广告<br/>建议宽度750像素</div>            
          </div>   
        </div>
      );
    }
    return (
      <div className="rc-design-vue-preview rc-design-component-image-text-nav-preview">
        <div className="image-ad__image-nav">
          {images &&
            images.map((img, index) => {
              return (
                <div
                  className="image-wrapper"
                  style={{ width: '100%', display: 'block' }}
                  key={index}
                >
                  {
                    <a className="cap-image-ad__link cap-image-ad__link--image-nav" key={index}>
                      <div
                        className="image-ad__image"
                        style={{
                          backgroundImage: `url(${img.imageUrl})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          backgroundSize: `${fillstyle === 1 ? 'cover' : 'contain'}`,
                        }}
                      >
                        <img src={img.imageUrl} style={{ width: '100%', height: '100%' }} />
                      </div>
                    </a>
                  }
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
