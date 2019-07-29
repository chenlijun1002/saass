import React, { PureComponent, Fragment } from 'react';
import styles from './index.less'

export default class Divider extends React.PureComponent {        
  render() {
    const {
      type,   
    } = this.props;       
    return (
        <div className={styles.container}>
            暂未开放，敬请期待            
        </div>
    );
  }
}
