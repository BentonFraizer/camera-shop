import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import FailedOrderScreen from './failed-order-screen';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { camerasList, mockOrderData } from '../../mockForTests';
import { AppRoute } from '../../consts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const store = mockStore({
  DATA: {
    searchedCameras: camerasList,
    orderData: mockOrderData,
  },
});

describe('Page: FailedOrderScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FailedOrderScreen/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оформить заказ не удалось/i)).toBeInTheDocument();
    expect(screen.getByText(/Попробуйте ещё раз позднее/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на страницу каталога/i)).toBeInTheDocument();
  });

  it('should redirect to /catalog when user clicked back to catalog link', async () => {
    history.push('/failed-order');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.FailedOrder}
              element={
                <FailedOrderScreen/>
              }
            />
            <Route
              path={AppRoute.Catalog}
              element={<h1>This is a catalog page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оформить заказ не удалось/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText(/Вернуться на страницу каталога/i));
    expect(screen.getByText(/This is a catalog page/i)).toBeInTheDocument();
  });
});
