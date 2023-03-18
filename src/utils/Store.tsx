import Cookies from 'js-cookie';
import React, { useReducer, createContext, Reducer } from 'react';
import { ICartItems } from './interface/cartItems';
import { IProduct } from './interface/product';
import { IShippingAddress } from './interface/shippingAddress';
import { IUser } from './interface/user';

export type CartType = {
  cartItems: ICartItems[] | undefined;
  shippingAddress: IShippingAddress;
  paymentMethod: string;
};

interface IState {
  language: string;
  cart: CartType;
  userInfo: IUser | null;
}

let language: string;
const lang = Cookies.get('language');
language = lang && typeof lang === 'string' ? lang : 'English';

let cartItems: ICartItems[] | undefined;
const items = Cookies.get('cartItems');
cartItems = items && typeof items === 'string' ? JSON.parse(items) : [];

let shippingAddress: IShippingAddress;
const address = Cookies.get('shippingAddress');
shippingAddress =
  address && typeof address === 'string' ? JSON.parse(address) : {};

let userInformation: IUser;
const userInfo = Cookies.get('userInfo');
userInformation =
  userInfo && typeof userInfo === 'string' ? JSON.parse(userInfo) : null;

let paymentMethod: string;
const method = Cookies.get('language');
paymentMethod = method && typeof method === 'string' ? method : '';

const initialState: IState = {
  language: language,
  userInfo: userInformation,
  cart: {
    cartItems: cartItems,
    shippingAddress: shippingAddress,
    paymentMethod: paymentMethod,
  },
};

interface IAction {
  type: string;
  payload:
    | String
    | IUser
    | IProduct
    | ICartItems
    | IShippingAddress
    | undefined;
}

interface IStateContext {
  state: Partial<IState>;
  dispatch: React.Dispatch<IAction>;
}

export const AppCtxt = createContext<IStateContext>({
  state: {},
  dispatch: () => undefined,
});

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'LANGUAGE_CHANGE': {
      if (typeof action.payload === 'string') {
        Cookies.set('language', action.payload);
        return { ...state, language: action.payload };
      }
    }

    case 'CART_ADD_ITEM': {
      let newItem: ICartItems;
      let cartItems: ICartItems[] | undefined;
      if (action.payload) {
        newItem = action.payload as ICartItems;
        const existItem: ICartItems | undefined = state.cart.cartItems?.find(
          (item) => item._id === newItem._id
        );
        if (existItem) {
          cartItems = state.cart.cartItems?.map((item) =>
            item._id === existItem._id ? newItem : item
          );
        } else if (!existItem) {
          if (typeof state.cart.cartItems !== 'undefined')
            cartItems = [...state.cart.cartItems, newItem];
        }
      }
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_REMOVE_ITEM': {
      let cartItems: ICartItems[] | undefined;
      let removeItem: ICartItems;
      if (typeof action.payload === 'object') {
        removeItem = action.payload as ICartItems;
        cartItems = state.cart.cartItems?.filter(
          (item) => item._id !== removeItem._id
        );
      }
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      let thePayload: string;
      if (typeof action.payload === 'object') {
        thePayload = JSON.stringify(action.payload);
        Cookies.set('shippingAddress', thePayload);
        return {
          ...state,
          cart: {
            ...state.cart,
            shippingAddress: action.payload as IShippingAddress,
          },
        };
      }
    }

    case 'SAVE_PAYMENT_METHOD': {
      if (typeof action.payload === 'string') {
        Cookies.set('paymentMethod', action.payload);
        return {
          ...state,
          cart: { ...state.cart, paymentMethod: action.payload },
        };
      }
    }

    case 'CART_CLEAR': {
      Cookies.remove('cartItems');
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    case 'USER_LOGIN': {
      let infoUser: string;
      if (typeof action.payload === 'object') {
        infoUser = JSON.stringify(action.payload);
        Cookies.set('userInfo', infoUser);
        return { ...state, userInfo: action.payload as IUser };
      }
    }

    case 'USER_LOGOUT': {
      Cookies.remove('userInfo');
      Cookies.remove('cartItems');
      Cookies.remove('shippingAddress');
      Cookies.remove('paymentMethod');
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {
            fullname: '',
            address: '',
            city: '',
            country: '',
            postalCode: 0,
          },
          paymentMethod: '',
        },
      };
    }

    default:
      return state;
  }
}

export const StoreProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer<Reducer<IState, IAction>>(
    reducer,
    initialState
  );
  const value = { state, dispatch };
  return <AppCtxt.Provider value={value}>{children}</AppCtxt.Provider>;
};
