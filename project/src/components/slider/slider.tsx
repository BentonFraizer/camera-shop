import { Camera } from '../../types';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/product-card/product-card';

type SliderProps = {
  similarCameras: Camera[];
  onBuyButtonClick?: (id:number) => void;
}

function Slider({similarCameras, onBuyButtonClick}: SliderProps): JSX.Element {
  const [activeCards, setActiveCards] = useState([0, 1, 2]);
  const FIRST_SLIDER_ELEMENT = 0;
  const LAST_SLIDER_ELEMENT = 2;
  const ELEMENTS_WHEN_NEED_BUTTONS = 4;
  const [isPrevButtonDisabled, setisPrevButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setisNextButtonDisabled] = useState(false);

  const handleNextBtnClick = () => {
    const result = activeCards.map((item) => item + 1);
    setActiveCards(result);
  };

  const handlePrevBtnClick = () => {
    const result = activeCards.map((item) => item - 1);
    setActiveCards(result);
  };

  useEffect(() => {
    if (similarCameras.length < ELEMENTS_WHEN_NEED_BUTTONS) {
      setisPrevButtonDisabled(true);
      setisNextButtonDisabled(true);
    }

    if (activeCards[FIRST_SLIDER_ELEMENT] === 0) {
      setisPrevButtonDisabled(true);
    } else {
      setisPrevButtonDisabled(false);
    }

    if (activeCards[LAST_SLIDER_ELEMENT] === similarCameras.length - 1) {
      setisNextButtonDisabled(true);
    } else {
      setisNextButtonDisabled(false);
    }
  }, [activeCards, similarCameras]);

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
          </button>
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
          </button>
        </div>
      </div>
    </section>
  );
}

export default Slider;
