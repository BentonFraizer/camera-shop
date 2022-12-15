import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/site-data/selectors';
import {
  getMinPrice,
  getMaxPrice,
  getClosestMinPriceValue,
  getClosestMaxPriceValue,
  isEnterKeyPressed,
  getPropertiesForCurrentChecbox
} from '../../utils/utils';
import { FILTERS, START_PARAMS, FIRST_PAGE_NUMBER, CATEGORIES, TYPES, LEVELS } from '../../consts';
import { Camera, StartParams } from '../../types';

enum PriceLength {
  Min = 0,
  Max = 7,
}

type FilterProps = {
  params: StartParams;
  cameras: Camera[];
  onSetParams: (params: StartParams) => void;
  onSetCurrentPage: (number: number) => void;
}

function Filter({ params, cameras, onSetParams, onSetCurrentPage }: FilterProps): JSX.Element {
  const navigate = useNavigate();
  const immutableCamerasList = useAppSelector(getCameras);
  const camerasList = cameras;
  const [priceFromInputValue, setPriceFromInputValue] = useState<string | undefined>('');
  const [priceToInputValue, setPriceToInputValue] = useState<string | undefined>('');
  const isFilmSnapshotCheckboxesDisabled = !params.category.includes(FILTERS.Photocamera.name) && params.category.includes(FILTERS.Videocamera.name);

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
        onSetParams({...params, 'price_gte': String(closestMinPriceValue)});
      }

      // Если в поле "от" значение уже было записано и получено новое значение, которое меньше предыдущего
      if (targetValue < Number(params.price_gte)) {
        setPriceFromInputValue(closestMinPriceValueImmutable);
        onSetParams({...params, 'price_gte': closestMinPriceValueImmutable});
      }

      // Если полученное значение попадает в диапазон от минимальной цены до максимальной
      if (targetValue > Number(getMinPrice(camerasList)) && targetValue < Number(getMaxPrice(camerasList))) {
        setPriceFromInputValue(closestMinPriceValue);
        onSetParams({...params, 'price_gte': closestMinPriceValue});
      }

      // Если полученное значение больше максимальной цены из всех товаров
      if (targetValue > maxPriceInImmutableCamerasList) {
        setPriceFromInputValue(closestMaxPriceValueImmutable);
        onSetParams({...params, 'price_gte': String(closestMaxPriceValueImmutable)});
      }

      // Если в поле "до" значение было уже записано, а полученное в поле "от" больше него
      if (!isPriceToValueEmpty && Number(priceToInputValue) < targetValue) {
        setPriceFromInputValue(priceToInputValue);
        onSetParams({...params, 'price_gte': priceToInputValue});
      }
    } else {
      onSetParams({...params, 'price_gte': undefined});
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
        onSetParams({...params, 'price_lte': priceFromInputValue});
      } else {
        setPriceToInputValue(closestMaxPriceValue);
        onSetParams({...params, 'price_lte': closestMaxPriceValue});
      }

      if (Number(getMinPrice(camerasList)) < targetValue && targetValue < maxPriceInCamerasList) {
        setPriceToInputValue(closestMaxPriceValue);
        onSetParams({...params, 'price_lte': closestMaxPriceValue});
      }

      // Если в поле "до" значение уже было записано и получено нововое значение, которое больше предыдущего
      if (targetValue > Number(params.price_lte)) {
        setPriceToInputValue(closestMaxPriceValueImmutable);
        onSetParams({...params, 'price_lte': String(closestMaxPriceValueImmutable)});
      }

      // Если поле "от" не заполнено и полученное значение меньше минимальной цены из всех товаров
      // записывается минимальное значение цены из всех товаров
      if (isPriceFromValueEmpty && targetValue < minPriceInCamerasList) {
        setPriceToInputValue(String(minPriceInCamerasList));
      }

      // Если полученное значение больше максимальной цены товаров в каталоге
      if (targetValue > Number(maxPriceInImmutableCamerasList)) {
        setPriceToInputValue(closestMaxPriceValueImmutable);
        onSetParams({...params, 'price_lte': String(closestMaxPriceValueImmutable)});
      }
    } else {
      onSetParams({...params, 'price_lte': undefined});
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
    onSetParams(START_PARAMS);
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

    onSetParams(Object.assign({}, params, {category: newCategory}));
    navigate(`/catalog/page_${FIRST_PAGE_NUMBER}`);
    onSetCurrentPage(FIRST_PAGE_NUMBER);
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

      onSetParams(Object.assign({}, params, {category: newCategory, type: newType}));
    } else {
      const nameIndex = params.category.findIndex((category) => category === FILTERS.Videocamera.name);
      newCategory?.splice(nameIndex, 1);
      onSetParams(Object.assign({}, params, {category: newCategory}));
    }

    navigate(`/catalog/page_${FIRST_PAGE_NUMBER}`);
    onSetCurrentPage(FIRST_PAGE_NUMBER);
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

      onSetParams(Object.assign({}, params, {type: newType}));
      navigate(`/catalog/page_${FIRST_PAGE_NUMBER}`);
      onSetCurrentPage(FIRST_PAGE_NUMBER);
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

      onSetParams(Object.assign({}, params, {level: newLevel}));
      navigate(`/catalog/page_${FIRST_PAGE_NUMBER}`);
      onSetCurrentPage(FIRST_PAGE_NUMBER);
    }
  };

  return (
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
          {
            CATEGORIES.map((item)=> (
              <div key={item.name} className="custom-checkbox catalog-filter__item">
                <label>
                  <input
                    type="checkbox"
                    name={item.name}
                    onChange={item.name === 'photocamera' ? handlePhotocameraCheckboxClick : handleVideocameraCheckboxClick}
                    checked={params.category.includes(item.label)}
                    data-testid={`${item.name}-checkbox`}
                  /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{item.label}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          {
            TYPES.map((item) => (
              <div key={item.name} className="custom-checkbox catalog-filter__item">
                <label>
                  <input
                    type="checkbox"
                    name={item.name}
                    onChange={handleTypeorLevelCheckboxesClick}
                    disabled={(item.name === 'film' || item.name === 'snapshot') && isFilmSnapshotCheckboxesDisabled}
                    checked={params.type.includes(item.label)}
                    data-testid={`${item.name}-checkbox`}
                  /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{item.label}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          {
            LEVELS.map((item) => (
              <div key={item.name} className="custom-checkbox catalog-filter__item">
                <label>
                  <input
                    type="checkbox"
                    name={item.name}
                    onChange={handleTypeorLevelCheckboxesClick}
                    checked={params.level.includes(item.label)}
                    data-testid={`${item.name}-checkbox`}
                  /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{item.label}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={handleResetBtnClick}
        >Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default Filter;
