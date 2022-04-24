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
      url: '/basic-api/Upload/Image',
      onUploadProgress,
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
      url: '/basic-api/Upload/File',
      onUploadProgress,
    },
    params,
  );
}
