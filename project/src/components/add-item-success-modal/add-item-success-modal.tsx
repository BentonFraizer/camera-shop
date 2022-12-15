import { useRef, useEffect } from 'react';
import { isTabKeyPressed } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

const TAB_EVENT_CODE = 'Tab';

type AddItemSuccessModalProps = {
  onCloseBtnOrOverlayClick: () => void;
  isModalOpened: boolean;
}

function AddItemSuccessModal({onCloseBtnOrOverlayClick, isModalOpened}: AddItemSuccessModalProps): JSX.Element {
  const continueButtonRef = useRef<HTMLAnchorElement | null>(null);
  const goToBasketRef = useRef<HTMLAnchorElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isModalOpened === true) {
      continueButtonRef.current?.focus();
    }
  }, [isModalOpened]);

  //решение взято и модифициронвано с ресурса: https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
  const handleShiftTabBtnsKeydown = (evt:React.KeyboardEvent<Element>) => {
    const isShiftTabBtnsPressed = (isTabKeyPressed(evt) || evt.code === TAB_EVENT_CODE) && evt.shiftKey;
    const isContinueBtnActiveElement = document.activeElement === continueButtonRef.current;
    const isCloseBtnActiveElement = document.activeElement === closeButtonRef.current;

    if (isShiftTabBtnsPressed) {
      if (isModalOpened && isCloseBtnActiveElement) {
        goToBasketRef.current?.focus();
        evt.preventDefault();
      }

      if (isModalOpened && isContinueBtnActiveElement) {
        closeButtonRef.current?.focus();
        evt.preventDefault();
      }
    }
  };

  const handleTabBtnKeydown = (evt:React.KeyboardEvent<Element>) => {
    const isShiftBtnPressed = evt.shiftKey;
    const isCloseBtnActiveElement = document.activeElement === closeButtonRef.current;

    if (isModalOpened && isTabKeyPressed(evt) && !isShiftBtnPressed) {
      if (isCloseBtnActiveElement) {
        continueButtonRef.current?.focus();
        evt.preventDefault();
      }
    }
  };

  const handleCloseBtnOrOverlayClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    onCloseBtnOrOverlayClick();
  };

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={(evt) => handleCloseBtnOrOverlayClick(evt)}
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link
              to={AppRoute.Catalog}
              className="btn btn--transparent modal__btn"
              ref={continueButtonRef}
              onKeyDown={handleShiftTabBtnsKeydown}
              onClick={() => onCloseBtnOrOverlayClick()}
              data-testid="continue-shopping-btn"
            >Продолжить покупки
            </Link>
            <Link
              className="btn btn--purple modal__btn modal__btn--fit-width"
              ref={goToBasketRef}
              to={AppRoute.Basket}
              onClick={() => onCloseBtnOrOverlayClick()}
              data-testid="go-to-basket"
            >Перейти в корзину
            </Link>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={(evt) => handleCloseBtnOrOverlayClick(evt)}
            ref={closeButtonRef}
            onKeyDown={handleTabBtnKeydown}
            data-testid="close-btn"
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

export default AddItemSuccessModal;
