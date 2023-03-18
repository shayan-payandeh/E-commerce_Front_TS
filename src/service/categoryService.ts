import { IAPiResponse } from '@/utils/interface/apiResponse';
import { ICategory } from '@/utils/interface/category';
import { url } from '@/utils/values';
import axios from 'axios';

class CategoryService {
  private readonly http = axios.create({
    baseURL: url.api,
  });

  async getAll() {
    try {
      const response = await this.http.get<IAPiResponse<ICategory>>(
        `${url.categoriesUrl}`
      );
      return response;
    } catch (error) {
      if (error instanceof Error) return error;
    }
  }
}

export default new CategoryService();
