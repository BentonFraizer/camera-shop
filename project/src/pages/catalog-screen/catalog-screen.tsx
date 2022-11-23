import Icons from '../../components/icons/icons';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import React, { useEffect, useState } from 'react';
import { getIsDataLoadedStatus, getPromoCamera, getSortedAndFilteredCameras } from '../../store/site-data/selectors';
import { fetchPromoCameraAction, fetchSortedAndFilteredCamerasAction } from '../../store/api-actions';
import ProductsList from '../../components/products-list/products-list';
import AddItemModal from '../../components/add-item-modal/add-item-modal';
import { isEscKeyPressed, makeURL } from '../../utils/utils';
import { Camera } from '../../types';
import Pagination from '../../components/pagination/pagination';
import Loader from '../../components/loader/loader';
import EmptyQuery from '../../components/empty-query/empty-query';
import Filter from '../../components/filter/filter';
import { START_PARAMS, FIRST_PAGE_NUMBER } from '../../consts';

const BEGIN_OF_PAGE_COORDINATE = 0;
const EMPTY_ARRAY_LENGTH = 0;
const PRODUCTS_PER_PAGE = 9;
const NON_EXISTENT_ID = 0;

function CatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoCamera = useAppSelector(getPromoCamera);
  const navigate = useNavigate();
  const camerasList = useAppSelector(getSortedAndFilteredCameras);
  const isDataLoading = useAppSelector(getIsDataLoadedStatus);
  const [params, setParams] = useState(START_PARAMS);
  const [isAddItemModalOpened, setIsAddItemModalOpened] = useState(false);
  const [idForAddItemModal, setIdForAddItemModal] = useState(NON_EXISTENT_ID);
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE_NUMBER);

  const [, setSearchParams] = useSearchParams(params);
  // Получение данных по конкретному продукту для заполнения полей модального окна "Добавить товар в корзину"
  const isIdExists = idForAddItemModal !== NON_EXISTENT_ID;
  const dataForAddItemModal = isIdExists ? camerasList.find((camera) => camera.id === idForAddItemModal) : undefined;

  useEffect(() => {
    setSearchParams(makeURL(params));
  }, [params, setSearchParams]);

  useEffect(() => {
    window.onload = () => {
      navigate(`/catalog/page_${FIRST_PAGE_NUMBER}`);
      setCurrentPage(FIRST_PAGE_NUMBER);
    };

    if (window.location.pathname === '/') {
      navigate(`/catalog/page_${FIRST_PAGE_NUMBER}`);
      setCurrentPage(FIRST_PAGE_NUMBER);
    }
  }, [navigate]);

  // Скрытие/отображение секции "Пагинация"
  const isPaginationVisible = camerasList.length !== EMPTY_ARRAY_LENGTH && camerasList.length > PRODUCTS_PER_PAGE;

  useEffect(() => {
    dispatch(fetchSortedAndFilteredCamerasAction(makeURL(params)));
  }, [dispatch, params]);

  useEffect(() => {
    dispatch(fetchPromoCameraAction());
  }, [dispatch]);

  // Поднятие страницы в начало
  useEffect(() => {
    window.scrollTo({
      top: BEGIN_OF_PAGE_COORDINATE,
      behavior: 'smooth'
    });
  }, [currentPage]);

  // Обработчик натия на кнопку "Купить" для открытия модального окна "Добавить товар в корзину"
  const onBuyButtonClick = (gettedId: number) => {
    if (gettedId !== undefined) {
      setIdForAddItemModal(gettedId);
    }
    setIsAddItemModalOpened(true);
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = '17px';
  };

  // Обработчики закрытия модальных окон по нажатию Кнопки закрытия, нажатия на overlay, нажатия на Esc
  const onCloseBtnOrOverlayClick = () => {
    setIsAddItemModalOpened(false);
    document.body.style.overflowY = '';
    document.body.style.paddingRight = '0';
  };

  const handleEscBtnKeydown = (evt: React.KeyboardEvent<Element>) => {
    if (isAddItemModalOpened && isEscKeyPressed(evt)) {
      setIsAddItemModalOpened(false);
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '0';
    }
  };

  // Функция для получения товаров для отрисовки в зависимости от страницы пагинации
  const getProductsToRender = (numberOfPage: number, productsList: Camera[], productsPerPage: number ): Camera[] => {
    const firstProductIndex = (numberOfPage - 1) * productsPerPage;
    const lastProductIndex = numberOfPage * productsPerPage;
    const productsToRender = productsList.slice(firstProductIndex, lastProductIndex);
    return productsToRender;
  };
  const productsToRender = (getProductsToRender(currentPage, camerasList, PRODUCTS_PER_PAGE));

  const onPaginationLinkClick = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };
  const onPrevButtonClick = () => setCurrentPage(currentPage - 1);
  const onNextButtonClick = () => setCurrentPage(currentPage + 1);

  // Обработчики нажатий на элементы сортировки
  const handleSortPriceBtnClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.checked) {
      setParams({...params, _sort: 'price'});
    }
  };

  const handleSortPopularBtnClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.checked) {
      setParams({...params, _sort: 'rating'});
    }
  };

  const handleSortUpBtnClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.checked) {
      setParams({...params, _order: 'asc'});
    }
  };

  const handleSortDownBtnClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.checked) {
      setParams({...params, _order: 'desc'});
    }
  };

  return (
    <>
      <Icons/>
      <div className="wrapper">

        <Header/>

        <main onKeyDown={handleEscBtnKeydown} >

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

                    <Filter
                      params={params}
                      cameras={camerasList}
                      onSetParams={setParams}
                      onSetCurrentPage={setCurrentPage}
                    />

                  </div>
                  <div className="catalog__content">
                    <div className="catalog-sort">
                      <form action="#">
                        <div className="catalog-sort__inner">
                          <p className="title title--h5">Сортировать:</p>
                          <div className="catalog-sort__type">
                            <div className="catalog-sort__btn-text">
                              <input
                                type="radio"
                                id="sortPrice"
                                name="sort"
                                onChange={handleSortPriceBtnClick}
                                checked={params._sort === 'price'}
                              />
                              <label htmlFor="sortPrice">по цене</label>
                            </div>
                            <div className="catalog-sort__btn-text">
                              <input
                                type="radio"
                                id="sortPopular"
                                name="sort"
                                onChange={handleSortPopularBtnClick}
                                checked={!(params._sort === 'price')}
                              />
                              <label htmlFor="sortPopular">по популярности</label>
                            </div>
                          </div>
                          <div className="catalog-sort__order">
                            <div className="catalog-sort__btn catalog-sort__btn--up">
                              <input
                                type="radio"
                                id="up"
                                name="sort-icon"
                                aria-label="По возрастанию"
                                onChange={handleSortUpBtnClick}
                                checked={params._order === 'asc'}
                              />
                              <label htmlFor="up">
                                <svg width="16" height="14" aria-hidden="true">
                                  <use xlinkHref="#icon-sort"></use>
                                </svg>
                              </label>
                            </div>
                            <div className="catalog-sort__btn catalog-sort__btn--down">
                              <input
                                type="radio"
                                id="down"
                                name="sort-icon"
                                aria-label="По убыванию"
                                onChange={handleSortDownBtnClick}
                                checked={!(params._order === 'asc')}
                              />
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

                    { isDataLoading && <Loader/> }
                    { !isDataLoading && camerasList.length === EMPTY_ARRAY_LENGTH &&
                      <EmptyQuery/> }
                    { !isDataLoading &&
                      <ProductsList
                        productsList={productsToRender}
                        onClick={onBuyButtonClick}
                      /> }

                    { (isPaginationVisible && !isDataLoading) &&
                      <Pagination
                        productsList={camerasList}
                        productsPerPage={PRODUCTS_PER_PAGE}
                        currentPage={currentPage}
                        onPaginationLinkClick={onPaginationLinkClick}
                        onPrevButtonClick={onPrevButtonClick}
                        onNextButtonClick={onNextButtonClick}
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
              onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
              isModalOpened={isAddItemModalOpened}
            />
          }
        </main>

        <Footer/>

      </div>
    </>
  );
}

export default CatalogScreen;
