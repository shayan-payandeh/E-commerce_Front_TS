import { IBrand } from './brand';
import { ICategory } from './category';

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  category: ICategory;
  brand: IBrand;
  price: number;
  image: any;
  countInStock: number;
  description: string;
}
