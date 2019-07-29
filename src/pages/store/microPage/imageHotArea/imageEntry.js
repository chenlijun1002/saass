import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import createObjectURL from 'zent/lib/utils/createObjectURL';
import cx from 'classnames';
import EditHotAreaModal from './editHotArea';
import { Badge, Icon} from 'antd';
import SelectedImage from '@/components/plugins/selectImage/index';
import styles from './index.less'

export default class ImageEntry extends Component {
  static propTypes = {
    prefix: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      localImage: '',
      contentType: '1',
      type:''
    };
  }

  // 点击图片弹出热区编辑弹窗
  openEditHotArea = index => {     
    this.props.clickImageIndex(index);
    this.editHotAreaModal.showEditModal();
  };

  editHotAreaModal = ref => {
    this.editHotAreaModal = ref;
  };

  showEditModal = () => {    
    this.editHotAreaModal.showEditModal();
  };

  // 点击切换图片
  clickChangeImage = index => {
    this.imgmodal.handleShowModal(); 
  }

  imgModal = (ref) => {   
    this.imgmodal = ref;
  }
  showModal = () => {
    this.imgmodal.handleShowModal();
  }

  onImageChange = res => {
    this.props.onChange({imageUrl:res.imageUrl,width:res.width,height:res.height});
    this.imgmodal.handleModalVisible();
  }

  render() {
    const {
      imageId,
      imageUrl,
      index,
      width,
      hotImageData,
      data,
    } = this.props;
    return (
      <div>
        <Draggable draggableId={imageId} index={index}>
          {(provided, snapshot) => {
              const style = {display: snapshot.isDragging ? 'block' : 'none'}
              return (
                <div>
                  <div
                    className={styles.draggableImage}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                      <div style={{ position: 'absolute', top: 8, left: 8 }}>
                        {hotImageData && hotImageData.length > 0 && (
                          <Badge
                            count={'已添加' + `${hotImageData.length}` + '个热区'}
                            style={{ backgroundColor: 'rgba(51,136,255,.5)' }}
                          />
                        )}
                      </div>
                      {hotImageData && hotImageData.map((item, index) => {        
                          const top = item.y/ 1.21;
                          const left = item.x/ 1.21;
                          const width = item.width/ 1.21;
                          const height = item.height/ 1.21;
                        return (
                          <div
                            key={index}
                            className={styles.hotAreaModalBox} 
                            style={{top: top,left: left,width: width,height: height}}
                            onClick={() => this.openEditHotArea(index)}
                          >
                            {item.PageName}
                          </div>
                        );
                      })}
                    <img src={imageUrl} width={'100%'} onClick={() => this.openEditHotArea(index)} style={{cursor: 'pointer'}}/>
                    <div className={styles.bottomChangeImage} onClick={() => this.clickChangeImage(index)}>
                        <div  style={{
                            display: 'flex',
                            justifyContent: 'center',
                            color: '#fff',
                            zIndex: 10,
                        }}>
                            <a style={{marginRight: 24, color: '#fff'}}>
                                    更改图片
                            </a>
                        </div>
                    </div>
                    <div className={styles.addIsDraggingModal} style={style}/>
                  </div>
                  {provided.placeholder}
                </div>
              );
          }}
        </Draggable>
        <EditHotAreaModal
          onRef={this.editHotAreaModal}
          img={imageUrl}
          clickEditHotAreaButton={this.props.clickEditHotAreaButton}
          hotImageData={hotImageData}
          index={index}
          data={data}
        />
        <SelectedImage onRef={this.imgModal}    selectImage={this.onImageChange}/>
      </div>
    );
  }
}
