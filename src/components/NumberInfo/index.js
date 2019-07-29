import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export default ({ subTitle, total, descript, action, pic, theme }) => {
  console.log(subTitle, total, descript, action, '====');
  return (
    <div
      className={classNames(styles.numberInfo, {
        [styles[`numberInfo${theme}`]]: theme,
      })}
      //{...rest}
    >
      <div className={styles.numberInfoTitle}>{subTitle}</div>
      {!subTitle && <div className={styles.numberInfoSubTitle}>{subTitle}</div>}
      <div className={styles.numberInfoValue}>
        <span>{total}</span>
        {pic ? <div style={{ marginTop: 24, textAlign: 'center' }}>{pic}</div> : null}
      </div>
      <div style={{ marginTop: '32px', marginBottom: '24px' }}>{descript}</div>
      <div>{action}</div>
    </div>
  );
};
