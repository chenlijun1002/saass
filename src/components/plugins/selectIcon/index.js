import { Dialog, Tag } from 'zent';
import { Spin } from 'antd';
import styles from './index.less';
const SelectIcon = ({
  visible,
  onIconModalCancel,
  iconList,
  selectedIconList,
  onSelectIcon,
  currentSelectedIcon,
  currentIconType,
  changeColorTab,
  showTab,
  loading
}) => {    
  return (
    <Dialog
      width={640}
      title={'选择图标'}
      visible={visible}
      onClose={onIconModalCancel}
      //footer={null}
      className={styles['icon-modal']}
    >
      <Spin spinning={loading} style={{minHeight:400}}>
      {
        showTab?
        <div
          style={{
            height: '48px',
            lineHeight: '48px',
            background: 'rgba(250,250,250,1)',
            textAlign: 'center',
            padding: '8px 0',
            marginBottom: 24,
          }}
        >
          <Tag
            color="#fff"
            borderColor="#D9D9D9"
            outline
            style={{ height: 26, marginRight: 16, padding: '4px' }}
            className={`xkd-pad0 xkd-cursor-pointer xkd-border-radius4 ${
              currentIconType == 1 ? styles.active : ''
            }`}
          >
            <div
              style={{ width: 28, height: 16, background: '#FF476C' }}
              className="xkd-margin4"
              onClick={() => changeColorTab(1)}
            />
          </Tag>
          <Tag
            color="#fff"
            borderColor="#D9D9D9"
            outline
            style={{ height: 26, marginRight: 16, padding: '4px' }}
            className={`xkd-pad0 xkd-cursor-pointer xkd-border-radius4 ${
              currentIconType == 2 ? styles.active : ''
            }`}
          >
            <div
              style={{ width: 28, height: 16, background: '#C3A769' }}
              className="xkd-margin4"
              onClick={() => changeColorTab(2)}
            />
          </Tag>
          <Tag
            color="#fff"
            borderColor="#D9D9D9"
            outline
            style={{ height: 26, marginRight: 16, padding: '4px' }}
            className={`xkd-pad0 xkd-cursor-pointer xkd-border-radius4 ${
              currentIconType == 3 ? styles.active : ''
            }`}
          >
            <div
              style={{ width: 28, height: 16, background: '#02B8B1' }}
              className="xkd-margin4"
              onClick={() => changeColorTab(3)}
            />
          </Tag>
          <Tag
            color="#fff"
            borderColor="#D9D9D9"
            outline
            style={{ height: 26, marginRight: 16, padding: '4px' }}
            className={`xkd-pad0 xkd-cursor-pointer xkd-border-radius4 ${
              currentIconType == 4 ? styles.active : ''
            }`}
          >
            <div
              style={{ width: 28, height: 16, background: '#FCC600' }}
              className="xkd-margin4"
              onClick={() => changeColorTab(4)}
            />
          </Tag>
          <Tag
            color="#fff"
            borderColor="#D9D9D9"
            outline
            style={{ height: 26, padding: '4px' }}
            className={`xkd-pad0 xkd-cursor-pointer xkd-border-radius4 ${
              currentIconType == 5 ? styles.active : ''
            }`}
          >
            <div
              style={{ width: 28, height: 16, background: '#2e74ff' }}
              className="xkd-margin4"
              onClick={() => changeColorTab(5)}
            />
          </Tag>
        </div>:null
      }
      <div style={{ overflow: 'hidden' }}>
        <div className={styles['icon-list']}>
          {iconList.map((v, i) => (
            <div
              key={i}
              className={
                currentSelectedIcon === selectedIconList[i]
                  ? `${styles['icon-item']} ${styles.selected} ${(i + 1) % 8 == 0 ? styles['mr0'] : ''}`
                  : `${styles['icon-item']} ${(i + 1) % 8 == 0 ? styles['mr0'] : ''}`
              }
              onClick={() => onSelectIcon({ icon: v, selectedIcon: selectedIconList[i] })}
            >
              <div className={`${styles.line} ${styles.item}`}>
                <img src={v} />
              </div>
              <div className={styles.item}>
                <img src={selectedIconList[i]} />
              </div>
            </div>
          ))}
        </div>
      </div>
      </Spin>
    </Dialog>
  );
};
export default SelectIcon;
