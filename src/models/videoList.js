import {
  GetVideoGroup,
  GetVideoList,
  GetVideoStsConfig,
  SaveVideo,
  GetVideoOverView,
  GetVideoCategoryCount,
  AddCategory,
  GetList,
  DelCategory,
  ReNameCategory,
  DelVideo,
  MoveCategory,
  EditVideo
} from '@/services/videoList';
import ALiOss from '@/utils/ali-oss';

export default {
  namespace: 'videoList',

  state: {
    videoGroup: [],
    videoList: [],
    videoUpload: [],
    progress: 0,         //进度条状态
    confirm: {},
    OverView: {},
    videoGroupCount: [],
    videoLib: []
  },

  effects: {
    // 获取视频分组
    *GetVideoGroup(_, { call, put }) {
      const groupData = yield call(GetVideoGroup)
      // console.log('groupData....', groupData);
      if (groupData.Code === 0) {
        yield put({
          type: 'saveGetVideoGroup',
          payload: groupData.Data.PageList,
        });
      }
    },
    // 获取视频列表
    *GetVideoList({ payload, callBack }, { call, put }) {
      const data = yield call(GetVideoList, payload)
      if (data.Code === 0) {
        yield put({
          type: 'saveGetVideoList',
          payload: {
            PageList: data.Data.PageList,
            Total: data.Data.Total
          },
        });
        callBack && callBack();
      }
    },
    // oss上传
    *GetVideoStsConfig({ payload, callBack }, { call, put }) {
      let { file } = payload;
      // 获取oss配置信息
      const data = yield call(GetVideoStsConfig, payload)
      if (data.Code === 0) {
        let ossConfig = data.Data;
        // 对象存储OSS上传
        let result = yield new ALiOss().getALiOss(file, ossConfig);
        // console.log('对象存储OSS上传==>>',result);
        if (result.res && result.res.status === 200) {
          yield put({
            type: 'saveGetVideoStsConfig',
            payload: {
              result: result,
              ossConfig: ossConfig
            }
          });
        }
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data)
      }

      // if (data.Code === 0) {
      //   let ossConfig = data.Data;
      //   // 对象存储OSS上传
      //   let result = yield new ALiOss().getALiOss(file, ossConfig);
      //   // console.log('对象存储OSS上传==>>',result);
      //   if (result.res && result.res.status === 200) {
      //     yield put({
      //       type: 'saveGetVideoStsConfig',
      //       payload: {
      //         result: result,
      //         ossConfig: ossConfig
      //       }
      //     });
      //   }
      // } else { // if (data.Code === 80002) 
      //   console.log(data.Msg);
      //   // yield put({
      //   //   type: 'saveGetVideoStsConfig',
      //   //   payload: { result: data.Msg }
      //   // });
      // }
      // callBack && callBack();
    },
    // 视频上传
    *SaveVideo({ payload }, { call, put }) {
      // console.log('提交的数据。。。。', payload);
      const data = yield call(SaveVideo, payload);
      // console.log('视频上传接口返回数据。。。', data);
      if (data.Code === 0) {
        yield put({
          type: 'saveSaveVideo',
          payload: data
        });
      }
    },
    // 获取视频统计概况
    *GetVideoOverView(_, { call, put }) {
      const OverViewData = yield call(GetVideoOverView)
      // console.log('OverViewData==>>', OverViewData);
      if (OverViewData.Code === 0) {
        yield put({
          type: 'saveGetVideoOverView',
          payload: OverViewData.Data,
        });
      } else {
        yield put({
          type: 'saveGetVideoOverView',
          payload: OverViewData.Msg,
        });
      }
    },
    // 获取视频分组列表
    *GetVideoCategoryCount({ callBack }, { call, put }) {
      const data = yield call(GetVideoCategoryCount)
      if (data.Code === 0) {
        yield put({
          type: 'saveGetVideoCategoryCount',
          payload: data.Data.PageList,
        });
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data)
      }
    },
    // 删除视频分组
    *DelCategory({ payload, callBack }, { call }) {
      const data = yield call(DelCategory, payload)
      if (data.Code === 0) {
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data)
      }
    },
    // 修改视频分组名称
    *ReNameCategory({ payload, callBack }, { call }) {
      const data = yield call(ReNameCategory, payload)
      if (data.Code === 0) {
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data)
      }
    },
    // 新增视频分组
    *AddCategory({ payload, callBack }, { call, put }) {
      const data = yield call(AddCategory, payload)
      if (data.Code === 0) {
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data)
      }
    },
    // 获取视频列表
    *GetList({ payload, callBack }, { call, put }) {
      const data = yield call(GetList, payload)
      // console.log('视频列表data....', data)
      if (data.Code === 0) {
        yield put({
          type: 'saveGetList',
          payload: {
            PageList: data.Data.PageList,
            Total: data.Data.Total
          },
        });
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data)
      }
    },
    // 删除视频
    *DelVideo({ payload, callBack }, { call }) {
      const data = yield call(DelVideo, payload)
      if (data.Code === 0) {
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data)
      }
    },
    // 批量修改视频的分组
    *MoveCategory({ payload, callBack }, { call }) {
      const data = yield call(MoveCategory, payload)
      if (data.Code === 0) {
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data)
      }
    },
    // 编辑视频信息
    *EditVideo({ payload, callBack }, { call }) {
      const data = yield call(EditVideo, payload)
      if (data.Code === 0) {
        callBack && callBack.success(data);
      } else {
        callBack && callBack.error(data)
      }
    },
  },

  reducers: {
    saveGetVideoGroup(state, { payload }) {
      return {
        ...state,
        videoGroup: payload,
      };
    },
    saveGetVideoList(state, { payload }) {
      return {
        ...state,
        videoList: payload.PageList,
        Total: payload.Total,
      };
    },
    saveGetVideoStsConfig(state, { payload }) {
      return {
        ...state,
        videoUpload: payload,
      };
    },
    setProgress(state, { payload }) {
      return {
        ...state,
        progress: payload,
      };
    },
    resetProgress(state, { payload }) {
      return {
        ...state,
        progress: 0
      }
    },
    saveSaveVideo(state, { payload }) {
      return {
        ...state,
        confirm: payload
      };
    },
    saveGetVideoOverView(state, { payload }) {
      return {
        ...state,
        OverView: payload
      };
    },
    saveGetVideoCategoryCount(state, { payload }) {
      return {
        ...state,
        videoGroupCount: payload,
      };
    },
    saveGetList(state, { payload }) {
      return {
        ...state,
        videoLib: payload.PageList,
        videoLibTotal: payload.Total,
      };
    },
  }
};
