import React, { Component } from 'react';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { NAV_TYPE, IMAGE_NAV_ENTRY_UUID_KEY } from './constants';
import styles from '../index.less';
// function getImgHeight(w,src){
//   console.log(w,src)
//   if(!src){
//     return;
//   }
//   var img=document.createElement('img');//创建一个img元素 
//   img.src=src;//指定src 
//   img.style.position="absolute";//防止正常的内容变形 
//   img.style.visibility='hidden';//藏起来 
//   var inj=document.body.appendChild(img);//插入到box中。当然插入到document.body也可以   
//   let height=inj.offsetHeight*w/inj.offsetWidth;
//   document.body.removeChild(img);
//   return height;
// }
function getImgHeight(w,obj){ 
  if(!obj){
    return;
  }   
  let height=obj.offsetHeight*w/obj.offsetWidth; 
  return height;
}
export default class ImageNavPreview extends Component {
  transform = num => {
    let text = '';
    if (num == 1) {
      text = '一';
    } else if (num == 2) {
      text = '二';
    } else if (num == 3) {
      text = '三';
    } else if (num == 4) {
      text = '四';
    } else if (num == 5) {
      text = '五';
    } else if (num == 6) {
      text = '六';
    } else if (num == 7) {
      text = '七';
    } else if (num == 8) {
      text = '八';
    } else if (num == 9) {
      text = '九';
    } else {
      text = '十';
    }
    return text;
  };
  isShow = arr =>{
    if(arr.length){
      for(let i=0;i<arr.length;i++){
        if(arr[i].linkTitle){
          return true;
        }
      }
    }
    return false;
  }
  render() {
    const { value, prefix } = this.props;
    const { slide, layout, linecount, bgcorlor, fontcorlor, images } = value;    
    if (isEmpty(images)) {
      return (
        <div
          className={cx(
            `${prefix}-design-component-image-ad-preview`,
            `${prefix}-design-component-image-ad-preview--no-data`
          )}
        >
            <div className={styles.brandColor}>
                点击编辑图文导航
            </div>   
        </div>
      );
    }
    return (
      <div className="rc-design-vue-preview rc-design-component-image-text-nav-preview">
        <div className="image-ad__image-nav">
          {images.map((img, index) => {
            const id = img[IMAGE_NAV_ENTRY_UUID_KEY];
            const url = img.linkUrl || 'javascript:void(0);';
            const title = img.linkTitle;           
            return (
              <div
                className="image-wrapper"
                style={{
                  width:
                    slide == 1 ? `${100 / images.length}%` : `calc((100% - 10px)/${linecount - 1})`,                  
                }}
                key={index}
              >                
                {
                  layout==1?
                  (
                  <a className="cap-image-ad__link cap-image-ad__link--image-nav" key={index}>
                  <div className="image-ad__image" style={{height:`${getImgHeight(320/images.length,images[0])}px`}}>
                    {layout == 1 ? (
                      slide == 1 ? (
                        <img src={img.imageUrl} alt={title} style={{width:'100%',height:`${(320 / images.length)/(images[0].width/images[0].height)}px`,}}/>
                      ) : (
                        <div style={{width:'100%',height:`${(320 / images.length)/(images[0].width/images[0].height)}px`,}}>
                          <img src={img.imageUrl} alt={title} style={{width:'100%',height: `${(320 / images.length)/(images[0].width/images[0].height)}px`,}}/>
                        </div>
                      )
                    ) : null}
                  </div>
                  {layout == 1 ?   (
                      this.isShow(images)?
                      (
                      <h3
                      className="image-ad__nav-title"
                      style={{ color: `${fontcorlor}`, backgroundColor: `${bgcorlor}` }}
                    >
                      {title}
                    </h3>
                    ):null
                  ) : (
                    <h3
                      className="image-ad__text-nav-title"
                      style={{ color: `${fontcorlor}`, backgroundColor: `${bgcorlor}` }}
                    >
                      {title}
                    </h3>
                    
                  )}
                </a>
                  )
                :(
                <a className="cap-image-ad__link cap-image-ad__link--image-nav" key={index}>
                <div className="image-ad__image" >
                  {layout == 1 ? (
                    slide == 1 ? (
                      <img src={img.imageUrl} alt={title} style={{width:'100%',height:`${(320 / images.length)/(images[0].width/images[0].height)}px`}}/>
                    ) : (
                      <div>
                        <img src={img.imageUrl} alt={title} style={{width:'100%',height:`${(320 / images.length)/(images[0].width/images[0].height)}px`}}/>
                      </div>
                    )
                  ) : null}
                </div>
                {layout == 1 ? (                   
                  this.isShow(images)?
                      (
                     <h3
                    className="image-ad__nav-title"
                    style={{ color: `${fontcorlor}`, backgroundColor: `${bgcorlor}` }}
                  >
                    {title }
                  </h3>
                    ):null
                
                ) : (
                   <h3
                    className="image-ad__text-nav-title"
                    style={{ color: `${fontcorlor}`, backgroundColor: `${bgcorlor}` }}
                  >
                    {title}
                  </h3>
                 
                )}
              </a>
                )
                }
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
