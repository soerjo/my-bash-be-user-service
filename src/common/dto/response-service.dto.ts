export interface IResponseService<T> {
  responseCode: string | number;
  message: string;
  data: T;
}
