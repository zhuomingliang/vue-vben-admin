import { AxiosError, AxiosInstance } from 'axios';
/**
 *  请求重试机制
 */

export class AxiosRetry {
  /**
   * 重试
   */
  async retry(AxiosInstance: AxiosInstance, error: AxiosError) {
    // @ts-ignore
    const { config = {} } = error?.response;
    const { waitTime, count } = config?.requestOptions?.retryRequest;
    config.__retryCount = config?.__retryCount || 0;
    if (config.__retryCount >= count) {
      return Promise.reject(error);
    }
    config.__retryCount += 1;
    await this.delay(waitTime);
    return await AxiosInstance(config);
  }

  /**
   * 延迟
   */
  private delay(waitTime: number) {
    return new Promise((resolve) => setTimeout(resolve, waitTime));
  }
}
