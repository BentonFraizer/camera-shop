import Icons from '../../components/icons/icons';
// import RemoveItemModal from '../../components/basket/remove-item-modal/remove-item-modal';
// import PaymentSuccessModal from '../../components/basket/payment-success-modal/payment-success-modal';

function BasketScreen(): JSX.Element {
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
                </svg><span className="visually-hidden">Сбросить поиск</span>
              </button>
            </div>
            <a className="header__basket-link" href="!">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-basket"></use>
              </svg><span className="header__basket-count">3</span>
            </a>
          </div>
        </header>
        <main>
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
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link" href="catalog.html">Каталог
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </a>
                  </li>
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                  </li>
                </ul>
              </div>
            </div>
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                <ul className="basket__list">
                  <li className="basket-item">
                    <div className="basket-item__img">
                      <picture>
                        <source type="image/webp" srcSet="img/content/img9.webp, img/content/img9@2x.webp 2x"/>
                        <img src="img/content/img9.jpg" srcSet="img/content/img9@2x.jpg 2x" width="140" height="120" alt="Фотоаппарат «Орлёнок»"/>
                      </picture>
                    </div>
                    <div className="basket-item__description">
                      <p className="basket-item__title">Фотоаппарат «Орлёнок»</p>
                      <ul className="basket-item__list">
                        <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">O78DFGSD832</span>
                        </li>
                        <li className="basket-item__list-item">Плёночная фотокамера</li>
                        <li className="basket-item__list-item">Любительский уровень</li>
                      </ul>
                    </div>
                    <p className="basket-item__price"><span className="visually-hidden">Цена:</span>18 970 ₽</p>
                    <div className="quantity">
                      <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара">
                        <svg width="7" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-arrow"></use>
                        </svg>
                      </button>
                      <label className="visually-hidden" htmlFor="counter1"></label>
                      <input type="number" id="counter1" value="2" min="1" max="99" aria-label="количество товара"/>
                      <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара">
                        <svg width="7" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-arrow"></use>
                        </svg>
                      </button>
                    </div>
                    <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>37 940 ₽</div>
                    <button className="cross-btn" type="button" aria-label="Удалить товар">
                      <svg width="10" height="10" aria-hidden="true">
                        <use xlinkHref="#icon-close"></use>
                      </svg>
                    </button>
                  </li>
                  <li className="basket-item">
                    <div className="basket-item__img">
                      <picture>
                        <source type="image/webp" srcSet="img/content/img1.webp, img/content/img1@2x.webp 2x"/>
                        <img src="img/content/img1.jpg" srcSet="img/content/img1@2x.jpg 2x" width="140" height="120" alt="Ретрокамера «Das Auge IV»"/>
                      </picture>
                    </div>
                    <div className="basket-item__description">
                      <p className="basket-item__title">Ретрокамера «Das Auge IV»</p>
                      <ul className="basket-item__list">
                        <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">DA4IU67AD5</span>
                        </li>
                        <li className="basket-item__list-item">Коллекционная видеокамера</li>
                        <li className="basket-item__list-item">Любительский уровень</li>
                      </ul>
                    </div>
                    <p className="basket-item__price"><span className="visually-hidden">Цена:</span>73 450 ₽</p>
                    <div className="quantity">
                      <button className="btn-icon btn-icon--prev" disabled aria-label="уменьшить количество товара">
                        <svg width="7" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-arrow"></use>
                        </svg>
                      </button>
                      <label className="visually-hidden" htmlFor="counter2"></label>
                      <input type="number" id="counter2" value="1" min="1" max="99" aria-label="количество товара"/>
                      <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара">
                        <svg width="7" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-arrow"></use>
                        </svg>
                      </button>
                    </div>
                    <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>73 450 ₽</div>
                    <button className="cross-btn" type="button" aria-label="Удалить товар">
                      <svg width="10" height="10" aria-hidden="true">
                        <use xlinkHref="#icon-close"></use>
                      </svg>
                    </button>
                  </li>
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
          {/* <RemoveItemModal/> */}
          {/* <PaymentSuccessModal/> */}
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

export default BasketScreen;
