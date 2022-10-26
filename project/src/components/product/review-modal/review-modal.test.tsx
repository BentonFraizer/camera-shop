import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../../components/history-router/history-router';
import ReviewModal from './review-modal';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({DATA: {isPostSentSuccessful: true}});

describe('Component: ReviewModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewModal
            closeModal={jest.fn()}
            cameraId={'1'}
            isReviewModalOpened
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Ваше имя')).toBeInTheDocument();
    expect(screen.getByLabelText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Комментарий/i)).toBeInTheDocument();
    expect(screen.getByText('Отправить отзыв')).toHaveClass('form-review__btn');
  });

  it('should get an error when input "Ваше имя" is filled, input "Достоинства" is empty and clicked submit button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewModal
            closeModal={jest.fn()}
            cameraId={'1'}
            isReviewModalOpened
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('input-user-name'), 'Name');
    await userEvent.click(screen.getByText('Отправить отзыв'));

    expect(screen.getByTestId('div-user-name')).not.toHaveClass('is-invalid');
    expect(screen.getByTestId('div-user-plus')).toHaveClass('is-invalid');
  });
});
