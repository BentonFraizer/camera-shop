import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Routes, Route } from 'react-router-dom';
import HistoryRouter from '../history-router/history-router';
import { Provider } from 'react-redux';
import Header from './header';
import { AppRoute } from '../../consts';
import userEvent from '@testing-library/user-event';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import { camerasList, mockOrderData} from '../../mockForTests';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';

window.scrollTo = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const store = mockStore({
  DATA: {
    camerasList: camerasList,
    searchedCameras: camerasList,
    orderData: mockOrderData,
  },
});

const AMOUNT_ITEMS_IN_BASKET = 1;

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header basketCount={AMOUNT_ITEMS_IN_BASKET}/>
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

  it('should found name in the cameras list when user typed \'Van Shot\' in search input', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header basketCount={AMOUNT_ITEMS_IN_BASKET}/>
        </HistoryRouter>,
      </Provider>
    );

    await userEvent.click(screen.getByTestId('search-input'));
    await userEvent.type(screen.getByTestId('search-input'), 'Van Shot');
    await userEvent.tab();

    expect(screen.getByDisplayValue(/Van Shot/i)).toBeInTheDocument();
  });

  it('should not found name in the cameras list when user typed \'kodak\' in search input', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header basketCount={AMOUNT_ITEMS_IN_BASKET}/>
        </HistoryRouter>,
      </Provider>
    );

    await userEvent.click(screen.getByTestId('search-input'));
    await userEvent.type(screen.getByTestId('search-input'), 'kodak');
    await userEvent.tab();

    expect(screen.queryByText(/kodak/i)).not.toBeInTheDocument();
  });
});
