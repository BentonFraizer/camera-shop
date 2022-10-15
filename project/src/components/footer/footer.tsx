import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <Link className="footer__logo" to={AppRoute.Main} aria-label="Переход на главную">
            <svg width="100" height="36" aria-hidden="true">
              <use xlinkHref="#icon-logo-mono"></use>
            </svg>
          </Link>
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <ul className="social">
            <li className="social__item">
              <a className="link" href="#!" aria-label="Переход на страницу вконтатке">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-vk"></use>
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a className="link" href="#!" aria-label="Переход на страницу pinterest">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-pinterest"></use>
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a className="link" href="#!" aria-label="Переход на страницу reddit">
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
                <Link className="link" to={AppRoute.Main}>Каталог
                </Link>
              </li>
              <li className="footer__item">
                <a className="link" href="#!">Гарантии
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#!">Доставка
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#!">О компании
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="#!">Курсы операторов
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#!">Блог
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#!">Сообщество
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="#!">FAQ
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#!">Задать вопрос
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
