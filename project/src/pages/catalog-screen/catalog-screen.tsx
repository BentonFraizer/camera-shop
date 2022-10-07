import Icons from '../../components/icons/icons';
// import AddItemModal from '../../components/catalog/add-item-modal/add-item-modal';
// import AddItemSuccessModal from '../../components/catalog/add-item-success-modal/add-item-success-modal';

function CatalogScreen(): JSX.Element {
  const TABINDEX_VALUE = 0;

  return (
    <>
      <Icons/>
      <div className="wrapper">
        <header className="header" id="header">
          <div className="container">
            <a className="header__logo" href="index.html" aria-label="Переход на главную">
              <svg width="100" height="36" aria-hidden="true">
                <use xlinkHref="#icon-logo"></use>
              </svg>
            </a>
            <nav className="main-nav header__main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item"><a className="main-nav__link" href="catalog.html">Каталог</a>
                </li>
                <li className="main-nav__item"><a className="main-nav__link" href="!">Гарантии</a>
                </li>
                <li className="main-nav__item"><a className="main-nav__link" href="!">Доставка</a>
                </li>
                <li className="main-nav__item"><a className="main-nav__link" href="!">О компании</a>
                </li>
              </ul>
            </nav>
            <div className="form-search">
              <form>
                <label>
                  <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-lens"></use>
                  </svg>
                  <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту"/>
                </label>
                <ul className="form-search__select-list">
                  <li className="form-search__select-item" tabIndex={TABINDEX_VALUE}>Cannonball Pro MX 8i</li>
                  <li className="form-search__select-item" tabIndex={TABINDEX_VALUE}>Cannonball Pro MX 7i</li>
                  <li className="form-search__select-item" tabIndex={TABINDEX_VALUE}>Cannonball Pro MX 6i</li>
                  <li className="form-search__select-item" tabIndex={TABINDEX_VALUE}>Cannonball Pro MX 5i</li>
                  <li className="form-search__select-item" tabIndex={TABINDEX_VALUE}>Cannonball Pro MX 4i</li>
                </ul>
              </form>
              <button className="form-search__reset" type="reset">
                <svg width="10" height="10" aria-hidden="true">
                  <use xlinkHref="#icon-close"></use>
                </svg>
                <span className="visually-hidden">Сбросить поиск</span>
              </button>
            </div>
            <a className="header__basket-link" href="!">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-basket"></use>
              </svg>
            </a>
          </div>
        </header>
        <main>
          <div className="banner">
            <picture>
              <source type="image/webp" srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"/>
              <img src="img/content/banner-bg.jpg" srcSet="img/content/banner-bg@2x.jpg 2x" width="1280" height="280" alt="баннер"/>
            </picture>
            <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span><a className="btn" href="!">Подробнее</a></p>
          </div>
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link" href="index.html">Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </a>
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
                              <input type="checkbox" name="photocamera" checked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
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
                              <input type="checkbox" name="digital" checked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
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
                              <input type="checkbox" name="collection" checked disabled/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
                            </label>
                          </div>
                        </fieldset>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Уровень</legend>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="zero" checked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
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
                              <input type="radio" id="sortPrice" name="sort" checked/>
                              <label htmlFor="sortPrice">по цене</label>
                            </div>
                            <div className="catalog-sort__btn-text">
                              <input type="radio" id="sortPopular" name="sort"/>
                              <label htmlFor="sortPopular">по популярности</label>
                            </div>
                          </div>
                          <div className="catalog-sort__order">
                            <div className="catalog-sort__btn catalog-sort__btn--up">
                              <input type="radio" id="up" name="sort-icon" checked aria-label="По возрастанию"/>
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
                    <div className="cards catalog__cards">
                      <div className="product-card">
                        <div className="product-card__img">
                          <picture>
                            <source type="image/webp" srcSet="img/content/img1.webp, img/content/img1@2x.webp 2x"/>
                            <img src="img/content/img1.jpg" srcSet="img/content/img1@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»"/>
                          </picture>
                        </div>
                        <div className="product-card__info">
                          <div className="rate product-card__rate">
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
                            <svg width="17" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg>
                            <p className="visually-hidden">Рейтинг: 3</p>
                            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>23</p>
                          </div>
                          <p className="product-card__title">Ретрокамера «Das Auge IV»</p>
                          <p className="product-card__price"><span className="visually-hidden">Цена:</span>73 450 ₽
                          </p>
                        </div>
                        <div className="product-card__buttons">
                          <button className="btn btn--purple product-card__btn" type="button">Купить
                          </button>
                          <a className="btn btn--transparent" href="!">Подробнее
                          </a>
                        </div>
                      </div>
                      <div className="product-card">
                        <div className="product-card__img">
                          <picture>
                            <source type="image/webp" srcSet="img/content/img9.webp, img/content/img9@2x.webp 2x"/>
                            <img src="img/content/img9.jpg" srcSet="img/content/img9@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат FastShot MR-5"/>
                          </picture>
                        </div>
                        <div className="product-card__info">
                          <div className="rate product-card__rate">
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
                            <p className="visually-hidden">Рейтинг: 4</p>
                            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
                          </div>
                          <p className="product-card__title">Фотоаппарат FastShot MR-5</p>
                          <p className="product-card__price"><span className="visually-hidden">Цена:</span>18 970 ₽
                          </p>
                        </div>
                        <div className="product-card__buttons">
                          <a className="btn btn--purple-border product-card__btn product-card__btn--in-cart" href="!">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-basket"></use>
                            </svg>В корзине
                          </a>
                          <a className="btn btn--transparent" href="!">Подробнее
                          </a>
                        </div>
                      </div>
                      <div className="product-card">
                        <div className="product-card__img">
                          <picture>
                            <source type="image/webp" srcSet="img/content/img5.webp, img/content/img5@2x.webp 2x"/>
                            <img src="img/content/img5.jpg" srcSet="img/content/img5@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2"/>
                          </picture>
                        </div>
                        <div className="product-card__info">
                          <div className="rate product-card__rate">
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
                            <p className="visually-hidden">Рейтинг: 5</p>
                            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>849</p>
                          </div>
                          <p className="product-card__title">Фотоаппарат Instaprinter P2</p>
                          <p className="product-card__price"><span className="visually-hidden">Цена:</span>8 430 ₽
                          </p>
                        </div>
                        <div className="product-card__buttons">
                          <button className="btn btn--purple product-card__btn" type="button">Купить
                          </button>
                          <a className="btn btn--transparent" href="!">Подробнее
                          </a>
                        </div>
                      </div>
                      <div className="product-card">
                        <div className="product-card__img">
                          <picture>
                            <source type="image/webp" srcSet="img/content/img9.webp, img/content/img9@2x.webp 2x"/>
                            <img src="img/content/img9.jpg" srcSet="img/content/img9@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат FastShot MR-5"/>
                          </picture>
                        </div>
                        <div className="product-card__info">
                          <div className="rate product-card__rate">
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
                            <p className="visually-hidden">Рейтинг: 4</p>
                            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
                          </div>
                          <p className="product-card__title">Фотоаппарат FastShot MR-5</p>
                          <p className="product-card__price"><span className="visually-hidden">Цена:</span>18 970 ₽
                          </p>
                        </div>
                        <div className="product-card__buttons">
                          <button className="btn btn--purple product-card__btn" type="button">Купить
                          </button>
                          <a className="btn btn--transparent" href="!">Подробнее
                          </a>
                        </div>
                      </div>
                      <div className="product-card">
                        <div className="product-card__img">
                          <picture>
                            <source type="image/webp" srcSet="img/content/img5.webp, img/content/img5@2x.webp 2x"/>
                            <img src="img/content/img5.jpg" srcSet="img/content/img5@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2"/>
                          </picture>
                        </div>
                        <div className="product-card__info">
                          <div className="rate product-card__rate">
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
                            <p className="visually-hidden">Рейтинг: 5</p>
                            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>849</p>
                          </div>
                          <p className="product-card__title">Фотоаппарат Instaprinter P2</p>
                          <p className="product-card__price"><span className="visually-hidden">Цена:</span>8 430 ₽
                          </p>
                        </div>
                        <div className="product-card__buttons">
                          <button className="btn btn--purple product-card__btn" type="button">Купить
                          </button>
                          <a className="btn btn--transparent" href="!">Подробнее
                          </a>
                        </div>
                      </div>
                      <div className="product-card">
                        <div className="product-card__img">
                          <picture>
                            <source type="image/webp" srcSet="img/content/img1.webp, img/content/img1@2x.webp 2x"/>
                            <img src="img/content/img1.jpg" srcSet="img/content/img1@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»"/>
                          </picture>
                        </div>
                        <div className="product-card__info">
                          <div className="rate product-card__rate">
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
                            <svg width="17" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg>
                            <p className="visually-hidden">Рейтинг: 3</p>
                            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>23</p>
                          </div>
                          <p className="product-card__title">Ретрокамера «Das Auge IV»</p>
                          <p className="product-card__price"><span className="visually-hidden">Цена:</span>73 450 ₽
                          </p>
                        </div>
                        <div className="product-card__buttons">
                          <button className="btn btn--purple product-card__btn" type="button">Купить
                          </button>
                          <a className="btn btn--transparent" href="!">Подробнее
                          </a>
                        </div>
                      </div>
                      <div className="product-card">
                        <div className="product-card__img">
                          <picture>
                            <source type="image/webp" srcSet="img/content/img5.webp, img/content/img5@2x.webp 2x"/>
                            <img src="img/content/img5.jpg" srcSet="img/content/img5@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2"/>
                          </picture>
                        </div>
                        <div className="product-card__info">
                          <div className="rate product-card__rate">
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
                            <p className="visually-hidden">Рейтинг: 5</p>
                            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>849</p>
                          </div>
                          <p className="product-card__title">Фотоаппарат Instaprinter P2</p>
                          <p className="product-card__price"><span className="visually-hidden">Цена:</span>8 430 ₽
                          </p>
                        </div>
                        <div className="product-card__buttons">
                          <button className="btn btn--purple product-card__btn" type="button">Купить
                          </button>
                          <a className="btn btn--transparent" href="!">Подробнее
                          </a>
                        </div>
                      </div>
                      <div className="product-card">
                        <div className="product-card__img">
                          <picture>
                            <source type="image/webp" srcSet="img/content/img1.webp, img/content/img1@2x.webp 2x"/>
                            <img src="img/content/img1.jpg" srcSet="img/content/img1@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»"/>
                          </picture>
                        </div>
                        <div className="product-card__info">
                          <div className="rate product-card__rate">
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
                            <svg width="17" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg>
                            <p className="visually-hidden">Рейтинг: 3</p>
                            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>23</p>
                          </div>
                          <p className="product-card__title">Ретрокамера «Das Auge IV»</p>
                          <p className="product-card__price"><span className="visually-hidden">Цена:</span>73 450 ₽
                          </p>
                        </div>
                        <div className="product-card__buttons">
                          <button className="btn btn--purple product-card__btn" type="button">Купить
                          </button>
                          <a className="btn btn--transparent" href="!">Подробнее
                          </a>
                        </div>
                      </div>
                      <div className="product-card">
                        <div className="product-card__img">
                          <picture>
                            <source type="image/webp" srcSet="img/content/img9.webp, img/content/img9@2x.webp 2x"/>
                            <img src="img/content/img9.jpg" srcSet="img/content/img9@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат FastShot MR-5"/>
                          </picture>
                        </div>
                        <div className="product-card__info">
                          <div className="rate product-card__rate">
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
                            <p className="visually-hidden">Рейтинг: 4</p>
                            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
                          </div>
                          <p className="product-card__title">Фотоаппарат FastShot MR-5</p>
                          <p className="product-card__price"><span className="visually-hidden">Цена:</span>18 970 ₽
                          </p>
                        </div>
                        <div className="product-card__buttons">
                          <button className="btn btn--purple product-card__btn" type="button">Купить
                          </button>
                          <a className="btn btn--transparent" href="!">Подробнее
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="pagination">
                      <ul className="pagination__list">
                        <li className="pagination__item"><a className="pagination__link pagination__link--active" href="1">1</a>
                        </li>
                        <li className="pagination__item"><a className="pagination__link" href="2">2</a>
                        </li>
                        <li className="pagination__item"><a className="pagination__link" href="3">3</a>
                        </li>
                        <li className="pagination__item"><a className="pagination__link pagination__link--text" href="2">Далее</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* <AddItemModal/> */}
          {/* <AddItemSuccessModal/> */}
        </main>
        <footer className="footer">
          <div className="container">
            <div className="footer__info">
              <a className="footer__logo" href="index.html" aria-label="Переход на главную">
                <svg width="100" height="36" aria-hidden="true">
                  <use xlinkHref="#icon-logo-mono"></use>
                </svg>
              </a>
              <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
              <ul className="social">
                <li className="social__item">
                  <a className="link" href="!" aria-label="Переход на страницу вконтатке">
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-vk"></use>
                    </svg>
                  </a>
                </li>
                <li className="social__item">
                  <a className="link" href="!" aria-label="Переход на страницу pinterest">
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-pinterest"></use>
                    </svg>
                  </a>
                </li>
                <li className="social__item">
                  <a className="link" href="!" aria-label="Переход на страницу reddit">
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-reddit"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <ul className="footer__nav">
              <li className="footer__nav-item">
                <p className="footer__title">Навигация</p>
                <ul className="footer__list">
                  <li className="footer__item">
                    <a className="link" href="!">Каталог
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="link" href="!">Гарантии
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="link" href="!">Доставка
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="link" href="!">О компании
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer__nav-item">
                <p className="footer__title">Ресурсы</p>
                <ul className="footer__list">
                  <li className="footer__item">
                    <a className="link" href="!">Курсы операторов
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="link" href="!">Блог
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="link" href="!">Сообщество
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer__nav-item">
                <p className="footer__title">Поддержка</p>
                <ul className="footer__list">
                  <li className="footer__item">
                    <a className="link" href="!">FAQ
                    </a>
                  </li>
                  <li className="footer__item">
                    <a className="link" href="!">Задать вопрос
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}

export default CatalogScreen;
