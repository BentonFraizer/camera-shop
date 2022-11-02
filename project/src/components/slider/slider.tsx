import { Camera } from '../../types';
import { useState } from 'react';
import ProductCard from '../../components/product-card/product-card';
import { SliderElement } from '../../consts';

const ELEMENTS_WHEN_NEED_BUTTONS = 3;

type SliderProps = {
  similarCameras: Camera[];
  onBuyButtonClick?: (id:number) => void;
}

function Slider({similarCameras, onBuyButtonClick}: SliderProps): JSX.Element {
  const [activeCards, setActiveCards] = useState([0, 1, 2]);

  const handleNextBtnClick = () => {
    const result = activeCards.map((item) => item + 1);
    setActiveCards(result);
  };

  const handlePrevBtnClick = () => {
    const result = activeCards.map((item) => item - 1);
    setActiveCards(result);
  };

  const isButtonVisible = similarCameras.length > ELEMENTS_WHEN_NEED_BUTTONS;
  const isPrevButtonDisabled = activeCards[SliderElement.First] === 0;
  const isNextButtonDisabled = activeCards[SliderElement.Last] === similarCameras.length - 1;

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {
              similarCameras.map((camera, idx) =>

                (
                  <ProductCard
                    key={camera.id}
                    cameraData={camera}
                    isActive={activeCards.includes(idx)}
                    onClick={onBuyButtonClick}
                  />
                )
              )
            }
          </div>
          { isButtonVisible &&
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            onClick={() => handlePrevBtnClick()}
            disabled={isPrevButtonDisabled}
            data-testid="slider-controls--prev"
          >
            <svg width="7" height="12" aria-hidden='true'>
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>}
          { isButtonVisible &&
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            onClick={() => handleNextBtnClick()}
            disabled={isNextButtonDisabled}
            data-testid="slider-controls--next"
          >
            <svg width="7" height="12" aria-hidden='true'>
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>}
        </div>
      </div>
    </section>
  );
}

export default Slider;
