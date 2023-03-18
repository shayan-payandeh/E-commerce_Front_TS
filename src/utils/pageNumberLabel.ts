import { PaginationRenderItemParams } from '@mui/material';
import toPersianNumber from './persianNumber';

const pageNumberLabel = (
  item: PaginationRenderItemParams,
  langage: string | undefined
) => {
  const initialPageNumber = item['page'];
  const pageNumber =
    typeof initialPageNumber === 'number' && initialPageNumber > 0
      ? langage === 'English'
        ? initialPageNumber
        : toPersianNumber(initialPageNumber)
      : 0;

  return pageNumber;
};

export default pageNumberLabel;
