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
