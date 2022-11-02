import { useState, useRef, FormEvent, useEffect } from 'react';
import { ReviewData } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { reviewPostAction } from '../../../store/api-actions';
import { getIsPostSendingStatus } from '../../../store/site-data/selectors';
import { isTabKeyPressed } from '../../../utils/utils';

const TAB_EVENT_CODE = 'Tab';

type ReviewModalProps = {
  onCloseBtnOrOverlayClick: () => void;
  cameraId: string | undefined;
  isReviewModalOpened: boolean;
};

function ReviewModal({onCloseBtnOrOverlayClick, cameraId, isReviewModalOpened}: ReviewModalProps):JSX.Element {
  const dispatch = useAppDispatch();
  const isPostSentSuccessfully = useAppSelector(getIsPostSendingStatus);
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [isRatingIsInvalid, setIsRatingIsInvalid] = useState(false);
  const [isNameIsInvalid, setIsNameIsInvalid] = useState(false);
  const [isAdvantagesIsInvalid, setIsAdvantagesIsInvalid] = useState(false);
  const [isDisadvantagesIsInvalid, setIsDisadvantagesIsInvalid] = useState(false);
  const [isReviewIsInvalid, setIsReviewIsInvalid] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const advantagesRef = useRef<HTMLInputElement | null>(null);
  const disadvantagesRef = useRef<HTMLInputElement | null>(null);
  const reviewRef = useRef<HTMLTextAreaElement | null>(null);
  const firstStartRef = useRef<HTMLInputElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const sentReviewButtonRef = useRef<HTMLButtonElement | null>(null);

  const postDataOnSubmit = (reviewData: ReviewData) => {
    dispatch(reviewPostAction(reviewData));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsRatingIsInvalid(ratingValue === null);
    setIsNameIsInvalid(nameRef.current?.value === null || nameRef.current?.value === '');
    setIsAdvantagesIsInvalid(advantagesRef.current?.value === null || advantagesRef.current?.value === '');
    setIsDisadvantagesIsInvalid(disadvantagesRef.current?.value === null || disadvantagesRef.current?.value === '');
    setIsReviewIsInvalid(reviewRef.current?.value === null || reviewRef.current?.value === '');
    const isAllInputsNotEmpty = nameRef.current?.value !== '' && advantagesRef.current?.value !== '' && disadvantagesRef.current?.value !== '' && reviewRef.current?.value !== '' && ratingValue !== null;

    if (isAllInputsNotEmpty) {
      setIsSubmitButtonDisabled(true);
      postDataOnSubmit({
        cameraId: Number(cameraId),
        userName: nameRef.current?.value,
        advantage: advantagesRef.current?.value,
        disadvantage: disadvantagesRef.current?.value,
        review: reviewRef.current?.value,
        rating: ratingValue,
      });
    }

    evt.preventDefault();
    return null;
  };

  useEffect(() => {
    if (isPostSentSuccessfully === false) {
      setIsSubmitButtonDisabled(false);
    }
  }, [isPostSentSuccessfully]);

  useEffect(() => {
    if (isReviewModalOpened === true) {
      firstStartRef.current?.focus();
    }
  }, [isReviewModalOpened]);

  const handleShiftTabBtnsKeydown = (evt:React.KeyboardEvent<Element>) => {
    const isShiftTabBtnsPressed = (isTabKeyPressed(evt) || evt.code === TAB_EVENT_CODE) && evt.shiftKey;
    const isFirstStarInputActiveElement = document.activeElement === firstStartRef.current;

    if (isReviewModalOpened === true && isShiftTabBtnsPressed && isFirstStarInputActiveElement) {
      closeButtonRef.current?.focus();
      evt.preventDefault();
    }
  };

  const handleTabBtnKeydown = (evt:React.KeyboardEvent<Element>) => {
    const isFocusableElementsNotEmpty = closeButtonRef.current !== null && firstStartRef.current !== null;
    const isOnlyTabKeyPressed = isTabKeyPressed(evt) && !evt.shiftKey;
    const isCloseBtnActiveElement = document.activeElement === closeButtonRef.current;

    if (isReviewModalOpened === true && isOnlyTabKeyPressed && isFocusableElementsNotEmpty && isCloseBtnActiveElement) {
      firstStartRef.current?.focus();
      evt.preventDefault();
    }
  };

  return(
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={ () => onCloseBtnOrOverlayClick() }
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form
              method="post"
              onSubmit={handleFormSubmit}
            >
              <div className="form-review__rate">
                <fieldset className={isRatingIsInvalid ? 'rate form-review__item is-invalid' : 'rate form-review__item'}>
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5" onClick={(evt) => setRatingValue(Number((evt.target as HTMLInputElement).value))}/>
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4" onClick={(evt) => setRatingValue(Number((evt.target as HTMLInputElement).value))}/>
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3" onClick={(evt) => setRatingValue(Number((evt.target as HTMLInputElement).value))}/>
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2" onClick={(evt) => setRatingValue(Number((evt.target as HTMLInputElement).value))} />
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1" onClick={(evt) => setRatingValue(Number((evt.target as HTMLInputElement).value))} ref={firstStartRef} onKeyDown={handleShiftTabBtnsKeydown}/>
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{ratingValue || '0'}</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div
                  className={isNameIsInvalid ? 'custom-input form-review__item is-invalid' : 'custom-input form-review__item'}
                  data-testid="div-user-name"
                >
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-name"
                      placeholder="Введите ваше имя"
                      ref={nameRef}
                      data-testid="input-user-name"
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div
                  className={isAdvantagesIsInvalid ? 'custom-input form-review__item is-invalid' : 'custom-input form-review__item'}
                  data-testid="div-user-plus"
                >
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-plus"
                      placeholder="Основные преимущества товара"
                      ref={advantagesRef}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className={isDisadvantagesIsInvalid ? 'custom-input form-review__item is-invalid' : 'custom-input form-review__item'}>
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-minus"
                      placeholder="Главные недостатки товара"
                      ref={disadvantagesRef}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className={isReviewIsInvalid ? 'custom-textarea form-review__item is-invalid' : 'custom-textarea form-review__item'}>
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      name="user-comment"
                      minLength={5}
                      placeholder="Поделитесь своим опытом покупки"
                      ref={reviewRef}
                    >
                    </textarea>
                  </label>
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
                disabled={isSubmitButtonDisabled}
                ref={sentReviewButtonRef}
              >Отправить отзыв
              </button>
            </form>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => onCloseBtnOrOverlayClick()}
            ref={closeButtonRef}
            onKeyDown={handleTabBtnKeydown}
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

export default ReviewModal;
