import { Camera } from '../../types';
import { Link } from 'react-router-dom';
import { separateNumbers } from '../../utils/utils';
import { RATING_NUMBERS } from '../../consts';

type ProductCardProps = {
  cameraData: Camera;
  onClick?:(id:number) => void;
  isActive?: boolean;
}

function ProductCard(props: ProductCardProps):JSX.Element {
  const { id, name, rating, price, category, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount } = props.cameraData;

  return (
    <div className={props.isActive ? 'product-card is-active' : 'product-card'}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`}/>
          <img src={`../${previewImg}`} srcSet={`../${previewImg2x} 2x`} width="280" height="240" alt={name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            RATING_NUMBERS.map((ratingNumber) => (
              <svg width="17" height="16" aria-hidden="true" key={ratingNumber}>
                <use xlinkHref={rating >= ratingNumber ? '#icon-full-star' : '#icon-star'}></use>
              </svg>
            ))
          }
          <p className="visually-hidden">Рейтинг: 3</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{`${category} ${name}`}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{separateNumbers(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={() => props.onClick ? props.onClick(id) : null}
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`/product/${id}?tab=specifications`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
