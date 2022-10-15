import { Camera } from '../../../types';
import { separateNumbers } from '../../../utils/utils';
import { useRef, useEffect } from 'react';

type AddItemModalProps = {
  dataForAddItemModal?: Camera;
  onCloseClick: () => void;
  isModalOpened: boolean;
}

function AddItemModal({dataForAddItemModal, onCloseClick, isModalOpened}: AddItemModalProps): JSX.Element | null {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const addInBasketButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalWindowRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (isModalOpened === true) {
      addInBasketButtonRef.current?.focus();
    }
  }, [isModalOpened]);

  //решение взято и модифициронвано с ресурса: https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
  const tabBtnKeydownHandler = (evt:React.KeyboardEvent<Element>) => {
    if (evt.key !== 'Tab'){
      return;
    }

    if (isModalOpened === true) {
      if (evt.key === 'Tab') {
        if (closeButtonRef.current !== null && addInBasketButtonRef.current !== null) {
          if (document.activeElement === closeButtonRef.current) {
            addInBasketButtonRef.current.focus();
            evt.preventDefault();
          } else {
            if (document.activeElement === addInBasketButtonRef.current) {
              closeButtonRef.current.focus();
              evt.preventDefault();
            }
          }
        }
      }
    }
  };


  if(dataForAddItemModal === undefined) {
    return null;
  }

  const { name, vendorCode, price, type, category, level, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = dataForAddItemModal;


  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={(evt) => {
            evt.preventDefault();
            onCloseClick();
          }}
        >
        </div>
        <div
          className="modal__content"
          ref={modalWindowRef}
        >
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`}/>
                <img src={`../${previewImg}`} srcSet={`../${previewImg2x} 2x`} width="140" height="120" alt={`${category} ${name}`}/>
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{`${category} ${name}`}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{type}</li>
                <li className="basket-item__list-item">{level} уровень</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{separateNumbers(price)} ₽</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              ref={addInBasketButtonRef}
              onKeyDown={tabBtnKeydownHandler}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button
            ref={closeButtonRef}
            onKeyDown={tabBtnKeydownHandler}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={(evt) => {
              evt.preventDefault();
              onCloseClick();
            }}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;
