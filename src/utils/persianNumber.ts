import persianJs from 'persianjs';

const toPersianNumber = (number: number) => {
  return persianJs(number).englishNumber()._str;
};

export default toPersianNumber;
