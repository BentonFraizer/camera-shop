import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../consts';
import App from './app';
import { camerasList, cameraData, promoCameraData, reviewsList } from '../../mockForTests';
import thunk from 'redux-thunk';

window.scrollTo = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  DATA: {
    camerasList: camerasList,
    camera: cameraData,
    promoCamera: promoCameraData,
    similarCamerasList: camerasList,
    reviews: reviewsList,
    isPostSentSuccessful: false,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CatalogScreen" when use navigate to "/Catalog/"', () => {
    history.push(AppRoute.Catalog);

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "ProductScreen" when use navigate to "/product/"', () => {
    history.push(AppRoute.Product);

    render(fakeApp);

    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
  });

  it('should render "BascetScreen" when use navigate to "/basket"', () => {
    history.push(AppRoute.Basket);

    render(fakeApp);

    expect(screen.getByTestId('basket')).toBeInTheDocument();
    expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });

  it('should render "OfflineScreen" when use navigate to "/offline"', () => {
    history.push(AppRoute.Offline);

    render(fakeApp);

    expect(screen.getByText(/В данный момент сайт недоступен/i)).toBeInTheDocument();
    expect(screen.getByText(/Попробуйте ещё раз позднее/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when use navigate to "*"', () => {
    history.push('/fakeRoute');

    render(fakeApp);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
  });
});
