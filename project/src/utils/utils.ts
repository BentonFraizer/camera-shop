import { Camera, FiltersType, FilterTypeItem, Order } from '../types';
const NEW_ITEMS_AMOUNT = 1;

export const separateNumbers = (priceToCheck: number): string => {
  const MIN_VALUE_TO_SEPARATE_ZEROS = 1000;
  if (priceToCheck < MIN_VALUE_TO_SEPARATE_ZEROS) {
    return String(priceToCheck);
  }

  //решение взято с ресурса: https://www.tune-it.ru/web/bleizard/blog/-/blogs/1371611
  const correctPrice = priceToCheck.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  return correctPrice;
};

//Функция определения нажатия клавиши Escape
export const isEscKeyPressed = (evt: React.KeyboardEvent) => evt.key === 'Escape' || evt.key === 'Esc';

//Функция определения нажатия клавиши Tab
export const isTabKeyPressed = (evt: React.KeyboardEvent) => evt.key === 'Tab';

//Функция определения нажатия клавиши Enter
export const isEnterKeyPressed = (evt: React.KeyboardEvent) => evt.key === 'Enter';

//Функция определения нажатия клавиши Space (пробел)
export const isSpaceKeyPressed = (evt: React.KeyboardEvent) => evt.code === 'Space';

// Функция для получения даты для аттрибута dateTime
export const convertDateForDateTimeAttr = (incorrectDate: string):string => {
  const CUT_FROM_VALUE = 0;
  const CUT_TO_VALUE = 10;

  const correctDate = incorrectDate.slice(CUT_FROM_VALUE, CUT_TO_VALUE);
  return correctDate;
};

// Функция для получения даты, понятной пользователю
export const humanizeDate = (gettedDate: string): string => {
  const GET_MONTH_VALUES = [5, 7];
  const GET_DATE_VALUES = [8, 10];
  const MONTHS:string[] = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря', ];
  const month = Number(gettedDate.slice(GET_MONTH_VALUES[0], GET_MONTH_VALUES[1]));
  const date = gettedDate.slice(GET_DATE_VALUES[0], GET_DATE_VALUES[1]);
  const humanizedDate = `${date} ${MONTHS[month - 1]}`;

  return humanizedDate;
};

// Функция для преобразования из "2022-10-03T21:00:06.970Z" (string) в 20221003 (number)
// Данная манипуляция необходима для дальнейшей сортировки элементов массива
export const getDateForSort = (gettedDate: string): number => {
  const GET_DATE_VALUES = [0, 10];
  const GET_TIME_VALUES = [11, 19];
  const dateWithoutTime = gettedDate.slice(GET_DATE_VALUES[0], GET_DATE_VALUES[1]).replaceAll('-', '');
  const timeWithoutDate = gettedDate.slice(GET_TIME_VALUES[0], GET_TIME_VALUES[1]).replaceAll(':', '');

  const numberForSort = Number(`${dateWithoutTime}${timeWithoutDate}`);

  return numberForSort;
};

export const makeURL = (parameters: object) => {
  const resultURL = new URL(window.location.origin);

  for (const [key, value] of Object.entries(parameters)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        resultURL.searchParams.append(key, item as string);
      }
    }

    if (typeof(value) === 'string') {
      resultURL.searchParams.append(key, value);
    }
  }
  return resultURL.searchParams.toString();
};

const sortUp = (dataForSort: Camera[]): Camera[] => {
  const copiedDataForSort = [...dataForSort];
  const sortedData = copiedDataForSort.sort((item1, item2) => {
    if (item1.price > item2.price) {
      return 1;
    }
    if (item1.price < item2.price) {
      return -1;
    }
    return 0;
  });
  return sortedData;
};

const sortDown = (dataForSort: Camera[]): Camera[] => {
  const copiedDataForSort = [...dataForSort];
  const sortedData = copiedDataForSort.sort((item1, item2) => {
    if (item1.price > item2.price) {
      return -1;
    }
    if (item1.price < item2.price) {
      return 1;
    }
    return 0;
  });
  return sortedData;
};

export const getMinPrice = (products: Camera[]): string | undefined => {
  if (products.length !== 0) {
    const sortedProducts = sortUp(products);
    return String(sortedProducts[0].price);
  }
};

export const getMaxPrice = (products: Camera[]): string | undefined => {
  if (products.length !== 0) {
    const sortedProducts = sortDown(products);
    return String(sortedProducts[0].price);
  }
};


export const getClosestMinPriceValue = (products: Camera[], gettedInputValue: number): string | undefined => {
  const sortedProducts = sortDown(products);

  let resultValue;
  sortedProducts.forEach((item) => {
    if (item.price >= gettedInputValue) {
      resultValue = item.price;
    }
  });

  if (resultValue !== undefined) {
    return String(resultValue);
  }
};

export const getClosestMaxPriceValue = (products: Camera[], gettedInputValue: number): string | undefined => {
  const sortedProducts = sortUp(products);

  let resultValue;
  sortedProducts.forEach((item) => {
    if (item.price <= gettedInputValue) {
      resultValue = item.price;
    }
  });

  if (resultValue !== undefined) {
    return String(resultValue);
  }
};

export const getPropertiesForCurrentChecbox = (checboxName:string, checboxes: FiltersType): FilterTypeItem => {
  let result = {name: '', option: ''};
  for (const [key, value] of Object.entries(checboxes)) {
    if (key.toLocaleLowerCase() === checboxName.replace('-', '')){
      result = value;
    }
  }
  return result;
};

export const refreshOrderData = (currentId:number, currentDataForOrder: Order) => {
  const AMOUNT_ITEMS_TO_CUT = 1;
  const copiedIdentifiers = [...currentDataForOrder.identifiers];
  const copiedAmounts = [...currentDataForOrder.amounts];
  const isIdExistsInCurrentOrder = copiedIdentifiers.includes(currentId);

  if (isIdExistsInCurrentOrder) {
    const indexOfId = copiedIdentifiers.indexOf(currentId);
    const newAmount = copiedAmounts[indexOfId] + 1;
    copiedAmounts.splice(indexOfId, AMOUNT_ITEMS_TO_CUT, newAmount);
    const result = {
      identifiers: [...currentDataForOrder.identifiers],
      amounts: [...copiedAmounts]
    };
    return result;
  }

  const result = {
    identifiers: [...currentDataForOrder.identifiers, currentId],
    amounts: [...currentDataForOrder.amounts, NEW_ITEMS_AMOUNT]
  };

  return result;
};

export const summarizeNumbers = (numbers: number[]) => numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
