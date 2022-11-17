import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { fetchSearchedCamerasAction } from '../../store/api-actions';
import { getSearchedCameras } from '../../store/site-data/selectors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import React, { useEffect, useState, useRef } from 'react';
import { isEnterKeyPressed } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { isSpaceKeyPressed } from '../../utils/utils';

const TABINDEX_VALUE = 0;
const FOCUS_OFF_TABINDEX_VALUE = -1;
const DOES_NOT_EXIST_NAME = 'kodak';
const EMPTY_ARRAY_LENGTH = 0;
type StartParams = {
  name_like: string;
}
const START_PARAMS: StartParams = {
  'name_like': DOES_NOT_EXIST_NAME,
};

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const searchedCamerasList = useAppSelector(getSearchedCameras);
  const navigate = useNavigate();
  const [params, setParams] = useState(START_PARAMS);
  const [isSelectListOpened, setIsSelectListOpened] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState<string | undefined>('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setIsSelectListOpened(searchedCamerasList.length !== EMPTY_ARRAY_LENGTH);
  }, [searchedCamerasList]);

  useEffect(() => {
    dispatch(fetchSearchedCamerasAction(params));
  }, [dispatch, params]);

  // Обработчик для запрета ввода пробела при пустом поле поиска (т.е. запрет ввода пробела первым символом)
  const handleSearchFormInputSpaceKeydown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSpaceKeyPressed(evt) && searchInputRef.current?.value === '') {
      evt.preventDefault();
    }
  };

  // Обработчик вводимых символов. Если символ (или их комбинация) есть в массиве товаров, будет показан выпадающий список
  // Если поле пустое, в "params" записывается наименование товара, которого нет в массиве, что не приведёт к показу
  // выпадающего списка
  const handleSearchFromInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const targetValue = evt.target.value;
    setSearchInputValue(targetValue);
    targetValue === '' ? setParams(START_PARAMS) : setParams({'name_like': targetValue});
  };

  // Обработчик перехода на страницу товара по нажатию клавиши "Enter".
  // Работает когда есть "focus()" на элементе списка
  const handleSelectLiKeydown = (evt: React.KeyboardEvent<HTMLLIElement>, cameraID: number) => {
    if (isEnterKeyPressed(evt)) {
      navigate(`/product/${cameraID}?tab=specifications`);
    }
  };

  //Обработчик нажатия на кнопку очистки поля ввода (т.е. нажатия на крестик)
  const handleResetBtnClick = () => {
    setParams(START_PARAMS);
    setSearchInputValue('');
  };

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to='/' aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to='/' data-testid="header-catalog">Каталог</Link>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#!">Гарантии</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#!">Доставка</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#!">О компании</a>
            </li>
          </ul>
        </nav>
        <div className={isSelectListOpened ? 'form-search list-opened' : 'form-search'}>
          <form>
            <label>
              <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input
                className="form-search__input"
                type="text"
                autoComplete="off"
                placeholder="Поиск по сайту"
                onChange={handleSearchFromInputChange}
                onKeyDown={handleSearchFormInputSpaceKeydown}
                ref={searchInputRef}
                value={searchInputValue}
                data-testid="search-input"
              />
            </label>
            <ul className="form-search__select-list">
              {
                searchedCamerasList.map((camera) =>
                  (
                    <Link key={camera.id} to={`/product/${camera.id}?tab=specifications`} tabIndex={FOCUS_OFF_TABINDEX_VALUE}>
                      <li
                        className="form-search__select-item"
                        tabIndex={TABINDEX_VALUE}
                        onKeyDown={(evt: React.KeyboardEvent<HTMLLIElement>) => handleSelectLiKeydown(evt, camera.id)}
                      >{camera.name}
                      </li>
                    </Link>
                  )
                )
              }
            </ul>
          </form>
          <button
            className="form-search__reset"
            type="reset"
            onClick={handleResetBtnClick}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="header__basket-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
