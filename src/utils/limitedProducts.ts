import { IProduct } from '@/service/productService';

const newestProducts = (products: IProduct[]) => {
  const newest = products.slice(0, 5);
  return newest;
};

export default newestProducts;
