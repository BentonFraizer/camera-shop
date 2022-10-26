import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../../components/history-router/history-router';
import ReviewSuccessModal from './review-success-modal';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});

describe('Component: ReviewSuccessModal', ()=> {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewSuccessModal
            closeModal={jest.fn()}
            isReviewSuccessModalOpened
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });

  it('should close modal when user clicked "Вернуться к покупкам" button', async () => {
    const backToShoppingButtonClickHandle = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewSuccessModal
            closeModal={backToShoppingButtonClickHandle}
            isReviewSuccessModalOpened
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Вернуться к покупкам'));

    expect(backToShoppingButtonClickHandle).toBeCalled();
  });
});
