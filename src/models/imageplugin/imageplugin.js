import {
    GetImageList,
    GetImageStsConfig,
    GetImageCategory,
   // GetLogDetail
} from '@/services/imageSelectPlugin/imageplugin';
import ALiOss from '@/utils/ali-oss';
export default {
    namespace: 'imageplugin',

    state: {
        imageList:[],
        imageCategory:[],
        imageStsConfig:{}
    },
    effects: {
        *GetImageStsConfig({ payload, callback }, { call, put }) {
            let { file,filename,filesize,index,categoryId } = payload;
          // 获取oss配置信息
          const data = yield call(GetImageStsConfig, {filename,filesize})

          if (data.Code === 0) {
            let ossConfig = data.Data;
            // 对象存储OSS上传
            let result = yield new ALiOss().getALiOssImg(file, ossConfig,categoryId);
            // console.log('对象存储OSS上传==>>',result);            
            if (result.res && result.res.status === 200&&result.data&&result.data.Code==0) {               
            //   yield put({
            //     type: 'saveGetImageStsConfig',
            //     payload: {
            //       result: result,
            //       ossConfig: ossConfig
            //     }
            //   });
              callback && callback.success && callback.success(index);
            }else{
                callback && callback.error && callback.error(index,result.data);
            }
          }else{
            callback && callback.error && callback.error(index,data);
          }
        },
        *GetImageList({ payload, callback }, { call, put }) {
            const data = yield call(GetImageList, payload);
            if (data) {
                let list=[];
                for(let i=0;i<50;i++){
                    let obj={"Id":i+1,"DisplayName":"cccc","Img":"/test/test.jpg","ShowDateTime":"2018-12-24 11:20:01","Width":33,"Height":22};
                    list.push(obj)
                }
                yield put({
                    type: 'saveGetImageList',
                    payload: data.Data.PageList,
                   //payload:list
                });
                callback && callback.success && callback.success(data);
            }
        },
        *GetImageCategory({ payload, callback }, { call, put }) {
            const data = yield call(GetImageCategory, payload);
            if (data) {
                yield put({
                    type: 'saveGetImageCategory',
                    payload: data.Data.PageList,
                });
                callback && callback.success && callback.success(data);
            }
        },       

    },
    reducers: {

        saveGetImageStsConfig(state, { payload }) {            
            return {
                ...state,
                imageStsConfig: payload,
            };
        },
        saveGetImageList(state, { payload }) {           
            return {
                ...state,
                imageList: payload,
            };
        },
        saveGetImageCategory(state, { payload }) {           
            return {
                ...state,
                imageCategory: payload,
            };
        },              
    },
}