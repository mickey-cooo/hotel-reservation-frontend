import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
} from 'axios';
import moment from 'moment-timezone';
import queryString from 'query-string';

import { Languages } from '@/constants/i18n.const';
import { languageManager } from './languageManager';
import { appConfig } from '@/constants/appConfig';

const CANCEL = '@@redux-saga/CANCEL_PROMISE';

const { CancelToken } = axios;

export interface PromiseWithCancel<R> extends Promise<R> {
  [CANCEL]?: () => void;
}

export default class Request {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      withCredentials: false,
      baseURL: appConfig.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        FromUrl: typeof window !== 'undefined' ? window?.location?.href : '',
      },
      paramsSerializer: (params) => {
        return queryString.stringify(params, { arrayFormat: 'comma' });
      },
    });
  }

  get = async <T = unknown, R = AxiosResponse<T>>(
    url: string,
    config: AxiosRequestConfig = {},
    rawResponse?: boolean,
  ): Promise<R> => {
    let cancel: Canceler;
    const lang = await languageManager.getLang();
    const apiConfig = {
      ...config,
      params: {
        ...config.params,
        lang: lang || Languages.ENGLISH,
        timezone: moment.tz.guess(),
      },
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .get(url, apiConfig)
      .then((res) => (rawResponse ? res : res.data))
      .catch((e) => {
        throw e;
      });
    request[CANCEL] = () => cancel();
    return request;
  };

  post = async <T = unknown, R = AxiosResponse<T>>(
    url: string,
    body?: unknown,
    config: AxiosRequestConfig = {},
    rawResponse?: boolean,
  ): Promise<R> => {
    let cancel: Canceler;
    const lang = await languageManager.getLang();
    const apiConfig = {
      ...config,
      params: {
        ...config.params,
        lang: lang || Languages.ENGLISH,
        timezone: moment.tz.guess(),
      },
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .post(url, body, apiConfig)
      .then((res) => (rawResponse ? res : res.data))
      .catch((e) => {
        throw e;
      });
    request[CANCEL] = () => cancel();
    return request;
  };

  put = async <T = unknown, R = AxiosResponse<T>>(
    url: string,
    body?: unknown,
    config: AxiosRequestConfig = {},
    rawResponse?: boolean,
  ): Promise<R> => {
    let cancel: Canceler;
    const lang = await languageManager.getLang();
    const apiConfig = {
      ...config,
      params: {
        ...config.params,
        lang: lang || Languages.ENGLISH,
        timezone: moment.tz.guess(),
      },
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .put(url, body, apiConfig)
      .then((res) => (rawResponse ? res : res.data))
      .catch((e) => {
        throw e;
      });
    request[CANCEL] = () => cancel();
    return request;
  };

  patch = async <T = unknown, R = AxiosResponse<T>>(
    url: string,
    body?: unknown,
    config: AxiosRequestConfig = {},
    rawResponse?: boolean,
  ): Promise<R> => {
    let cancel: Canceler;
    const lang = await languageManager.getLang();
    const apiConfig = {
      ...config,
      params: {
        ...config.params,
        lang: lang || Languages.ENGLISH,
        timezone: moment.tz.guess(),
      },
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .patch(url, body, apiConfig)
      .then((res) => (rawResponse ? res : res.data))
      .catch((e) => {
        throw e;
      });
    request[CANCEL] = () => cancel();
    return request;
  };

  delete = async <T = unknown, R = AxiosResponse<T>>(
    url: string,
    config: AxiosRequestConfig = {},
    rawResponse?: boolean,
  ): Promise<R> => {
    let cancel: Canceler;
    const lang = await languageManager.getLang();
    const apiConfig = {
      ...config,
      params: {
        ...config.params,
        lang: lang || Languages.ENGLISH,
        timezone: moment.tz.guess(),
      },
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<R> = this.api
      .delete(url, apiConfig)
      .then((res) => (rawResponse ? res : res.data))
      .catch((e) => {
        throw e;
      });
    request[CANCEL] = () => cancel();
    return request;
  };
}

export const requestClient = new Request();

export function authHeader(token?: string): AxiosRequestConfig {
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}
