import { Review } from '../../types';
import { RATING_NUMBERS } from '../../consts';
import { convertDateForDateTimeAttr, humanizeDate, getDateForSort } from '../../utils/utils';
import { useEffect, useState } from 'react';

type ReviewsProps = {
  reviews: Review[];
  openSendReviewModal: () => void;
}

function Reviews({reviews, openSendReviewModal}: ReviewsProps):JSX.Element {
  const reviewsForSort = [...reviews];
  const reviewsAfterSort = reviewsForSort.sort((a, b) => getDateForSort(a.createAt) > getDateForSort(b.createAt) ? -1 : 1);
  const REVIEWS_COUNT_PER_STEP = 3;
  const reviewsCount = reviewsAfterSort.length;
  const [renderedReviewsCount, setRenderedReviewsCount] = useState(REVIEWS_COUNT_PER_STEP);
  const [isShowMoreButtonVisible, setIsShowMoreButtonVisible] = useState(true);
  let renderedReviews = reviewsAfterSort.slice(0, Math.min(reviewsCount, renderedReviewsCount));

  // Отображение/скрытие кнопки "Показать больше отзывов"
  useEffect(() => {
    if (renderedReviews.length >= REVIEWS_COUNT_PER_STEP && renderedReviews.length < reviewsCount) {
      setIsShowMoreButtonVisible(true);
    } else {
      setIsShowMoreButtonVisible(false);
    }
  }, [renderedReviews, reviewsCount]);

  // Обработчик нажатия на кнопку "Показать больше отзывов"
  const handleLoadMoreButtonClick = () => {
    const newRenderedReviewsCount = Math.min(reviewsCount, renderedReviewsCount + REVIEWS_COUNT_PER_STEP);
    renderedReviews = reviewsAfterSort.slice(renderedReviewsCount, newRenderedReviewsCount);
    setRenderedReviewsCount(newRenderedReviewsCount);

    if (newRenderedReviewsCount >= reviewsCount) {
      setIsShowMoreButtonVisible(false);
    }

    return renderedReviews;
  };

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button
            className="btn"
            type="button"
            onClick={ () => openSendReviewModal() }
          >Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">
          {
            renderedReviews
              .map((review) => (
                <li key={review.id} className="review-card">
                  <div className="review-card__head">
                    <p className="title title--h4">{review.userName}</p>
                    <time className="review-card__data" dateTime={convertDateForDateTimeAttr(review.createAt)}>{humanizeDate(review.createAt)}</time>
                  </div>
                  <div className="rate review-card__rate">
                    {
                      RATING_NUMBERS.map((ratingNumber) => (
                        <svg width="17" height="16" aria-hidden="true" key={ratingNumber}>
                          <use xlinkHref={review.rating >= ratingNumber ? '#icon-full-star' : '#icon-star'}></use>
                        </svg>
                      ))
                    }
                    <p className="visually-hidden">Оценка: {review.rating}</p>
                  </div>
                  <ul className="review-card__list">
                    <li className="item-list"><span className="item-list__title">Достоинства:</span>
                      <p className="item-list__text">{review.advantage}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Недостатки:</span>
                      <p className="item-list__text">{review.disadvantage}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Комментарий:</span>
                      <p className="item-list__text">{review.review}</p>
                    </li>
                  </ul>
                </li>
              ))
          }
        </ul>
        <div className="review-block__buttons">
          { isShowMoreButtonVisible &&
          <button className="btn btn--purple" type="button" onClick={handleLoadMoreButtonClick}>Показать больше отзывов
          </button>}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
