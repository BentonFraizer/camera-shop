import Icons from '../../components/icons/icons';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import React, { useEffect, useState, useRef } from 'react';
import { getIsDataLoadedStatus, getPromoCamera, getSortedCameras } from '../../store/site-data/selectors';
import { fetchPromoCameraAction, fetchSortedCamerasAction } from '../../store/api-actions';
import ProductsList from '../../components/products-list/products-list';
import AddItemModal from '../../components/add-item-modal/add-item-modal';
import { isEscKeyPressed, makeURL } from '../../utils/utils';
import { Camera } from '../../types';
import Pagination from '../../components/pagination/pagination';
import Loader from '../../components/loader/loader';
import { getMinPrice, getMaxPrice } from '../../utils/utils';

const BEGIN_OF_PAGE_COORDINATE = 0;
const EMPTY_ARRAY_LENGTH = 0;
const PRODUCTS_PER_PAGE = 9;
const FIRST_PAGE_NUMBER = 1;
const NON_EXISTENT_ID = 0;
const SORTING_PARAMS_AMOUNT = 2;
enum PriceLength {
  Min = 0,
  Max = 7,
}

type StartParams = {
  [k: string]: string;
};

const START_PARAMS: StartParams = {
  _sort: 'price',
  _order: 'asc',
};

function CatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoCamera = useAppSelector(getPromoCamera);
  const navigate = useNavigate();
  const camerasList = useAppSelector(getSortedCameras);
  const isDataLoading = useAppSelector(getIsDataLoadedStatus);
  const [params, setParams] = useState(START_PARAMS);
  const [isAddItemModalOpened, setIsAddItemModalOpened] = useState(false);
  const [idForAddItemModal, setIdForAddItemModal] = useState(NON_EXISTENT_ID);
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE_NUMBER);
  const [isSortByPrice, setSortByPrice] = useState(true);
  const [isSortedUp, setIsSortedUp] = useState(true);
  const [priceFromFieldValue, setPriceFromFieldValue] = useState<string>('');
  const [priceToFieldValue, setPriceToFieldValue] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams(params);
  // Получение данных по конкретному продукту для заполнения полей модального окна "Добавить товар в корзину"
  const isIdExists = idForAddItemModal !== NON_EXISTENT_ID;
  const dataForAddItemModal = isIdExists ? camerasList.find((camera) => camera.id === idForAddItemModal) : undefined;

  const sortPriceRef = useRef<HTMLInputElement | null>(null);
  const sortPopularRef = useRef<HTMLInputElement | null>(null);
  const sortUpRef = useRef<HTMLInputElement | null>(null);
  const sortDownRef = useRef<HTMLInputElement | null>(null);
  const priceFromRef = useRef<HTMLInputElement | null>(null);
  const priceToRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if ([...searchParams].length > SORTING_PARAMS_AMOUNT) {
      setParams(Object.fromEntries([...searchParams]));
    }
    // Условия на случай если в адресную строку вручную внесены параметры поиска отличные от START_PARAMS
    if ([...searchParams].length === SORTING_PARAMS_AMOUNT) {
      if (searchParams.toString().indexOf('price') > 0 && searchParams.toString().indexOf('desc') > 0) {
        setParams({_sort:'price', _order:'desc'});
        setIsSortedUp(false);
      }

      if (searchParams.toString().indexOf('rating') > 0 && searchParams.toString().indexOf('asc') > 0) {
        setParams({_sort:'rating', _order:'asc'});
        setSortByPrice(false);
      }

      if (searchParams.toString().indexOf('rating') > 0 && searchParams.toString().indexOf('desc') > 0) {
        setParams({_sort:'rating', _order:'desc'});
        setSortByPrice(false);
        setIsSortedUp(false);
      }
    }
  }, [searchParams]);

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
    dispatch(fetchSortedCamerasAction(makeURL(params)));
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

  // Обработка нажатий элементов сортировки
  const handleSortPriceBtnClick = () => {
    if (sortPriceRef.current?.checked) {
      setParams({...params, _sort: 'price'});
      setSortByPrice(true);
    }
  };

  const handleSortPopularBtnClick = () => {
    if (sortPopularRef.current?.checked) {
      setParams({...params, _sort: 'rating'});
      setSortByPrice(false);
    }
  };

  const handleSortUpBtnClick = () => {
    if (sortUpRef.current?.checked) {
      setParams({...params, _order: 'asc'});
      setIsSortedUp(true);
    }
  };

  const handleSortDownBtnClick = () => {
    if (sortDownRef.current?.checked) {
      setParams({...params, _order: 'desc'});
      setIsSortedUp(false);
    }
  };

  // Обработка взаимодействия с элементами формы фильтрации
  const handlePriceFromFieldChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const currentValue = evt.target.value.replace(/^0/, '').replace(/\D/g,'').substring(PriceLength.Min, PriceLength.Max);

    setPriceFromFieldValue(currentValue);
  };

  const handlePriceToFieldChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const currentValue = evt.target.value.replace(/^0/, '').replace(/\D/g,'').substring(PriceLength.Min, PriceLength.Max);

    setPriceToFieldValue(currentValue);
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
                    <div className="catalog-filter">
                      <form action="#">
                        <h2 className="visually-hidden">Фильтр</h2>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Цена, ₽</legend>
                          <div className="catalog-filter__price-range">
                            <div className="custom-input">
                              <label>
                                <input
                                  type="text"
                                  name="price"
                                  placeholder={getMinPrice(camerasList) || 'от'}
                                  onChange={handlePriceFromFieldChange}
                                  ref={priceFromRef}
                                  value={priceFromFieldValue}
                                />
                              </label>
                            </div>
                            <div className="custom-input">
                              <label>
                                <input
                                  type="text"
                                  name="priceUp"
                                  placeholder={getMaxPrice(camerasList) || 'до'}
                                  onChange={handlePriceToFieldChange}
                                  ref={priceToRef}
                                  value={priceToFieldValue}
                                />
                              </label>
                            </div>
                          </div>
                        </fieldset>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Категория</legend>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="photocamera" /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
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
                              <input type="checkbox" name="digital" /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="film"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="snapshot"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="collection"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
                            </label>
                          </div>
                        </fieldset>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Уровень</legend>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="zero" /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
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
                              <input
                                type="radio"
                                id="sortPrice"
                                name="sort"
                                ref={sortPriceRef}
                                onChange={handleSortPriceBtnClick}
                                checked={isSortByPrice}
                              />
                              <label htmlFor="sortPrice">по цене</label>
                            </div>
                            <div className="catalog-sort__btn-text">
                              <input
                                type="radio"
                                id="sortPopular"
                                name="sort"
                                ref={sortPopularRef}
                                onChange={handleSortPopularBtnClick}
                                checked={!isSortByPrice}
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
                                ref={sortUpRef}
                                onChange={handleSortUpBtnClick}
                                checked={isSortedUp}
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
                                ref={sortDownRef}
                                onChange={handleSortDownBtnClick}
                                checked={!isSortedUp}
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
