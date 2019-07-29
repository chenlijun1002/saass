import React, { Component, Fragment } from 'react';
import {Swiper} from 'zent'
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { FILLSTYLE, IMAGE_AD_ENTRY_UUID_KEY,IMAGE_LAYOUT } from './constants';
import Redirect from 'umi/redirect';
import styles from '../index.less';
// function getImgWidth(w,src){
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
// function getL(src){
//   if(!src){
//     return;
//   }
//   var img=document.createElement('img');//创建一个img元素 
//   img.src=src;//指定src 
//   img.style.position="absolute";//防止正常的内容变形 
//   img.style.visibility='hidden';//藏起来 
//   var inj=document.body.appendChild(img);//插入到box中。当然插入到document.body也可以   
//   let L=inj.offsetWidth/inj.offsetHeight;
//   document.body.removeChild(img);
//   return L;
// }
// function setWidth(l,w,h,src){
//   //console.log(l,w,h,src);
//   if(!src||!w){
//     return;
//   }
//   var img=document.createElement('img');//创建一个img元素 
//   img.src=src;//指定src 
//   img.style.position="absolute";//防止正常的内容变形 
//   img.style.visibility='hidden';//藏起来 
//   var inj=document.body.appendChild(img);//插入到box中。当然插入到document.body也可以   

