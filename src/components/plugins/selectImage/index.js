import React, { PureComponent, Fragment } from 'react';
import {
  Form,
  message,
  Modal,
  Card,
  Menu,
  Select,
  Button,
  Icon,
  Upload,
  Input,
  Row,
  Col,
  List,
  Spin,
  Progress,
  Checkbox
} from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './index.less';
import router from 'umi/router';
const Search = Input.Search;
const FormItem = Form.Item;
const { Option } = Select;
const confirm = Modal.confirm;
@connect(({ imageplugin,global, loading }) => ({
  cdnUrl:global.oemInfo.cdnUrl,
  imageplugin,
  imageStsConfig: imageplugin.imageStsConfig,
  imageCategory: imageplugin.imageCategory,
  imageList: imageplugin.imageList,  
  loading: loading.effects['imageplugin/GetImageStsConfig'],
  loading2: loading.effects['imageplugin/GetImageCategory'],
  loading3: loading.effects['imageplugin/GetImageList'],  
}))
export default class SelectImage extends React.PureComponent {
  state = { 
    multiple:this.props.multiple||false,   
    paginationProps: {
      //showSizeChanger: true,
      //showQuickJumper: true,
      current: 1,
      pageSize: 18,
      total: 0,
    },
    categoryId:"-1",   
    selectCategoryId:0,
    disPlayName: '', 
    uploadVisible:false,
    previewVisible:false,
    confirmLoading:false,
    loading4:true,
    previewImage:'',
    fileList:[],
    selectedImg:{},
    selectedImgList:[],
    imageFilesList:[],
    visible:false  
  };
  componentWillMount() {
    const { dispatch } = this.props;

    
  }
  componentDidMount(){  
    this.props.onRef(this)
    //this.requestCategoryList();
    // if(this.props.visible){
    //   this.requestCategoryList();
    // }
    //this.requestList();
  }
  componentWillReceiveProps(e) {
    //this.requestCategoryList();    
    if(e.visible){
     // this.requestCategoryList();
    }
    if (!this.state.visible) {
    
    }
  }
  imgModal = (ref) => {
    this.imgmodal = ref;
  }
  requestCategoryList = (pagination)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'imageplugin/GetImageCategory',      
      callback: {
        success: data => {
          // let datas = Object.assign({}, this.state.paginationProps, { total })
          if (data.Code == 0) {
            this.setState({
              categoryId:data.Data.PageList[0].Id,
              selectCategoryId:data.Data.PageList[1].Id,
            })
            this.requestList({
              categoryId:data.Data.PageList[0].Id,
              current:pagination&&pagination.current?pagination.current:1
            });
          }
        },
        error: data => {
          message.error('加载列表失败');
        },
      },
    });
  }
  requestList = pagination => {
    const { dispatch } = this.props;
    dispatch({
      type: 'imageplugin/GetImageList',
      payload: {
        // Type:1,
        pageSize: pagination && pagination.pageSize ? pagination.pageSize : 18,
        pageIndex: pagination && pagination.current ? pagination.current : 1,
        disPlayName:pagination &&pagination.disPlayName?pagination.disPlayName:'',
        categoryId:pagination &&pagination.categoryId?pagination.categoryId:"-1"
      },
      callback: {
        success: data => {
          // let datas = Object.assign({}, this.state.paginationProps, { total })
          if (data.Code == 0) {          
            this.setState({
              paginationProps: { ...this.state.paginationProps, total: data.Data.Total, }, 
              loading4:false             
            });
          }
        },
        error: data => {
          message.error('加载列表失败');
        },
      },
    });
  };
  handleModalVisible = () => {
    const { _this } = this.props;
    const {paginationProps}=this.state;
    this.setState({
      visible: false, 
      loading4:true,
      selectedImg:{},
      paginationProps:{
      	...this.state.paginationProps,
      	current:1
      }  
    });
  }; 
  handleShowModal =()=>{   
    this.setState({
      visible: true, 
      uploadVisible:false,    
    },()=>{
      this.requestCategoryList();
    });
  } 
  search = (value) => {
    const { dispatch } = this.props; 
    this.requestList({
      categoryId: this.state.categoryId,        
      disPlayName: value,     
      pageIndex: this.state.paginationProps.current,
    })        
  };  
  changeKeyWord = e => {  
    this.setState({
      disPlayName: e.target.value,
    });
  };
  showUplaod = ()=>{
    this.setState({
      uploadVisible:true
    },()=>{
      this.handleModalVisible()
    })
  }
  changeCategory = (e)=>{  
    const {paginationProps}=this.state;
    paginationProps.current=1;
    this.setState({
      categoryId:e.key,
      paginationProps
    },()=>{
      this.requestList({
        categoryId:e.key
      })
    })
  }
  select=(record)=>{ 
    const {multiple,selectedImgList}=this.state;
    if(multiple){
      selectedImgList.push(record)
      this.setState({
        selectedImgList,
      },()=>{
        this.forceUpdate();
      }) 
    }else{
      this.setState({
        selectedImg:record
      }) 
    }          
  }
  confirmSelect= ()=>{
    const {selectImage,cdnUrl}=this.props;
    const {multiple,selectedImgList}=this.state;   
    if(selectImage&& typeof selectImage ==='function') {
      if(multiple){
        selectedImgList.forEach((item)=>{
          item.imageUrl=`${cdnUrl}/${item.Img}`;
          item.width=item.Width;
          item.height=item.Height;
        })
        selectImage(selectedImgList);
      }else{
        selectImage({imageUrl:`${cdnUrl}/${this.state.selectedImg.Img}`,width:this.state.selectedImg.Width,height:this.state.selectedImg.Height});
      }       
    }
  }
  changeSelectCategory = (val)=>{   
    this.setState({
      selectCategoryId:val
    })
  }
  handleUploadVisible = ()=>{
    const {imageCategory,fileList}=this.props;
    this.setState({
      uploadVisible:false,
      selectCategoryId:imageCategory[0].Id,
      fileList:[]
    })
  }
  base64 = (file)=>{
    let reader = new FileReader();
    let imgUrlBase64 = reader.readAsDataURL(file);
    let result='';
    reader.onload = function (e) {
      //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
      result=reader.result;     
    }
    return reader.result;
  }
  handleUploadImage = ({file})=>{  
    const {imageFilesList,fileList}=this.state;
    let that=this;
    if(file.status==="removed"){
      let idx=fileList.findIndex((item)=>item.uid===file.uid);
      fileList.splice(idx,1);
      imageFilesList.splice(idx,1);
      this.setState({
        fileList,
        imageFilesList,
      },()=>{
        this.forceUpdate()
      })
      return;
    }   
    let isImage = false;
    if (file.type === 'image/bmp'||file.type === 'image/jpeg'||file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif'||file.type === 'image/svg') {
      isImage = true;
    } else {
      isImage = false;
    }

    if (!isImage) {
      message.error('请上传支持的图片类型文件');
      return false;
    }    
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error('图片必须小于3MB');
      return false;
    }
    let reader = new FileReader();
    let imgUrlBase64 = reader.readAsDataURL(file);    
    reader.onload = function (e) {
      //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
      if(fileList.length>=21){        
        message.error('最多上传21张图片');              
        //return false;
      } else{
        fileList.push({
          uid: `${fileList.length-1}`,
          name: file.name,
          status: 'done',
          url: reader.result,
          file:file
        })
        that.setState({
          fileList,
        },()=>{
          that.forceUpdate();
        })
        imageFilesList.push({
          name: file.name,
          size: file.size
        })
        that.setState({          
          imageFilesList,
        });
      }    
    
    }
  };
  uploadImg = ()=>{
    const { fileList,imageFilesList } = this.state;    
    let that=this;
    if(fileList.length<=0){
      return message.error("请选择图片");
    }   
    fileList.forEach((item)=>{
      item.status="uploading";
    })
    this.setState({
      confirmLoading:true,
      fileList,
    },()=>{
      this.forceUpdate()
    })   
    const { dispatch } = this.props;
    let count=0;
    imageFilesList.forEach((item,index)=>{
      dispatch({
        type: 'imageplugin/GetImageStsConfig',
        payload: {
          filename: item.name,
          filesize: item.size,
          file: fileList[index].file,
          index:index,
          categoryId:this.state.selectCategoryId,
        },
        callback: {
          success:(index) => {  
          	 ++count;  
          	 fileList[index].status="done";
	          this.setState({
	            fileList,
	          },()=>{
	            this.forceUpdate()
	          })  
           	  if(count==fileList.length){
                 message.success('上传成功')
                setTimeout(()=>{
                  that.setState({
                    confirmLoading:false,
                    uploadVisible:false,
                    visible:true,
                    fileList:[],
                    imageFilesList:[]
                  },()=>{
                    this.forceUpdate();
                   // this.handleShowModal();
                    this.requestCategoryList({current:1});
                  });
                },1500)
           	  	return;
           	  }
	            
	                  
          },
          error:(index,data)=>{
          	 ++count;          
          	fileList[index].status="error";
	          this.setState({
	            fileList,
	          },()=>{
              this.forceUpdate();             
	          })
          	if(count==fileList.length){              
           	  	that.setState({
           	  		confirmLoading:false
           	  	},()=>{
                   this.forceUpdate()
                   let length=fileList.filter((item)=>{
                    return item.status=="error";
                  }).length;
                  if(data.Code==50001){
                    message.error(`有${length}张图片涉嫌违规，无法上传`)
                  }else if(data.Code==80007){                   
                    confirm({
                      title: '上传失败',
                      content: '您的剩余图片空间已经为0KB，请删除无用素材或加购图片空间',
                      okText: '立即加购',
                      iconType:"close-circle",
                     // okType: 'danger',
                      cancelText: '我再想想',
                      onOk() {                        
                        window.open(`/#/${window.storeId}/store/file/pics`)
                      },
                      onCancel() {
                        //console.log('Cancel');
                      },
                    });
                  }else{
                    message.error(`因服务器异常，导致${fileList.length}张图片上传失败`)
                  }
           	  	});
           	  	return;
           	  }	                   	
          }
        }
      });  
    })
          
  }
  handlePreview= (file)=>{
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handlePreviewCancel = ()=>{
    this.setState({     
      previewVisible: false,
      previewImage:''
    });
  }
  isSelected = (id)=>{
    const {multiple,selectedImgList,selectedImg}=this.state;    
    if(multiple){
      return selectedImgList.findIndex((item)=>item.Id==id)>-1;
    }else{
      return selectedImg.Id==id;
    }
  } 
  render() {
    const {
      loading,
      loading2,
      loading3,    
     // visible,     
      selectImage,
      //dataList,
      imageStsConfig,
      imageCategory,
      imageList, 
      cdnUrl,    
    } = this.props;   
    const { uploadVisible, fileList ,confirmLoading,loading4,selectedImg,previewVisible ,previewImage,visible,multiple } = this.state;
    const uploadButton = (
      <div className="xkd-inline-block">
        <Icon type="plus" />
        <div className="ant-upload-text">图片上传</div>
      </div>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
        //span: 2
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
        //span: 8
      },
    };    
    return (
      <Fragment>
      <Modal
        width={960}
        centered
        maskClosable={false}
        title={'选择图片'}
        visible={visible}
        onCancel={this.handleModalVisible}
       // footer={false}
        onOk={this.confirmSelect}
        className={styles.modal}
      >       
       <div className="xkd-mb24">
          <Row>
            <Col span={12}>
              <Button type="primary" onClick={this.showUplaod}>上传图片</Button>           
            </Col>
            <Col span={12}>            
            <Search
                  placeholder="请输入图片名称搜索"
                  onSearch={this.search}
                  onChange={this.changeKeyWord}
                  style={{ width: 200 }}
                  className="xkd-fr xkd-width-per-80"
              />
            </Col>
          </Row> 
       </div> 
       <div className="xkd-overflow-hidden">
        <Spin spinning={this.state.loading4}>
          <div className={`xkd-fl`}>
            <Menu
                  mode="inline"
                // openKeys={this.state.openKeys}
                  //defaultSelectedKeys={[`${this.state.categoryId}`]}
                  selectedKeys={[`${this.state.categoryId}`]}
                // onOpenChange={this.onOpenChange}               
                  className={styles.group}
                  onClick={this.changeCategory}
              >                               
                  {
                    imageCategory.map((item,index)=>{
                      return <Menu.Item key={item.Id} >{item.DisplayName}<span className="xkd-fr">{item.Count}</span></Menu.Item>
                    })
                  }
              </Menu>
          </div> 
          <div className={`xkd-fl ${styles.list}`}>
              <List
                 grid={{  column: 6 }}              
                loading={loading3}
                pagination={{
                  onChange: (page) => {
                    const {paginationProps}=this.state;
                    paginationProps.current=page;
                    this.requestList({
                      paginationProps,
                      disPlayName:this.state.disPlayName,
                      current:page
                    })                  
                  },
                  current:this.state.paginationProps.current,
                  pageSize: 18,
                  total:this.state.paginationProps.total
                }}
                bordered={false}
                split={false}
                  dataSource={imageList}
                  renderItem={(item,index) => (
                  <List.Item 
                    className={`xkd-inline-block xkd-mr16 xkd-mb8 ${(index+1)%6==0?'xkd-mr0':''} ${styles.imageListItem}`} 
                    style={{width:108,padding:0,height:132,boxSizing:"border-box"}}
                    onClick={()=>this.select(item)}
                    //key={`id_${item.Id}`}
                  >
                      <div style={{backgroundColor:"#f7f7f7",width:108}} >                        
                          <div style={{height:108,position:"relative",width:108,overflow:'hidden'}}>
                            <img src={`${cdnUrl}/${item.Img}?x-oss-process=style/180`} style={{width:108,height:'100%'}}/>
                            <div style={{position:"absolute",bottom:0,left:0,width:"100%",backgroundColor:"rgba(0,0,0,0.45)",color:"#fff",textAlign:"center"}}>{item.Width}*{item.Height}</div>
                          </div>
                          <div style={{lineHeight:'24px',height:24,padding:"0 8px",textAlign:"center",overflow: "hidden",whiteSpace: "nowrap",textoverflow: "ellipsis"}}>{item.DisplayName}</div>
                          {
                            this.isSelected(item.Id)?
                            <div className={styles.checkbox}><Checkbox checked/></div>
                            :null
                          }
                      </div>                    
                  </List.Item>
                  )}                
              />
          </div> 
        </Spin>        
       </div>       
      </Modal>
      <Modal
        width={960}
        centered
        // height={783}
        title={<span><span onClick={this.handleShowModal} className="xkd-cursor-pointer"><Icon type="left" /><a className="xkd-ml8">选择图片</a></span> / 本地上传</span>}
        visible={uploadVisible}
        confirmLoading={confirmLoading}
        onCancel={this.handleUploadVisible}
       // footer={false}
        onOk={this.uploadImg}
        className={styles.uploadModal}
      >
      <div style={{height:536}}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="分组"
          >
            <Select className="xkd-m-input" onChange={this.changeSelectCategory} value={this.state.selectCategoryId}>
              {
                imageCategory.map((item,index)=>{
                  return index==0?null:<Option value={item.Id} key={index}>{item.DisplayName}</Option>
                })
              }                
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="本地图片"
            help="仅支持gif、jpeg、png、bmp 4种格式，大小不超过3MB"
            className={`${this.state.fileList.length?styles.uploadFormItem:''}`}
          >
           <Upload
             // action="//jsonplaceholder.typicode.com/posts/"
              multiple
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              //customRequest={this.aa}
              beforeUpload={()=>{return false;}}
              onChange={this.handleUploadImage}
              onRemove={this.removeImage}
              //showUploadList={{showRemoveIcon:false}}
              //onProgress={this.progress}
              accept="image/*"              
            >             
              {fileList.length >= 21 ? null : uploadButton}
            </Upload>
          </FormItem>           
        </Form> 
        
        </div> 
       </Modal> 
       <Modal 
        visible={previewVisible} 
        footer={null} 
        onCancel={this.handlePreviewCancel}
        centered
      >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Fragment>
    );
  }
}
