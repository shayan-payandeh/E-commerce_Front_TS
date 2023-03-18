import { IAPiResponse } from '@/utils/interface/apiResponse';
import { IData } from '@/utils/interface/data';
import { IProduct } from '@/utils/interface/product';
import { QueryType } from '@/utils/type/query';
import { url } from '@/utils/values';
import axios from 'axios';
import querySring from 'query-string';

const { productsUrl } = url;

class ProductService {
  private readonly http = axios.create({
    baseURL: url.api,
  });

  async getAll(query: QueryType) {
    try {
      const response = await this.http.get<IAPiResponse<IProduct>>(
        `${url.productsUrl}?${querySring.stringify(query)}`
      );
      return response;
    } catch (error) {
      if (error instanceof Error) return error;
    }
  }

  async getOne(slug: string) {
    try {
      const response = await this.http.get<IProduct>(`${productsUrl}/${slug}`);
      return response;
    } catch (error) {
      if (error instanceof Error) return error;
    }
  }

  async getBestSelling() {
    try {
      const response = await this.http.get<IAPiResponse<IProduct[]>>(
        `${url.productsUrl}/bestselling`
      );
      return response;
    } catch (error) {
      if (error instanceof Error) return error;
    }
  }
}

export default new ProductService();
