import Icons from '../../components/icons/icons';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCameraAction, fetchReviewsAction, fetchSimilarCamerasAction, fetchCamerasAction } from '../../store/api-actions';
import { getCamera, getCameras, getReviews, getSimilarCamerasList, getIsPostSendingStatus } from '../../store/site-data/selectors';
import { RATING_NUMBERS } from '../../consts';
import { separateNumbers, isEscKeyPressed } from '../../utils/utils';
import { resetCameraData, resetPostSentSuccessful } from '../../store/site-data/site-data';
import Slider from '../../components/slider/slider';
import Reviews from '../../components/reviews/reviews';
import ReviewModal from '../../components/product/review-modal/review-modal';
import ReviewSuccessModal from '../../components/product/review-success-modal/review-success-modal';
import AddItemModal from '../../components/add-item-modal/add-item-modal';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function ProductScreen(): JSX.Element {
  const BEGIN_OF_PAGE_COORDS = 0;
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const camera = useAppSelector(getCamera);
  const similarCamerasList = useAppSelector(getSimilarCamerasList);
  const [showSlider, setShowSlider] = useState(true);
  const EMPTY_LIST_LENGTH = 0;
  const [isSpecsLinkActive, setIsSpecsLinkActive] = useState(true);
  const [isDescriptionLinkActive, setIsDescriptionLinkActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const reviews = useAppSelector(getReviews);
  const [showReviews, setShowReviews] = useState(false);
  const [isSendReviewModalOpened, setIsSendReviewModalOpened] = useState(false);
  const [isReviewSuccessModalOpened, setIsReviewSuccessModalOpened] = useState(false);
  const isPostSentSuccessfully = useAppSelector(getIsPostSendingStatus);
  const [isAddItemModalOpened, setIsAddItemModalOpened] = useState(false);
  const NON_EXISTENT_ID = 0;
  const [idForAddItemModal, setIdForAddItemModal] = useState(NON_EXISTENT_ID);
  let dataForAddItemModal;
  const camerasList = useAppSelector(getCameras);

  // Обработка параметров поиска адресной строки для корретной работы Табов "Характеристики" и "Описание"
  useEffect(() => {
    if (searchParams.get('tab') === null) {
      setSearchParams({tab: 'specifications'});
      setIsSpecsLinkActive(true);
      setIsDescriptionLinkActive(false);
    }
    if (searchParams.get('tab') === 'specifications') {
      setIsSpecsLinkActive(true);
      setIsDescriptionLinkActive(false);
    }
    if (searchParams.get('tab') === 'description') {
      setIsSpecsLinkActive(false);
      setIsDescriptionLinkActive(true);
    }

  },[searchParams, setSearchParams]);

  useEffect(() => {
    window.scrollTo(BEGIN_OF_PAGE_COORDS, BEGIN_OF_PAGE_COORDS);
    dispatch(fetchCameraAction(Number(id)));
    dispatch(fetchSimilarCamerasAction(Number(id)));
    dispatch(fetchReviewsAction(Number(id)));
    dispatch(fetchCamerasAction());

    return () => {
      dispatch(resetCameraData());
    };
  }, [dispatch, id]);

  // Скрытие/отображение секции "Похожие товары"
  useEffect(() => {
    if (similarCamerasList.length === EMPTY_LIST_LENGTH) {
      setShowSlider(false);
    } else {
      setShowSlider(true);
    }
  }, [similarCamerasList]);

  // Скрытие/отображение секции "Отзывы"
  useEffect(() => {
    if (reviews.length === EMPTY_LIST_LENGTH) {
      setShowReviews(false);
    } else {
      setShowReviews(true);
    }
  }, [reviews]);

  // Действия, которые выполнятся сразу после отправки формы "Оставить отзыв". Т.е. после нажатия кнопки "Отправить отзыв"
  useEffect(() => {
    if (isSendReviewModalOpened && isPostSentSuccessfully) {
      setIsSendReviewModalOpened(false);
      dispatch(resetPostSentSuccessful());
      dispatch(fetchReviewsAction(Number(id)));
      setIsReviewSuccessModalOpened(true);
    }
  }, [isSendReviewModalOpened, isPostSentSuccessfully, dispatch, id]);

  if (!camera) {
    return <NotFoundScreen/>;
  }

  // Получение данных по конкретному продукту для заполнения полей модального окна "Добавить товар в корзину"
  if (idForAddItemModal !== NON_EXISTENT_ID) {
    dataForAddItemModal = camerasList.find((currentCamera) => currentCamera.id === idForAddItemModal);
  }

  // Нет возможности реализовать деструктуризацию переменной "camera" раньше проверки переменной на null,
  // поскольку будет выпадать ошибка: "Type 'null' is not assignable to type 'Camera'".
  const { name, vendorCode, type, category, description, level, rating, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount } = camera;

  // Обработчики клика по Табам "Характеристики" и "Описание"
  const handleSpecificationsLinkClick = () => {
    setIsSpecsLinkActive(true);
    setIsDescriptionLinkActive(false);
  };

  const handleDescriptionLinkClick = () => {
    setIsSpecsLinkActive(false);
    setIsDescriptionLinkActive(true);
  };

  // Обработчик нажатия на кнопку "Наверх". Плавное поднятие на верх страницы
  const handleUpButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Обработчик натия на кнопку "Оставить свой отзыв" для открытия модального окна "Оставить отзыв"
  const onSendReviewButonClick = () => {
    setIsSendReviewModalOpened(true);
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = '17px';
  };

  // Обработчик натия на кнопку "Купить" на элементе слайдера для открытия модального окна "Добавить товар в корзину"
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
    setIsSendReviewModalOpened(false);
    setIsReviewSuccessModalOpened(false);
    setIsAddItemModalOpened(false);
    document.body.style.overflowY = '';
    document.body.style.paddingRight = '0';
  };

  const handleEscBtnKeydown = (evt: React.KeyboardEvent<Element>) => {
    if (isSendReviewModalOpened && isEscKeyPressed(evt)) {
      setIsSendReviewModalOpened(false);
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '0';
    }
    if (isReviewSuccessModalOpened && isEscKeyPressed(evt)) {
      setIsReviewSuccessModalOpened(false);
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '0';
    }
    if (isAddItemModalOpened && isEscKeyPressed(evt)) {
      setIsAddItemModalOpened(false);
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '0';
    }
  };

  return (
    <>
      <Icons/>
      <div className="wrapper">

        <Header/>

        <main onKeyDown={handleEscBtnKeydown} >
          <div className="page-content" >
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
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{category} {name}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`}/>
                      <img src={`../${previewImg}`} srcSet={`../${previewImg2x} 2x`} width="560" height="480" alt="Ретрокамера Das Auge IV"/>
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{category} {name}</h1>
                    <div className="rate product__rate">
                      {
                        RATING_NUMBERS.map((ratingNumber) => (
                          <svg width="17" height="16" aria-hidden="true" key={ratingNumber}>
                            <use xlinkHref={rating >= ratingNumber ? '#icon-full-star' : '#icon-star'}></use>
                          </svg>
                        ))
                      }
                      <p className="visually-hidden">Рейтинг: {rating}</p>
                      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                    </div>
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{separateNumbers(price)} ₽</p>
                    <button className="btn btn--purple" type="button">
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Добавить в корзину
                    </button>
                    <div className="tabs product__tabs">
                      <div className="tabs__controls product__tabs-controls">
                        <Link
                          className={isSpecsLinkActive ? 'tabs__control is-active' : 'tabs__control'}
                          to={'?tab=specifications'}
                          onClick={() => handleSpecificationsLinkClick()}
                        >Характеристики
                        </Link>
                        <Link
                          className={isDescriptionLinkActive ? 'tabs__control is-active' : 'tabs__control'}
                          to={'?tab=description'}
                          onClick={() => handleDescriptionLinkClick()}
                          data-testid="link-description"
                        >Описание
                        </Link>
                      </div>
                      <div className="tabs__content">
                        <div className={isSpecsLinkActive ? 'tabs__element is-active' : 'tabs__element'}>
                          <ul className="product__tabs-list">
                            <li className="item-list"><span className="item-list__title">Артикул:</span>
                              <p className="item-list__text">{vendorCode}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Категория:</span>
                              <p className="item-list__text">{category}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                              <p className="item-list__text">{type}</p>
                            </li>
                            <li className="item-list"><span className="item-list__title">Уровень:</span>
                              <p className="item-list__text">{level}</p>
                            </li>
                          </ul>
                        </div>
                        <div className={isDescriptionLinkActive ? 'tabs__element is-active' : 'tabs__element'}>
                          <div className="product__tabs-text">
                            {description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">

              { showSlider &&
                <Slider
                  similarCameras={similarCamerasList}
                  onBuyButtonClick={onBuyButtonClick}
                />}

            </div>
            <div className="page-content__section">

              { showReviews && <Reviews reviews={reviews} openSendReviewModal={onSendReviewButonClick}/>}

            </div>
          </div>
          <button className="up-btn" onClick={() => handleUpButtonClick()}>
            <svg width="12" height="18" aria-hidden="true">
              <use xlinkHref="#icon-arrow2"></use>
            </svg>
          </button>

          { isSendReviewModalOpened &&
            <ReviewModal
              onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
              cameraId={id}
              isReviewModalOpened={isSendReviewModalOpened}
            /> }
          { isReviewSuccessModalOpened &&
            <ReviewSuccessModal
              onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
              isReviewSuccessModalOpened={isReviewSuccessModalOpened}
            /> }
          { isAddItemModalOpened &&
            <AddItemModal
              dataForAddItemModal={dataForAddItemModal}
              onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
              isModalOpened={isAddItemModalOpened}
            /> }

        </main>

        <Footer/>

      </div>
    </>
  );
}

export default ProductScreen;
