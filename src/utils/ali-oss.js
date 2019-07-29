let OSS = require('ali-oss');

class ALiOss {
    getALiOss = async (file, ossConfig) => {
        let { Region, AccessId, AccessKey, StsToken, Bucket, OssFileName } = ossConfig;
        // 参数配置
        var client = new OSS({
            region: Region,
            accessKeyId: AccessId,
            accessKeySecret: AccessKey,
            stsToken: StsToken,
            bucket: Bucket
        });

        // 分片上传
        try {
            let result = await client.multipartUpload(OssFileName, file, {
                partSize: 524288,
                progress: async (p, checkpoint) => {
                    // console.log('p................checkpoint', Math.floor(p * 100) + '%' + checkpoint)
                    window.g_app._store.dispatch({
                        type: 'videoList/setProgress',
                        payload: Math.floor(p * 100),
                    });
                },
                // meta: { year: 2018, people: 'HiShop' },
                mime: 'video/mp4'
            })
            return result;
        } catch (e) {
            console.log(e);
        }
    }
    getALiOssImg = async (file, ossConfig,categoryId) => {
        let { Region, AccessId, AccessKey, StsToken, Bucket, OssFileName,StoreId ,CallbackUrl} = ossConfig;
        // 参数配置
        var client = new OSS({
            region: Region,
            accessKeyId: AccessId,
            accessKeySecret: AccessKey,
            stsToken: StsToken,
            bucket: Bucket
        });

        // 分片上传
        try {            
            let result = await client.multipartUpload(OssFileName, file, {
                partSize: 524288,                            
                mime:file.type,
                callback:{
                    url:CallbackUrl,
                    body:"bucket=${bucket}&object=${object}&categoryId=${x:categoryId}&storeId=${x:storeId}&imageName=${x:imageName}&etag=${etag}&size=${size}&mimeType=${mimeType}&imageheight=${imageInfo.height}&imagewidth=${imageInfo.width}&imageformat=${imageInfo.format}",
                    contentType: 'application/x-www-form-urlencoded',
                    customValue: {
                        storeId: `${StoreId}`,
                        imageName:file.name,
                        categoryId:`${categoryId}`
                    }
            }

            })
            return result;
        } catch (e) {
            console.log(e);
        }
    }
}

export default ALiOss;
