import axios, { Method } from 'axios';
import { getConfig } from '.';

const {
  FEISHU_CONFIG: { FEISHU_URL },
} = getConfig();

/**
 *  * @description: 任意请求
 */
const request = async ({ url, option = {} }) => {
  try {
    return axios.request({ url, ...option });
  } catch (error) {
    throw error;
  }
};

interface IMethodV {
  url: string;
  method?: Method;
  headers?: { [key: string]: string };
  params?: Record<string, string>;
  query?: Record<string, string>;
}

export interface IRequest {
  data: any;
  code: number;
}

/**
 * @description: 带 version 的通用 api 请求
 */

const methodV = async ({
  url,
  method,
  headers,
  params = {},
  query = {},
}: IMethodV): Promise<IRequest> => {
  let sendURL = '';
  if (/^(http:\/\/|https:\/\/)/.test(url)) {
    sendURL = url;
  } else {
    sendURL = `${FEISHU_URL}${url}`;
  }

  try {
    return new Promise((resolve, reject) => {
      axios({
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          ...headers,
        },
        url: sendURL,
        method,
        params: query,
        data: { ...params },
      })
        .then(({ data, status }) => {
          resolve({ data, code: status });
        })
        .catch((err) => {
          reject(err);
        });
    });
  } catch (error) {
    throw error;
  }
};

export { request, methodV };
