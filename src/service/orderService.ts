import { IAPiResponse } from '@/utils/interface/apiResponse';
import { IOrder } from '@/utils/interface/order';
import { IOrderInput } from '@/utils/interface/orderInput';
import { QueryType } from '@/utils/type/query';
import { url } from '@/utils/values';
import axios from 'axios';
import queryString from 'query-string';

class OrderService {
  private readonly http = axios.create({
    baseURL: url.api,
  });

  async getMyOrders(query: QueryType, token: string) {
    try {
      const response = await this.http.get<IAPiResponse<IOrder[]>>(
        `${url.ordersUrl}/mine?${queryString.stringify(query)}`,
        {
          headers: { 'x-auth-token': token },
        }
      );
      return response;
    } catch (error) {
      if (error instanceof Error) return error;
    }
  }

  async getTheOrder(orderId: string, token: string) {
    try {
      const response = await this.http.get<IOrder>(
        `${url.ordersUrl}/${orderId}`,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      return response;
    } catch (error) {
      if (error instanceof Error) return error;
    }
  }

  async addOrder(order: IOrderInput, token: string) {
    try {
      const response = await this.http.post(`${url.ordersUrl}`, order, {
        headers: { 'x-auth-token': token },
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) return error;
    }
  }
}

export default new OrderService();
