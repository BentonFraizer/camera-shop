const DISCOUNT_VALUE_NAME = 'discount';

export const getDiscountValue = () => {
  const discountValue = localStorage.getItem(DISCOUNT_VALUE_NAME);
  return discountValue ?? '0';
};

export const saveDiscountValue = (discountValue: string) => {
  localStorage.setItem(DISCOUNT_VALUE_NAME, String(discountValue));
};

export const dropDiscountValue = () => {
  localStorage.removeItem(DISCOUNT_VALUE_NAME);
};
