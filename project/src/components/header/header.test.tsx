import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Routes, Route } from 'react-router-dom';
import HistoryRouter from '../history-router/history-router';
import { Provider } from 'react-redux';
import Header from './header';
import { AppRoute } from '../../consts';
import userEvent from '@testing-library/user-event';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import { camerasList } from '../../mockForTests';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const store = mockStore({
  DATA: {searchedCameras: camerasList},
});

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>,
      </Provider>
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
    expect(screen.getByText('Доставка')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
  });

  it('should redirect to CatalogScreen when user clicked to link "Каталог"', async () => {
    history.push('/basket');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Basket}
              element={<BasketScreen/>}
            />
            <Route
              path={AppRoute.Main}
              element={<h1>This is catalog page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('header-catalog'));

    expect(screen.getByText(/This is catalog page/i)).toBeInTheDocument();
  });

  // Начал писать новые тесты тут:

  //   it('should show modal when user typed letters in search input', async () => {
  //     render(
  //       <HistoryRouter history={history}>
  //         <Header />
  //       </HistoryRouter>,
  //     );

  //     await userEvent.click(screen.getByTestId('search-input'));
  //     await userEvent.type(screen.getByTestId('search-input'), 'Van Shot');

  //     expect(screen.getAllByText(/Van Shot/i)).toBeInTheDocument();
  //   });
});
