import Icons from '../../components/icons/icons';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCameraAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import { getCamera, getSimilarCamerasList } from '../../store/site-data/selectors';
import { RATING_NUMBERS } from '../../consts';
import { separateNumbers } from '../../utils/utils';
import { resetCameraData } from '../../store/site-data/site-data';
import Slider from '../../components/slider/slider';
// import ReviewModal from '../../components/product/review-modal/review-modal';
// import ReviewSuccessModal from '../../components/product/review-success-modal/review-success-modal';

function ProductScreen(): JSX.Element {
  const BEGIN_OF_PAGE_COORDS = 0;
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const camera = useAppSelector(getCamera);
  const similarCamerasList = useAppSelector(getSimilarCamerasList);
  const [showSlider, setShowSlider] = useState(true);
  const EMPTY_LIST_LENGTH = 0;

  useEffect(() => {
    window.scrollTo(BEGIN_OF_PAGE_COORDS, BEGIN_OF_PAGE_COORDS);
    dispatch(fetchCameraAction(Number(id)));
    dispatch(fetchSimilarCamerasAction(Number(id)));

    return () => {
      dispatch(resetCameraData());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (similarCamerasList.length === EMPTY_LIST_LENGTH) {
      setShowSlider(false);
    } else {
      setShowSlider(true);
    }
  }, [similarCamerasList]);

  if (!camera) {
    return <h1>Страница не найдена</h1>; //!Заменить на <NotFoundScreen/> когда он появится
  }
  // Нет возможности реализовать деструктуризацию переменной "camera" раньше проверки переменной на null,
  // поскольку будет выпадать ошибка: "Type 'null' is not assignable to type 'Camera'".
  const { name, vendorCode, type, category, description, level, rating, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount } = camera;

  return (
    <>
      <Icons/>
      <div className="wrapper">

        <Header/>

        <main>
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
                        <button className="tabs__control" type="button">Характеристики</button>
                        <button className="tabs__control is-active" type="button">Описание</button>
                      </div>
                      <div className="tabs__content">
                        <div className="tabs__element">
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
                        <div className="tabs__element is-active">
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

              { showSlider && <Slider similarCameras={similarCamerasList}/>}

            </div>
            <div className="page-content__section">
              <section className="review-block">
                <div className="container">
                  <div className="page-content__headed">
                    <h2 className="title title--h3">Отзывы</h2>
                    <button className="btn" type="button">Оставить свой отзыв</button>
                  </div>
                  <ul className="review-block__list">
                    <li className="review-card">
                      <div className="review-card__head">
                        <p className="title title--h4">Сергей Горский</p>
                        <time className="review-card__data" dateTime="2022-04-13">13 апреля</time>
                      </div>
                      <div className="rate review-card__rate">
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <p className="visually-hidden">Оценка: 5</p>
                      </div>
                      <ul className="review-card__list">
                        <li className="item-list"><span className="item-list__title">Достоинства:</span>
                          <p className="item-list__text">Надёжная, хорошо лежит в руке, необычно выглядит</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Недостатки:</span>
                          <p className="item-list__text">Тяжеловата, сложно найти плёнку</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Комментарий:</span>
                          <p className="item-list__text">Раз в полгода достаю из-под стекла, стираю пыль, заряжаю — работает как часы. Ни у кого из знакомых такой нет, все завидуют) Теперь это жемчужина моей коллекции, однозначно стоит своих денег!</p>
                        </li>
                      </ul>
                    </li>
                    <li className="review-card">
                      <div className="review-card__head">
                        <p className="title title--h4">Пётр Матросов</p>
                        <time className="review-card__data" dateTime="2022-03-02">2 марта</time>
                      </div>
                      <div className="rate review-card__rate">
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                        <p className="visually-hidden">Оценка: 1</p>
                      </div>
                      <ul className="review-card__list">
                        <li className="item-list"><span className="item-list__title">Достоинства:</span>
                          <p className="item-list__text">Хорошее пресс-папье</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Недостатки:</span>
                          <p className="item-list__text">Через 3 дня развалилась на куски</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Комментарий:</span>
                          <p className="item-list__text">При попытке вставить плёнку сломался механизм открытия отсека, пришлось заклеить его изолентой. Начал настраивать фокус&nbsp;— линза провалилась внутрь корпуса. Пока доставал — отломилось несколько лепестков диафрагмы. От злости стукнул камеру об стол, и рукоятка треснула пополам. Склеил всё суперклеем, теперь прижимаю ей бумагу. НЕ РЕКОМЕНДУЮ!!!</p>
                        </li>
                      </ul>
                    </li>
                    <li className="review-card">
                      <div className="review-card__head">
                        <p className="title title--h4">Татьяна Кузнецова </p>
                        <time className="review-card__data" dateTime="2021-12-30">30 декабря</time>
                      </div>
                      <div className="rate review-card__rate">
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                        <p className="visually-hidden">Оценка: 4</p>
                      </div>
                      <ul className="review-card__list">
                        <li className="item-list"><span className="item-list__title">Достоинства:</span>
                          <p className="item-list__text">Редкая</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Недостатки:</span>
                          <p className="item-list__text">Высокая цена</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Комментарий:</span>
                          <p className="item-list__text">Дорого для портативной видеокамеры, но в моей коллекции как раз не хватало такого экземпляра. Следов использования нет, доставили в заводской упаковке, выглядит шикарно!</p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div className="review-block__buttons">
                    <button className="btn btn--purple" type="button">Показать больше отзывов
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <a className="up-btn" href="#header">
            <svg width="12" height="18" aria-hidden="true">
              <use xlinkHref="#icon-arrow2"></use>
            </svg>
          </a>
          {/* <ReviewModal/> */}
          {/* <ReviewSuccessModal/> */}
        </main>

        <Footer/>

      </div>
    </>
  );
}

export default ProductScreen;
