import Icons from '../../components/icons/icons';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import React, { useEffect, useState } from 'react';
import { getCameras, getPromoCamera } from '../../store/site-data/selectors';
import { fetchCamerasAction, fetchPromoCameraAction } from '../../store/api-actions';
import ProductsList from '../../components/products-list/products-list';
import AddItemModal from '../../components/catalog/add-item-modal/add-item-modal';
import { isEscKeyPressed } from '../../utils/utils';
import { Camera } from '../../types';
import Pagination from '../../components/pagination/pagination';
// import AddItemSuccessModal from '../../components/catalog/add-item-success-modal/add-item-success-modal';

function CatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const camerasList = useAppSelector(getCameras);
  const promoCamera = useAppSelector(getPromoCamera);
  const [isAddItemModalOpened, setIsAddItemModalOpened] = useState(false);
  const NON_EXISTENT_ID = 0;
  const [idForAddItemModal, setIdForAddItemModal] = useState(NON_EXISTENT_ID);
  let dataForAddItemModal;
  const [showPagination, setShowPagination] = useState(false);
  const EMPTY_ARRAY_LENGTH = 0;
  const PRODUCTS_PER_PAGE = 9;
  const FIRST_PAGE_NUMBER = 1;
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE_NUMBER);
  const PIXELS_FROM_TOP = 348;
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate(`/catalog/page_${FIRST_PAGE_NUMBER}`);
      setCurrentPage(FIRST_PAGE_NUMBER);
    }
  }, [navigate]);

  if (idForAddItemModal !== NON_EXISTENT_ID) {
    dataForAddItemModal = camerasList.find((camera) => camera.id === idForAddItemModal);
  }

  useEffect(() => {
    if (camerasList.length !== EMPTY_ARRAY_LENGTH && camerasList.length > PRODUCTS_PER_PAGE) {
      setShowPagination(true);
    } else {
      setShowPagination(false);
    }
  }, [camerasList]);

  useEffect(() => {
    dispatch(fetchCamerasAction());
    dispatch(fetchPromoCameraAction());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, PIXELS_FROM_TOP);
  }, [currentPage]);

  const onBuyButtonClick = (gettedId: number) => {
    if (gettedId !== undefined) {
      setIdForAddItemModal(gettedId);
    }
    setIsAddItemModalOpened(true);
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = '17px';
  };

  const onCloseBtnOrOverlayClick = () => {
    setIsAddItemModalOpened(false);
    document.body.style.overflowY = '';
    document.body.style.paddingRight = '0';
  };

  const escKeyDownCloseModalHandler = (evt: React.KeyboardEvent<Element>) => {
    if (isAddItemModalOpened && isEscKeyPressed(evt)) {
      setIsAddItemModalOpened(false);
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '0';
    }
  };

  const getProductsToRender = (numberOfPage: number, productsList: Camera[], productsPerPage: number ): Camera[] => {
    const firstProductIndex = (numberOfPage - 1) * productsPerPage;
    const lastProductIndex = numberOfPage * productsPerPage;
    const productsToRender = productsList.slice(firstProductIndex, lastProductIndex);
    return productsToRender;
  };
  const productsToRender = (getProductsToRender(currentPage, camerasList, PRODUCTS_PER_PAGE));

  const paginate = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };
  const onPrevButtonClick = () => setCurrentPage(currentPage - 1);
  const onNextButtonClick = () => setCurrentPage(currentPage + 1);

  return (
    <>
      <Icons/>
      <div className="wrapper">

        <Header/>

        <main onKeyDown={escKeyDownCloseModalHandler} >

          <Banner promoCamera={promoCamera}/>

          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to='/'>Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                  </li>
                </ul>
              </div>
            </div>
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">
                  <div className="catalog__aside">
                    <div className="catalog-filter">
                      <form action="#">
                        <h2 className="visually-hidden">Фильтр</h2>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Цена, ₽</legend>
                          <div className="catalog-filter__price-range">
                            <div className="custom-input">
                              <label>
                                <input type="number" name="price" placeholder="от"/>
                              </label>
                            </div>
                            <div className="custom-input">
                              <label>
                                <input type="number" name="priceUp" placeholder="до"/>
                              </label>
                            </div>
                          </div>
                        </fieldset>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Категория</legend>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="photocamera" defaultChecked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="videocamera"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Видеокамера</span>
                            </label>
                          </div>
                        </fieldset>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Тип камеры</legend>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="digital" defaultChecked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="film" disabled/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="snapshot"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="collection" defaultChecked disabled/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
                            </label>
                          </div>
                        </fieldset>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Уровень</legend>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="zero" defaultChecked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="non-professional"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="professional"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
                            </label>
                          </div>
                        </fieldset>
                        <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="catalog__content">
                    <div className="catalog-sort">
                      <form action="#">
                        <div className="catalog-sort__inner">
                          <p className="title title--h5">Сортировать:</p>
                          <div className="catalog-sort__type">
                            <div className="catalog-sort__btn-text">
                              <input type="radio" id="sortPrice" name="sort" defaultChecked/>
                              <label htmlFor="sortPrice">по цене</label>
                            </div>
                            <div className="catalog-sort__btn-text">
                              <input type="radio" id="sortPopular" name="sort"/>
                              <label htmlFor="sortPopular">по популярности</label>
                            </div>
                          </div>
                          <div className="catalog-sort__order">
                            <div className="catalog-sort__btn catalog-sort__btn--up">
                              <input type="radio" id="up" name="sort-icon" defaultChecked aria-label="По возрастанию"/>
                              <label htmlFor="up">
                                <svg width="16" height="14" aria-hidden="true">
                                  <use xlinkHref="#icon-sort"></use>
                                </svg>
                              </label>
                            </div>
                            <div className="catalog-sort__btn catalog-sort__btn--down">
                              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию"/>
                              <label htmlFor="down">
                                <svg width="16" height="14" aria-hidden="true">
                                  <use xlinkHref="#icon-sort"></use>
                                </svg>
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>

                    <ProductsList
                      productsList={productsToRender}
                      onClick={onBuyButtonClick}
                    />

                    { showPagination &&
                      <Pagination
                        productsList={camerasList}
                        productsPerPage={PRODUCTS_PER_PAGE}
                        currentPage={currentPage}
                        onNumberedLinkClick={paginate}
                        prevButtonClick={onPrevButtonClick}
                        nextButtonClick={onNextButtonClick}
                      /> }

                  </div>
                </div>
              </div>
            </section>
          </div>
          {
            isAddItemModalOpened &&
            <AddItemModal
              dataForAddItemModal={dataForAddItemModal}
              onCloseClick={onCloseBtnOrOverlayClick}
              isModalOpened={isAddItemModalOpened}
            />
          }
          {/* {isBookingModalOpened && <AddItemModal onCloseClick={onCloseBtnClick}/>} */}
          {/* <AddItemSuccessModal/> */}
        </main>

        <Footer/>

      </div>
    </>
  );
}

export default CatalogScreen;
