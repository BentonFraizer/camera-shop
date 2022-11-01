import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import Reviews from './reviews';
import userEvent from '@testing-library/user-event';
import { reviewsList } from '../../mockForTests';

const history = createMemoryHistory();

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Reviews
          reviews={reviewsList}
          openSendReviewModal={jest.fn()}
        />
      </HistoryRouter>
    );

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
    expect(screen.getByText('Показать больше отзывов')).toBeInTheDocument();
  });

  it('should hide the button when "Показать больше отзывов" will be click (reviews amount in array is equal four)', async () => {
    render(
      <HistoryRouter history={history}>
        <Reviews
          reviews={reviewsList}
          openSendReviewModal={jest.fn()}
        />
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText('Показать больше отзывов'));

    expect(screen.queryByText('Показать больше отзывов')).not.toBeInTheDocument();
  });

  it('openModal should called when user clicked "Оставить свой отзыв" button', async () => {
    const sendReviewButtonClick = jest.fn();
    render(
      <HistoryRouter history={history}>
        <Reviews
          reviews={reviewsList}
          openSendReviewModal={sendReviewButtonClick}
        />
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText('Оставить свой отзыв'));

    expect(sendReviewButtonClick).toBeCalled();
  });
});
