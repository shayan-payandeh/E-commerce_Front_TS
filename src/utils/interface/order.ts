import { IOrderItems } from './orderIItems';
import { IShippingAddress } from './shippingAddress';
import { IUser } from './user';

export interface IOrder {
  _id?: string;
  createdAt?: string;
  isDelievered?: boolean;
  isPaid?: boolean;
  orderItems?: IOrderItems[];
  persianCreatedAt?: string;
  shippingPrice?: number;
  tax?: number;
  totalItemsPrice?: number;
  totalPrice?: number;
  user?: IUser;
  shippingAddress: IShippingAddress;
  paymentMethod: string;
}
