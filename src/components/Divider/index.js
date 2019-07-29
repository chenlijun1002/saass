import React, { PureComponent, Fragment } from 'react';

import styles from './index.less'

export default class Divider extends React.PureComponent {        
  render() {
    const {
      type,   
    } = this.props;       
    return (
        type!=='vertical'?<div className={styles.line} {...this.props}></div>:(
          <div className={styles.vertical} {...this.props}></div>
        )
    );
  }
}
