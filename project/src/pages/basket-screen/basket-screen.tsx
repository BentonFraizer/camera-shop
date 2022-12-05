import Icons from '../../components/icons/icons';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getOrderData } from '../../store/site-data/selectors';
import { summarizeNumbers, isEscKeyPressed } from '../../utils/utils';
import { getCameras } from '../../store/site-data/selectors';
import { fetchCamerasAction } from '../../store/api-actions';
import { useEffect,useState } from 'react';
import BasketItem from '../../components/basket-item/basket-item';
import DeleteItemModal from '../../components/delete-item-modal/delete-item-modal';
import { setOrderData } from '../../store/site-data/site-data';
import './basket-screen.css';

const NON_EXISTENT_ID = 0;
const ITEMS_AMOUNT_FOR_SCROLL = 2;
const ITEMS_AMOUNT_TO_DELETE = 1;

function BasketScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentOrderData = useAppSelector(getOrderData);
  const camerasList = useAppSelector(getCameras);
  const [isDeleteItemModalOpened, setIsDeleteItemModalOpened] = useState(false);
  const [idForAddItemModal, setIdForAddItemModal] = useState(NON_EXISTENT_ID);
  const isIdExists = idForAddItemModal !== NON_EXISTENT_ID;
  const dataForAddItemModal = isIdExists ? camerasList.find((camera) => camera.id === idForAddItemModal) : undefined;

  useEffect(() => {
    dispatch(fetchCamerasAction());
  }, [dispatch]);

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
    setIsDeleteItemModalOpened(false);
    document.body.style.overflowY = '';
    document.body.style.paddingRight = '0';
  };

  const handleEscBtnKeydown = (evt: React.KeyboardEvent<Element>) => {
    if (isDeleteItemModalOpened && isEscKeyPressed(evt)) {
      setIsDeleteItemModalOpened(false);
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '0';
    }
  };

  const onDeleteModalBtnClick = () => {
    const indexToDelete = currentOrderData.identifiers.indexOf(idForAddItemModal);
    const copiedAmounts = [...currentOrderData.amounts];
    const copiedIdentifiers = [...currentOrderData.identifiers];
    copiedAmounts.splice(indexToDelete, ITEMS_AMOUNT_TO_DELETE);
    copiedIdentifiers.splice(indexToDelete, ITEMS_AMOUNT_TO_DELETE);

    dispatch(setOrderData({
      amounts: [...copiedAmounts],
      identifiers: [...copiedIdentifiers],
    }));

    setIsDeleteItemModalOpened(false);
    document.body.style.overflowY = '';
    document.body.style.paddingRight = '0';
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
                      <form action="#">
                        <div className="custom-input">
                          <label><span className="custom-input__label">Промокод</span>
                            <input type="text" name="promo" placeholder="Введите промокод"/>
                          </label>
                          <p className="custom-input__error">Промокод неверный</p>
                          <p className="custom-input__success">Промокод принят!</p>
                        </div>
                        <button className="btn" type="submit">Применить
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="basket__summary-order">
                    <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">111 390 ₽</span></p>
                    <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                    <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
                    <button className="btn btn--purple" type="submit">Оформить заказ
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
        </main>

        <Footer/>

      </div>
    </>
  );
}

export default BasketScreen;
