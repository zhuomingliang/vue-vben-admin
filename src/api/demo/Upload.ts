import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';

/**
 * @description: Upload interface
 */
export function uploadImage(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile(
    {
      url: '/Upload/Image',
      onUploadProgress,
      timeout: 0,
    },
    params,
  );
}

export const uploadImage2 = (file: any) => defHttp.post({ url: '/Upload/Image', params: { file } });

/**
 * @description: Upload interface
 */
export function uploadVideo(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile(
    {
      url: '/Upload/Video',
      onUploadProgress,
      timeout: 0,
    },
    params,
  );
}

/**
 * @description: Upload interface
 */
export function uploadFile(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile(
    {
      url: '/Upload/File',
      onUploadProgress,
      timeout: 0,
    },
    params,
  );
}
