import persianJs from 'persianjs';

const priceConvetor = (price: number) => {
  const persianPrice = persianJs(price / 1000).englishNumber()._str;
  return persianPrice;
};

export default priceConvetor;
