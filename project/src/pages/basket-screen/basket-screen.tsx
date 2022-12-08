import Icons from '../../components/icons/icons';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getOrderData } from '../../store/site-data/selectors';
import { summarizeNumbers, isEscKeyPressed } from '../../utils/utils';
import { getCameras, getIsOrderSentSuccessful, getIsOrderSentError } from '../../store/site-data/selectors';
import { fetchCamerasAction, couponPostAction, orderPostAction } from '../../store/api-actions';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import BasketItem from '../../components/basket-item/basket-item';
import DeleteItemModal from '../../components/delete-item-modal/delete-item-modal';
import GratitudeModal from '../../components/gratitude-modal/gratitude-modal';
import { setOrderData, resetIsOrderSentSuccessful, resetIsOrderSentError } from '../../store/site-data/site-data';
import { getTotalPrice, separateNumbers, convertPercentToCouponValue } from '../../utils/utils';
import { getDiscountValue, dropDiscountValue } from '../../services/discount';
import { AppRoute, Promocode } from '../../consts';
import './basket-screen.css';
import { redirectToRoute } from '../../store/action';

const NON_EXISTENT_ID = 0;
const ITEMS_AMOUNT_FOR_SCROLL = 2;
const ITEMS_AMOUNT_TO_DELETE = 1;
const BEGIN_OF_PAGE_COORDINATE = 0;
const MAX_PERCENTAGE_VALUE = 100;
const EMPTY_BASKET_ITEMS_AMOUTN = 0;
const SYMBOLS_IN_EMPTY_STRING = 0;
const ZERO_PERCENT_VALUE = 0;

function BasketScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentOrderData = useAppSelector(getOrderData);
  const camerasList = useAppSelector(getCameras);
  const isOrderSentSuccessful = useAppSelector(getIsOrderSentSuccessful);
  const isOrderSentError = useAppSelector(getIsOrderSentError);
  const [isDeleteItemModalOpened, setIsDeleteItemModalOpened] = useState(false);
  const [isGratitudeModalOpened, setIsGratitudeModalOpened] = useState(false);
  const [idForAddItemModal, setIdForAddItemModal] = useState(NON_EXISTENT_ID);
  const [promocodeInputValue, setPromocodeInputValue] = useState('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const isIdExists = idForAddItemModal !== NON_EXISTENT_ID;
  const dataForAddItemModal = isIdExists ? camerasList.find((camera) => camera.id === idForAddItemModal) : undefined;
  const totalPrice = getTotalPrice(currentOrderData);
  const discountValueInPercent = Number(getDiscountValue());
  const discountFromTotalnRubles = (totalPrice * discountValueInPercent) / MAX_PERCENTAGE_VALUE;
  const costForPayment = totalPrice - discountFromTotalnRubles;
  const isApplyBtnDisabled = Number(promocodeInputValue) === SYMBOLS_IN_EMPTY_STRING;
  const isOrderBtnDisabled = currentOrderData.amounts.length === EMPTY_BASKET_ITEMS_AMOUTN;

  console.log('discountValue', discountValueInPercent);
  // console.log('promocodeInputValue', promocodeInputValue);
  // console.log('isValid', isValid);
  // console.log('isInvalid', isInvalid);

  useEffect(() => {
    if (isOrderSentSuccessful) {
      setIsGratitudeModalOpened(true);
    }
  }, [isOrderSentSuccessful]);

  useEffect(() => {
    dispatch(fetchCamerasAction());
  }, [dispatch]);

  useEffect(() => {
    if (isOrderSentError) {
      dispatch(resetIsOrderSentError());
      dispatch(redirectToRoute(AppRoute.FailedOrder));
    }
  }, [dispatch, isOrderSentError]);

  // Поднятие страницы в начало
  useEffect(() => {
    window.scrollTo({
      top: BEGIN_OF_PAGE_COORDINATE,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    window.onunload = () => {
      dropDiscountValue();
    };
  }, []);

  const onDeleteItemBtnClick = (gettedId:number) => {
    if (gettedId !== undefined) {
      setIdForAddItemModal(gettedId);
    }

    setIsDeleteItemModalOpened(true);
    if(currentOrderData.amounts.length > ITEMS_AMOUNT_FOR_SCROLL) {
      document.body.style.overflowY = 'hidden';
      document.body.style.paddingRight = '17px';
    }
  };

  const onCloseBtnOrOverlayClick = () => {
    if (isDeleteItemModalOpened) {
      setIsDeleteItemModalOpened(false);
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '0';
    }

    if (isGratitudeModalOpened) {
      setIsGratitudeModalOpened(false);
      dispatch(resetIsOrderSentSuccessful());
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '0';

      dispatch(setOrderData({
        amounts: [],
        identifiers: [],
        prices: [],
      }));
    }
  };

  const handleEscBtnKeydown = (evt: React.KeyboardEvent<Element>) => {
    if (isDeleteItemModalOpened && isEscKeyPressed(evt)) {
      setIsDeleteItemModalOpened(false);
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '0';
    }

    if (isGratitudeModalOpened && isEscKeyPressed(evt)) {
      setIsGratitudeModalOpened(false);
      dispatch(resetIsOrderSentSuccessful());
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '0';

      dispatch(setOrderData({
        amounts: [],
        identifiers: [],
        prices: [],
      }));
    }
  };

  const onDeleteModalBtnClick = () => {
    const indexToDelete = currentOrderData.identifiers.indexOf(idForAddItemModal);
    const copiedAmounts = [...currentOrderData.amounts];
    const copiedIdentifiers = [...currentOrderData.identifiers];
    const copiedPrices = [...currentOrderData.prices];
    copiedAmounts.splice(indexToDelete, ITEMS_AMOUNT_TO_DELETE);
    copiedIdentifiers.splice(indexToDelete, ITEMS_AMOUNT_TO_DELETE);
    copiedPrices.splice(indexToDelete, ITEMS_AMOUNT_TO_DELETE);

    dispatch(setOrderData({
      amounts: [...copiedAmounts],
      identifiers: [...copiedIdentifiers],
      prices: [...copiedPrices],
    }));

    setIsDeleteItemModalOpened(false);
    document.body.style.overflowY = '';
    document.body.style.paddingRight = '0';
  };

  const handlePromoInputOnInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const correctedValue = (evt.target.value).replaceAll(' ', '');
    setPromocodeInputValue(correctedValue);
  };

  const handleInputFocus = () => {
    setIsValid(false);
    setIsInvalid(false);
    setPromocodeInputValue('');
  };

  const handlePromocodeFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isPromocodeValid = promocodeInputValue === Promocode.Camera333 || promocodeInputValue === Promocode.Camera444 || promocodeInputValue === Promocode.Camera555;

    if (isPromocodeValid) {
      setIsValid(true);
      setIsInvalid(false);
      dispatch(couponPostAction({
        coupon: promocodeInputValue,
      }));
      setPromocodeInputValue('');
    } else {
      setIsInvalid(true);
      setIsValid(false);
    }
  };

  const handleOrderBtnClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (discountValueInPercent === ZERO_PERCENT_VALUE) {
      dispatch(orderPostAction({
        camerasIds: [...currentOrderData.identifiers],
        coupon: null,
      }));
    } else {
      dispatch(orderPostAction({
        camerasIds: [...currentOrderData.identifiers],
        coupon: convertPercentToCouponValue(discountValueInPercent),
      }));
    }
  };

  const getClassForInput = (valid: boolean, invalid: boolean) => {
    if (!valid && !invalid) {
      return 'custom-input';
    }

    if (valid && !invalid) {
      return 'custom-input is-valid';
    }

    return 'custom-input is-invalid';
  };

  const onBackToShoppingBtnClick = () => {
    dispatch(resetIsOrderSentSuccessful());
    dispatch(setOrderData({
      amounts: [],
      identifiers: [],
      prices: [],
    }));
  };

  return (
    <>
      <Icons/>
      <div className="wrapper">

        <Header
          basketCount={summarizeNumbers(currentOrderData.amounts)}
        />

        <main onKeyDown={handleEscBtnKeydown} className="main">
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link" href="#!">Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </a>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to='/'>Каталог
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                  </li>
                </ul>
              </div>
            </div>
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2" data-testid="basket">Корзина</h1>
                <ul className="basket__list">

                  {camerasList.map((product) =>
                    currentOrderData.identifiers.includes(product.id) &&
                      (
                        <BasketItem
                          key={product.id}
                          cameraData={product}
                          orderData={currentOrderData}
                          onClick={onDeleteItemBtnClick}
                        />
                      )
                  )}

                </ul>
                <div className="basket__summary">
                  <div className="basket__promo">
                    <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                    <div className="basket-form">
                      <form
                        action="#"
                        onSubmit={handlePromocodeFormSubmit}
                      >
                        <div className={getClassForInput(isValid, isInvalid)}>
                          <label><span className="custom-input__label">Промокод</span>
                            <input
                              type="text"
                              name="promo"
                              placeholder="Введите промокод"
                              onInput={handlePromoInputOnInput}
                              value={promocodeInputValue}
                              onFocus={handleInputFocus}
                            />
                          </label>
                          <p className="custom-input__error is-invalid">Промокод неверный</p>
                          <p className="custom-input__success">Промокод принят!</p>
                        </div>
                        <button
                          className="btn"
                          type="submit"
                          disabled={isApplyBtnDisabled}
                        >Применить
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="basket__summary-order">
                    <p className="basket__summary-item">
                      <span className="basket__summary-text">Всего:</span>
                      <span className="basket__summary-value">{separateNumbers(totalPrice)} ₽</span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text">Скидка:</span>
                      <span className={(discountValueInPercent !== 0 && totalPrice > 0) ? 'basket__summary-value basket__summary-value--bonus' : 'basket__summary-value'}>{separateNumbers(discountFromTotalnRubles)} ₽</span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                      <span className="basket__summary-value basket__summary-text--total">{separateNumbers(costForPayment)} ₽</span>
                    </p>
                    <button
                      className="btn btn--purple"
                      type="button"
                      disabled={isOrderBtnDisabled}
                      onClick={handleOrderBtnClick}
                    >Оформить заказ
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {
            isDeleteItemModalOpened &&
            <DeleteItemModal
              dataForAddItemModal={dataForAddItemModal}
              onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
              isModalOpened={isDeleteItemModalOpened}
              onDeleteBtnClick={onDeleteModalBtnClick}
            />
          }
          {
            isGratitudeModalOpened &&
            <GratitudeModal
              onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
              isModalOpened={isGratitudeModalOpened}
              onBackToShoppingBtnClick={onBackToShoppingBtnClick}
            />
          }
        </main>

        <Footer/>

      </div>
    </>
  );
}

export default BasketScreen;
