import Icons from '../../components/icons/icons';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import React, { useEffect, useState } from 'react';
import { getCameras, getIsDataLoadedStatus, getPromoCamera, getSortedAndFilteredCameras } from '../../store/site-data/selectors';
import { fetchPromoCameraAction, fetchSortedAndFilteredCamerasAction } from '../../store/api-actions';
import ProductsList from '../../components/products-list/products-list';
import AddItemModal from '../../components/add-item-modal/add-item-modal';
import { isEscKeyPressed, makeURL } from '../../utils/utils';
import { Camera } from '../../types';
import Pagination from '../../components/pagination/pagination';
import Loader from '../../components/loader/loader';
import { getMinPrice, getMaxPrice, getClosestMinPriceValue, getClosestMaxPriceValue } from '../../utils/utils';
import EmptyQuery from '../../components/empty-query/empty-query';
import { FILTERS } from '../../consts';
import { isEnterKeyPressed, getPropertiesForCurrentChecbox } from '../../utils/utils';

const BEGIN_OF_PAGE_COORDINATE = 0;
const EMPTY_ARRAY_LENGTH = 0;
const PRODUCTS_PER_PAGE = 9;
const FIRST_PAGE_NUMBER = 1;
const NON_EXISTENT_ID = 0;
enum PriceLength {
  Min = 0,
  Max = 7,
}

type StartParams = {
  _sort: string;
  _order: string;
  category: string[];
  type: string[];
  level: string[];
  price_gte?: string;
  price_lte?: string;
};

const START_PARAMS: StartParams = {
  _sort: 'price',
  _order: 'asc',
  category: [],
  type: [],
  level: [],
};

function CatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoCamera = useAppSelector(getPromoCamera);
  const navigate = useNavigate();
  const camerasList = useAppSelector(getSortedAndFilteredCameras);
  const immutableCamerasList = useAppSelector(getCameras);
  const isDataLoading = useAppSelector(getIsDataLoadedStatus);
  const [params, setParams] = useState(START_PARAMS);
  const [isAddItemModalOpened, setIsAddItemModalOpened] = useState(false);
  const [idForAddItemModal, setIdForAddItemModal] = useState(NON_EXISTENT_ID);
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE_NUMBER);
  const [priceFromInputValue, setPriceFromInputValue] = useState<string | undefined>('');
  const [priceToInputValue, setPriceToInputValue] = useState<string | undefined>('');
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

  // ---Обработчики взаимодействия с элементами формы фильтрации---

  // Запрет ввода нуля первым значением и любых символов кроме цифр
  const handlePriceFromInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const currentValue = evt.target.value.replace(/^0/, '').replace(/\D/g,'').substring(PriceLength.Min, PriceLength.Max);

    setPriceFromInputValue(currentValue);
  };

  const handlePriceToInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const currentValue = evt.target.value.replace(/^0/, '').replace(/\D/g,'').substring(PriceLength.Min, PriceLength.Max);

    setPriceToInputValue(currentValue);
  };

  const handlePriceFromInputBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    const isPriceFromValueEmpty = priceFromInputValue === '';
    const isPriceToValueEmpty = priceToInputValue === '';
    const targetValue = Number(evt.target.value);
    const closestMinPriceValue = getClosestMinPriceValue(camerasList, Number(targetValue));
    const closestMinPriceValueImmutable = getClosestMinPriceValue(immutableCamerasList, Number(targetValue));
    const closestMaxPriceValueImmutable = getClosestMaxPriceValue(immutableCamerasList, Number(targetValue));
    const maxPriceInImmutableCamerasList = Number(getMaxPrice(immutableCamerasList));
    if (!isPriceFromValueEmpty) {
      // Если полученное значение меньше минимального значения цены из всех товаров
      if (targetValue < Number(closestMinPriceValue)) {
        setPriceFromInputValue(String(closestMinPriceValue));
        setParams({...params, 'price_gte': String(closestMinPriceValue)});
      }

      // Если в поле "от" значение уже было записано и получено новое значение, которое меньше предыдущего
      if (targetValue < Number(params.price_gte)) {
        setPriceFromInputValue(closestMinPriceValueImmutable);
        setParams({...params, 'price_gte': closestMinPriceValueImmutable});
      }

      // Если полученное значение попадает в диапазон от минимальной цены до максимальной
      if (targetValue > Number(getMinPrice(camerasList)) && targetValue < Number(getMaxPrice(camerasList))) {
        setPriceFromInputValue(closestMinPriceValue);
        setParams({...params, 'price_gte': closestMinPriceValue});
      }

      // Если полученное значение больше максимальной цены из всех товаров
      if (targetValue > maxPriceInImmutableCamerasList) {
        setPriceFromInputValue(closestMaxPriceValueImmutable);
        setParams({...params, 'price_gte': String(closestMaxPriceValueImmutable)});
      }

      // Если в поле "до" значение было уже записано, а полученное в поле "от" больше него
      if (!isPriceToValueEmpty && Number(priceToInputValue) < targetValue) {
        setPriceFromInputValue(priceToInputValue);
        setParams({...params, 'price_gte': priceToInputValue});
      }
    }
  };

  const handlePriceToInputBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    const isPriceFromValueEmpty = priceFromInputValue === '';
    const isPriceToValueEmpty = priceToInputValue === '';
    const targetValue = Number(evt.target.value);
    const closestMaxPriceValue = getClosestMaxPriceValue(camerasList, Number(targetValue));
    const closestMaxPriceValueImmutable = getClosestMaxPriceValue(immutableCamerasList, Number(targetValue));
    const maxPriceInCamerasList = Number(getMaxPrice(camerasList));
    const minPriceInCamerasList = Number(getMinPrice(camerasList));
    const maxPriceInImmutableCamerasList = Number(getMaxPrice(immutableCamerasList));
    if (!isPriceToValueEmpty) {
      // Если значение в поле "от" больше, чем в поле "до"
      if (Number(priceFromInputValue) > Number(priceToInputValue)) {
        setPriceToInputValue(priceFromInputValue);
        setParams({...params, 'price_lte': priceFromInputValue});
      } else {
        setPriceToInputValue(closestMaxPriceValue);
        setParams({...params, 'price_lte': closestMaxPriceValue});
      }

      if (Number(getMinPrice(camerasList)) < targetValue && targetValue < maxPriceInCamerasList) {
        setPriceToInputValue(closestMaxPriceValue);
        setParams({...params, 'price_lte': closestMaxPriceValue});
      }

      // Если в поле "до" значение уже было записано и получено нововое значение, которое больше предыдущего
      if (targetValue > Number(params.price_lte)) {
        setPriceToInputValue(closestMaxPriceValueImmutable);
        setParams({...params, 'price_lte': String(closestMaxPriceValueImmutable)});
      }

      // Если поле "от" не заполнено и полученное значение меньше минимальной цены из всех товаров
      // записывается минимальное значение цены из всех товаров
      if (isPriceFromValueEmpty && targetValue < minPriceInCamerasList) {
        setPriceToInputValue(String(minPriceInCamerasList));
      }

      // Если полученное значение больше максимальной цены товаров в каталоге
      if (targetValue > Number(maxPriceInImmutableCamerasList)) {
        setPriceToInputValue(closestMaxPriceValueImmutable);
        setParams({...params, 'price_lte': String(closestMaxPriceValueImmutable)});
      }
    }
  };

  // Обработчики подтверждения ввода чисел посредством нажатия на клавишу "Enter"
  const handlePriceFromInputEnterKeydown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEnterKeyPressed(evt)) {
      const priceToElement = document.querySelector('.catalog-filter__price-range input[name="priceUp"]');
      if (priceToElement !== null){
        (priceToElement as HTMLInputElement).focus();
      }
    }
  };

  const handlePriceToInputEnterKeydown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEnterKeyPressed(evt)) {
      const photocameraElement = document.querySelector('.catalog-filter__item input[name="photocamera"]');
      if (photocameraElement !== null){
        (photocameraElement as HTMLInputElement).focus();
      }
    }
  };

  // Обработчик нажатия на кнопку "Сбросить фильтры"
  const handleResetBtnClick = () => {
    setPriceFromInputValue('');
    setPriceToInputValue('');
    setParams(START_PARAMS);
  };

  // Обработчики нажатий на каждый из чекбоксов фильтрации
  // --------Фильтры Категория---------
  const handlePhotocameraCheckboxClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = ((evt.target as HTMLInputElement).checked);
    const newCategory = [...params.category];

    if (Array.isArray(params.category)){
      if (isChecked) {
        newCategory?.push(FILTERS.Photocamera.name);
      } else {
        const nameIndex = params.category.findIndex((category) => category === FILTERS.Photocamera.name);
        newCategory?.splice(nameIndex, 1);
      }
    }

    setParams(Object.assign({}, params, {category: newCategory}));
    navigate(`/catalog/page_${FIRST_PAGE_NUMBER}`);
    setCurrentPage(FIRST_PAGE_NUMBER);
  };

  const handleVideocameraCheckboxClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = ((evt.target as HTMLInputElement).checked);
    const newCategory = [...params.category];
    const newType = [...params.type];

    if (isChecked) {
      newCategory.push(FILTERS.Videocamera.name);

      const nameFilmIndex = params.type.findIndex((type) => type === FILTERS.Film.name);
      if (nameFilmIndex !== -1) {
        newType.splice(nameFilmIndex, 1);
      }

      const nameSnapshotIndex = newType.findIndex((type) => type === FILTERS.Snapshot.name);
      if (nameSnapshotIndex !== -1) {
        newType.splice(nameSnapshotIndex, 1);
      }

      setParams(Object.assign({}, params, {category: newCategory, type: newType}));
    } else {
      const nameIndex = params.category.findIndex((category) => category === FILTERS.Videocamera.name);
      newCategory?.splice(nameIndex, 1);
      setParams(Object.assign({}, params, {category: newCategory}));
    }

    navigate(`/catalog/page_${FIRST_PAGE_NUMBER}`);
    setCurrentPage(FIRST_PAGE_NUMBER);
  };

  // --------Фильтры Тип и Уровень---------
  const handleTypeorLevelCheckboxesClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const targetName = (evt.target.name).toLocaleLowerCase();
    const currentCheckboxProperties = getPropertiesForCurrentChecbox(targetName, FILTERS);

    if (currentCheckboxProperties.option === 'type') {
      const isChecked = ((evt.target as HTMLInputElement).checked);
      const newType = [...params.type];
      if (isChecked) {
        newType.push(currentCheckboxProperties.name);
      } else {
        const nameIndex = params.type.findIndex((type) => type === currentCheckboxProperties.name);
        newType?.splice(nameIndex, 1);
      }

      setParams(Object.assign({}, params, {type: newType}));
      navigate(`/catalog/page_${FIRST_PAGE_NUMBER}`);
      setCurrentPage(FIRST_PAGE_NUMBER);
    }

    if (currentCheckboxProperties.option === 'level') {
      const isChecked = ((evt.target as HTMLInputElement).checked);
      const newLevel = [...params.level];
      if (isChecked) {
        newLevel.push(currentCheckboxProperties.name);
      } else {
        const nameIndex = params.level.findIndex((level) => level === currentCheckboxProperties.name);
        newLevel?.splice(nameIndex, 1);
      }

      setParams(Object.assign({}, params, {level: newLevel}));
      navigate(`/catalog/page_${FIRST_PAGE_NUMBER}`);
      setCurrentPage(FIRST_PAGE_NUMBER);
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
                                  placeholder={getMinPrice(camerasList)}
                                  onChange={handlePriceFromInputChange}
                                  value={priceFromInputValue}
                                  onBlur={handlePriceFromInputBlur}
                                  onKeyDown={handlePriceFromInputEnterKeydown}
                                  data-testid="price-from"
                                />
                              </label>
                            </div>
                            <div className="custom-input">
                              <label>
                                <input
                                  type="text"
                                  name="priceUp"
                                  placeholder={getMaxPrice(camerasList)}
                                  onChange={handlePriceToInputChange}
                                  value={priceToInputValue}
                                  onBlur={handlePriceToInputBlur}
                                  onKeyDown={handlePriceToInputEnterKeydown}
                                  data-testid="price-to"
                                />
                              </label>
                            </div>
                          </div>
                        </fieldset>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Категория</legend>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input
                                type="checkbox"
                                name="photocamera"
                                onChange={handlePhotocameraCheckboxClick}
                                data-testid="photocamera-checkbox"
                              /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input
                                type="checkbox"
                                name="videocamera"
                                onChange={handleVideocameraCheckboxClick}
                                data-testid="videocamera-checkbox"
                              /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Видеокамера</span>
                            </label>
                          </div>
                        </fieldset>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Тип камеры</legend>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input
                                type="checkbox"
                                name="digital"
                                onChange={handleTypeorLevelCheckboxesClick}
                                checked={params.type.includes(FILTERS.Digital.name)}
                                data-testid="digital-checkbox"
                              /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input
                                type="checkbox"
                                name="film"
                                onChange={handleTypeorLevelCheckboxesClick}
                                disabled={params.category.includes(FILTERS.Videocamera.name)}
                                checked={params.type.includes(FILTERS.Film.name)}
                                data-testid="film-checkbox"
                              /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input
                                type="checkbox"
                                name="snapshot"
                                onChange={handleTypeorLevelCheckboxesClick}
                                disabled={params.category.includes(FILTERS.Videocamera.name)}
                                checked={params.type.includes(FILTERS.Snapshot.name)}
                                data-testid="snapshot-checkbox"
                              /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input
                                type="checkbox"
                                name="collection"
                                onChange={handleTypeorLevelCheckboxesClick}
                                checked={params.type.includes(FILTERS.Collection.name)}
                                data-testid="collection-checkbox"
                              /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
                            </label>
                          </div>
                        </fieldset>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Уровень</legend>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input
                                type="checkbox"
                                name="zero"
                                onChange={handleTypeorLevelCheckboxesClick}
                                checked={params.level.includes(FILTERS.Zero.name)}
                                data-testid="zero-checkbox"
                              /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input
                                type="checkbox"
                                name="non-professional"
                                onChange={handleTypeorLevelCheckboxesClick}
                                checked={params.level.includes(FILTERS.NonProfessional.name)}
                                data-testid="non-professional-checkbox"
                              /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input
                                type="checkbox"
                                name="professional"
                                onChange={handleTypeorLevelCheckboxesClick}
                                checked={params.level.includes(FILTERS.Professional.name)}
                                data-testid="professional-checkbox"
                              /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
                            </label>
                          </div>
                        </fieldset>
                        <button
                          className="btn catalog-filter__reset-btn"
                          type="reset"
                          onClick={handleResetBtnClick}
                        >Сбросить фильтры
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
