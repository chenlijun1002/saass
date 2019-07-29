import React, { PureComponent } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import styles from './Footer.less';
import bottomLogo from '../assets/bottomLogo.png'

// const GlobalFooter = ({ className, links, copyright }) => {
//   const clsString = classNames(styles.globalFooter, className);
//   console.log(this.props,77)

//   return (
//     <div className={clsString} id="globalFooter">
//       <img className={styles.copyrightImg} src={bottomLogo} />
//       {copyright && <div className={styles.copyright}>copyright 2018 XXXXXXX出品</div>}
//     </div>
//   );
// };
class GlobalFooter extends PureComponent{
  render(){
    const clsString = classNames(styles.globalFooter, className);
    const { className, links, copyright } = this.props;
    //console.log(this.props,77)
    return (
      <div className={clsString} id="globalFooter">
        <img className={styles.copyrightImg} src={bottomLogo} />
        {/* <div className={styles.copyright}>copyright 2018 XXXXXXX出品</div> */}
        {/* {copyright && <div className={styles.copyright}>copyright 2018 XXXXXXX出品</div>} */}
      </div>
    );
  }
}
export default connect(({ global }) => ({
  menus: global.menuData,
  storeLogo: global.oemInfo.storeLogo,
}))(GlobalFooter) ;
