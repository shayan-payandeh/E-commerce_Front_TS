import { IData } from './data';

export interface IAPiResponse<T> {
  // data: {
  //   data: IData<T>;
  // };

  data: IData<T>;
}
