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
  const dateWithoutTime = gettedDate.slice(GET_DATE_VALUES[0], GET_DATE_VALUES[1]);
  const numberForSort = Number(dateWithoutTime.replaceAll('-', ''));

  return numberForSort;
};
