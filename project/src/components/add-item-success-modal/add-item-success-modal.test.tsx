import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import AddItemSuccessModal from './add-item-success-modal';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../consts';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: AddItemSuccessModal', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <AddItemSuccessModal
          onCloseBtnOrOverlayClick={jest.fn()}
          isModalOpened
        />
      </HistoryRouter>
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });

  it('should close modal when user clicked Close button', async () => {
    const onCloseBtnOrOverlayClick = jest.fn();
    render(
      <HistoryRouter history={history}>
        <AddItemSuccessModal
          onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
          isModalOpened
        />
      </HistoryRouter>
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('close-btn'));

    expect(onCloseBtnOrOverlayClick).toBeCalled();
  });

  it('should close modal when user clicked Continue shopping button', async () => {
    const onCloseBtnOrOverlayClick = jest.fn();

    render(
      <HistoryRouter history={history}>
        <AddItemSuccessModal
          onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
          isModalOpened
        />
      </HistoryRouter>
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('continue-shopping-btn'));

    expect(onCloseBtnOrOverlayClick).toBeCalled();
  });

  it('should redirect to /basket when user clicked Go to basket button', async () => {
    history.push('/');
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={
                <>
                  <h1>This is catalog page</h1>
                  <AddItemSuccessModal
                    onCloseBtnOrOverlayClick={jest.fn()}
                    isModalOpened
                  />
                </>
              }
            />
            <Route
              path={AppRoute.Basket}
              element={<h1>This is a basket page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('go-to-basket'));

    expect (screen.getByText(/This is a basket page/i)).toBeInTheDocument();
  });
});
