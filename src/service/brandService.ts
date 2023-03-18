import { IAPiResponse } from '@/utils/interface/apiResponse';
import { IBrand } from '@/utils/interface/brand';
import { url } from '@/utils/values';
import axios from 'axios';

class BrandService {
  private readonly http = axios.create({
    baseURL: url.api,
  });

  async getAll() {
    try {
      const response = await this.http.get<IAPiResponse<IBrand>>(
        `${url.brandsUrl}`
      );
      return response;
    } catch (error) {
      if (error instanceof Error) return error;
    }
  }
}

export default new BrandService();
