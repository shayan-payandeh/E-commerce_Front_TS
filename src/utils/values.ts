// const address = 'http://127.0.0.1:9000';
export const url = {
  api: 'http://localhost:1500',
  // api: `https://api.shayanshop.shop`,
  home: '/',
  productsUrl: '/products',
  ordersUrl: '/order',
  usersUrl: '/users',
  userUrl: '/user',
  categoriesUrl: '/category',
  brandsUrl: '/brand',
  profileUrl: '/profile',
  cartUrl: '/cart',
  paymentUrl: '/payment',
  shippingUrl: '/shipping',
  placeOrderUrl: '/placeOrder',
  orderHistoryUrl: '/orderHistory',
  loginUrl: '/login',
  registerUrl: '/register',
  contactUrl: '/contact',
};

export const priceUnit = ` هزار تومان`;

export const menuItems = [
  {
    url: '/',
    pathname: '/',
    titleEnglish: 'Home',
    titlePersian: 'خانه',
    scroll: false,
  },
  {
    url: url.productsUrl,
    pathname: url.productsUrl,
    titleEnglish: 'Products',
    titlePersian: 'محصولات',
    scroll: false,
  },
  {
    url: '/',
    pathname: url.contactUrl,
    titleEnglish: 'Contact',
    titlePersian: 'ارتباط با ما',
    scroll: true,
  },
];
