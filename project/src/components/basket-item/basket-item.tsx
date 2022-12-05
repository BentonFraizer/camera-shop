import React, { useState } from 'react';
import { Camera, Order } from '../../types';
import { separateNumbers, isEnterKeyPressed, isTabKeyPressed } from '../../utils/utils';
import { setOrderData } from '../../store/site-data/site-data';
import { useAppDispatch } from '../../hooks';
import './basket-item.css';

type BasketItemProps = {
  cameraData: Camera;
  orderData: Order;
  onClick:(id:number) => void;
}

enum PriceLength {
  Min = 0,
  Max = 2,
}

enum ProductsAmount {
  Min = 1,
  Max = 99,
}

const AMOUNT_ITEMS_TO_CUT = 1;

function BasketItem(props: BasketItemProps):JSX.Element {
  const { id, name, vendorCode, level, type, price, category, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = props.cameraData;
  const { amounts, identifiers } = props.orderData;
  const dispatch = useAppDispatch();
  const itemsAmount = amounts[identifiers.indexOf(id)];
  const [amountCounterInputValue, setAmountCounterInputValue] = useState<string | undefined>('');
  const disableReduceBtn = itemsAmount === ProductsAmount.Min;
  const disableincreaseBtn = itemsAmount === ProductsAmount.Max;

  const handleItemsCounterInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const currentValue = evt.target.value.replace(/^0/, '').replace(/\D/g,'').substring(PriceLength.Min, PriceLength.Max);

    setAmountCounterInputValue(currentValue);
  };

  const handleItemsCounterInputFocus = () => {
    setAmountCounterInputValue(String(itemsAmount));
  };

  const handleItemsCounterInputKeydown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (isTabKeyPressed(evt)) {
      setAmountCounterInputValue(String(itemsAmount));
    }

    if (isEnterKeyPressed(evt)) {
      const copiedAmounts = [...amounts];
      const indexOfAmount = identifiers.indexOf(id);
      copiedAmounts.splice(indexOfAmount, AMOUNT_ITEMS_TO_CUT, Number(amountCounterInputValue));

      dispatch(setOrderData({
        amounts: [...copiedAmounts],
        identifiers: [...identifiers],
      }));
    }
  };

  const handleItemsCounterInputBlur = () => {
    setAmountCounterInputValue(String(itemsAmount));
  };

  const handlePrevBtnClick = () => {
    const copiedAmounts = [...amounts];
    const indexOfAmount = identifiers.indexOf(id);
    const newAmount = copiedAmounts[indexOfAmount] - 1;
    copiedAmounts.splice(indexOfAmount, AMOUNT_ITEMS_TO_CUT, newAmount);

    dispatch(setOrderData({
      amounts: [...copiedAmounts],
      identifiers: [...identifiers],
    }));
    setAmountCounterInputValue(String(newAmount));
  };

  const handleNextBtnClick = () => {
    const copiedAmounts = [...amounts];
    const indexOfAmount = identifiers.indexOf(id);
    const newAmount = copiedAmounts[indexOfAmount] + 1;
    copiedAmounts.splice(indexOfAmount, AMOUNT_ITEMS_TO_CUT, newAmount);

    dispatch(setOrderData({
      amounts: [...copiedAmounts],
      identifiers: [...identifiers],
    }));
    setAmountCounterInputValue(String(newAmount));
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`}/>
          <img src={`../${previewImg}`} srcSet={`../${previewImg2x} 2x`} width="140" height="120" alt="Фотоаппарат «Орлёнок»"/>
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{category} «{name}»</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{type} {category.toLowerCase() === 'фотоаппарат' ? 'фотокамера' : 'видеокамера'}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{separateNumbers(price)} ₽</p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          disabled={disableReduceBtn}
          onClick={handlePrevBtnClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor={`counter-${id}`}></label>
        <input
          type="text"
          id={`counter-${id}`}
          aria-label="количество товара"
          placeholder={String(itemsAmount)}
          value={amountCounterInputValue}
          onChange={handleItemsCounterInputChange}
          onFocus={handleItemsCounterInputFocus}
          onKeyDown={handleItemsCounterInputKeydown}
          onBlur={handleItemsCounterInputBlur}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          disabled={disableincreaseBtn}
          onClick={handleNextBtnClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{separateNumbers(itemsAmount * price)} ₽</div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => props.onClick(id)}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
