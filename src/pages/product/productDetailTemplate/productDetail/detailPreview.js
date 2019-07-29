import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from '../index.less';

export default class ConfigPreview extends PureComponent {
  static propTypes = {
    value: PropTypes.object,

    // 用来和 Design 交互
    design: PropTypes.object,

    prefix: PropTypes.string,
  };

  render() {
    const { value, prefix } = this.props;    
    return (
      <div
          className={cx(
            `${prefix}-design-component-image-ad-preview`,
            `${prefix}-design-component-image-ad-preview--no-data`
          )}
        >
          <div style={{position:'relative',width:'100%',height:100}}>
            <div className={`${styles.brandColor} ${styles.occupancyWindow}`}>
              商品详情区
            </div>            
          </div>         
        </div>
    );
  }
}