//   let width=inj.offsetWidth*h/inj.offsetHeight;    
//   if(w-width>0){    
//     return h/inj.offsetHeight*inj.offsetWidth;
//   }else{
//     return ''
//   }
//   document.body.removeChild(img); 
// }
function getImgWidth(w,obj,n){ 
  if(!obj){
    return;
  }   
  let height=obj.height*w/obj.width; 
  return height;
}
function getL(obj){
  if(!obj){
    return;
  }    
  let L=obj.width/obj.height; 
  return L;
}
function setWidth(l,w,h,obj){
  //console.log(l,w,h,src);
  if(!obj||!w){
    return;
  }  
  let width=obj.width*h/obj.height;    
  if(w-width>0){    
    return h/obj.height*obj.width;
  }else{
    return ''
  }  
}
function imgload(e,w){
  console.log(e,w,999)
}
export default class ImageAdPreview extends Component {
  render() {
    const { value, prefix } = this.props;
    const { fillstyle, images ,space} = value;   
    if (isEmpty(images)) {
      return (
        <div
          className={cx(
            `${prefix}-design-component-image-ad-preview`,
            `${prefix}-design-component-image-ad-preview--no-data`
          )}
        >
          <div style={{position:'relative',width:'100%',height:100}}>
            <div className={`${styles.brandColor} ${styles.occupancyWindow}`}>
              点击编辑图片广告<br/>建议宽度750像素
            </div>            
          </div>         
        </div>
      );
    }
    return (
      // <div
      //   className={cx(`${prefix}-design-component-image-ad-preview`, {
      //     [`${prefix}-design-component-image-ad-preview--large`]:
      //       fillstyle === FILLSTYLE.FILL,
      //     [`${prefix}-design-component-image-ad-preview--small`]:
      //     fillstyle === FILLSTYLE.SPACE
      //   })}
      // >
      //   {images.map(img => {
      //     const id = img[IMAGE_AD_ENTRY_UUID_KEY];
      //     // eslint-disable-next-line
      //     const url = img.linkUrl || 'javascript:void(0);';
      //     const title = img.linkTitle;
      //     return (
      //       <a
      //         key={id}
      //         className={`${prefix}-design-component-image-ad-preview__image`}
      //         href={url}
      //         target="_blank"
      //         rel="noopener noreferrer"
      //       >
      //         <div
      //           className={`${prefix}-design-component-image-ad-preview__image-img`}
      //         >
      //           <img src={img.imageUrl} alt={title} />
      //           {title && (
      //             <div
      //               className={`${prefix}-design-component-image-ad-preview__image-title`}
      //             >
      //               {title}
      //             </div>
      //           )}
      //         </div>
      //       </a>
      //     );
      //   })}
      // </div>
      <div className="swiper-preview-container">
      {
         value.layout==IMAGE_LAYOUT.ROTATION?
          (
            <Swiper
            className="swiper-preview-item"
            autoplay
          >
            {
              images.map((v, i) => {
                return <div className="swiper-preview-item-h" key={i} style={{height:`${getImgWidth(320,images[0])}px`,overflow:'hidden',background:`url(${v.imageUrl})`}} data-o={`${getImgWidth(320,images[0])}px`}>
                  <div style={{height:`${getImgWidth(320,images[0],'----')}px`,backgroundImage:`url(${v.imageUrl})`,backgroundRepeat:'no-repeat',backgroundPosition:'center', backgroundSize:`${fillstyle==1?'cover':'contain'}`}}>
                    <img src={v.imageUrl} style={{opacity:0,width:"100%",height:'100%'}} />
                  </div>
                </div>;
              })
            }
          </Swiper>            
          ):
          value.layout==IMAGE_LAYOUT.ONELINE?(
            <div>
              <ul>
                {
                  images.map((v,i)=>{
                    return(
                    <li style={{margin:`${value.space}px 0`}} key={i} >
                      <div className="swiper-preview-item-h">
                        <img src={v.imageUrl} />
                      </div>
                    </li>
                    )
                  })
                }
              </ul>
            </div>
          ):
          value.layout==IMAGE_LAYOUT.SLIDELARGE?(
            <div className="xkd-overflow-hidden">
               <ul  style={{overflow:'hidden',whiteSpace:'nowrap',height:`${getImgWidth(281,images[0])}px`}}>
               {
                  images.length>0?
                  (
                  <Fragment>
                  {
                    images.map((item,index)=>{
                      //let otherW=setWidth(getL(images[0]),(320-281),getImgWidth(281,images[0]),images[0]);
                      let otherW=item.width*getImgWidth(281,images[0])/item.height;
                      return(
                      index==0?
                        <li    className="xkd-inline-block small" style={{marginRight:value.space,width:`281px`}} key={index}>
                          <div className="swiper-preview-item-h" >
                            <img src={item.imageUrl?item.imageUrl:''} />
                          </div>
                        </li>
                        :
                        <li  key={index}  className="xkd-inline-block small">
                          <div className="swiper-preview-item-h" style={{marginRight:value.space,width:`${otherW}px`}}>
                            <img src={item.imageUrl?item.imageUrl:''} />
                          </div>
                        </li>
                    )
                  })
                  }
                  </Fragment> 
                  ) :null
                }
              </ul>
            </div>
          ):value.layout==IMAGE_LAYOUT.SLIDESMALL?(
            <div className="xkd-overflow-hidden">
               <ul  style={{overflow:'hidden',whiteSpace:'nowrap',height:`${getImgWidth(128,images[0])}px`}}>
                {
                  images.length>0?
                  (
                  <Fragment>
                    {
                      images.map((item,index)=>{
                        //let otherW=setWidth(getL(images[0]),(320-128),getImgWidth(128,images[0]),item.imageUrl); 
                        let otherW=item.width*getImgWidth(128,images[0])/item.height;                       
                        return (
                          index==0?
                          <li    className="xkd-inline-block small" style={{marginRight:value.space,width:`128px`}} key={index}>
                            <div className="swiper-preview-item-h" >
                              <img src={item.imageUrl?item.imageUrl:''} />
                            </div>
                          </li>:
                          <li  key={index}  className="xkd-inline-block small" >
                          <div className="swiper-preview-item-h" style={{marginRight:value.space,width:`${otherW}px`}} >
                            <img src={item.imageUrl?item.imageUrl:''} />
                          </div>
                        </li>
                        )
                      })
                       
                    }
                   
                    
                  </Fragment> 
                  ) :null
                }
              </ul>
            </div>
          ):value.layout==IMAGE_LAYOUT.SLIDESNAV?(
            <div className="xkd-overflow-hidden">
               <ul  style={{overflow:'hidden',whiteSpace:'nowrap',height:`${getImgWidth(60,images[0])}px`}}>
               
                {
                      images.map((item,index)=>{
                        //let otherW=setWidth(getL(images[0].imageUrl),(320-60),getImgWidth(60,`${images[0]?images[0].imageUrl:''}`),item.imageUrl); 
                        let otherW=item.width*getImgWidth(60,images[0])/item.height;                       
                        return (
                          index==0?
                          <li    className="xkd-inline-block small" style={{marginRight:value.space,width:`60px`}} key={index}>
                            <div className="swiper-preview-item-h" >
                              <img src={item.imageUrl?item.imageUrl:''} />
                            </div>
                          </li>:
                          <li  key={index}  className="xkd-inline-block small" >
                          <div className="swiper-preview-item-h" style={{marginRight:value.space,width:`${otherW}px`}} >
                            <img src={item.imageUrl?item.imageUrl:''} />
                          </div>
                        </li>
                        )
                      })
                       
                    }
              </ul>
            </div>
          ):<span></span>
        }
      </div>
    );
  }
}