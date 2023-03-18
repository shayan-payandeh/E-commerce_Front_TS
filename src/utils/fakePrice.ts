const fakePrice = (price: number) => {
  const fake = Math.round((price + price / 3) / 1000) * 1000;
  return fake;
};

export default fakePrice;
