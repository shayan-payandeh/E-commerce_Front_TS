import { ICartItems } from './cartItems';
import { IShippingAddress } from './shippingAddress';

export interface IOrderInput {
  orderItems: ICartItems[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  totalItemsPrice: number;
  shippingPrice: number;
  tax: number;
  totalPrice: number;
}
