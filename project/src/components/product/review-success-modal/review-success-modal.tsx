import { useRef, useEffect } from 'react';

type ReviewSuccessModalProps = {
  closeModal: () => void;
  isReviewSuccessModalOpened: boolean;
}

function ReviewSuccessModal({closeModal, isReviewSuccessModalOpened}: ReviewSuccessModalProps): JSX.Element {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const backToShoppingButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isReviewSuccessModalOpened === true) {
      closeButtonRef.current?.focus();
    }
  }, [isReviewSuccessModalOpened]);

  //решение взято с ресурса: https://hidde.blog/using-javascript-to-trap-focus-in-an-element/ и модифициронвано
  const tabBtnKeydownHandler = (evt: React.KeyboardEvent<Element>) => {
    if (evt.key !== 'Tab') {
      return;
    }

    if (isReviewSuccessModalOpened === true) {
      if (evt.key === 'Tab') {
        if (closeButtonRef.current !== null && backToShoppingButton.current !== null) {
          if (document.activeElement === closeButtonRef.current) {
            backToShoppingButton.current.focus();
            evt.preventDefault();
          } else {
            if (document.activeElement === backToShoppingButton.current) {
              closeButtonRef.current.focus();
              evt.preventDefault();
            }
          }
        }
      }
    }
  };

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper" >
        <div className="modal__overlay" onClick={() => closeModal()} ></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              ref={backToShoppingButton}
              onKeyDown={tabBtnKeydownHandler}
              onClick={() => closeModal()}
            >Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => closeModal()}
            ref={closeButtonRef}
            onKeyDown={tabBtnKeydownHandler}
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

export default ReviewSuccessModal;
