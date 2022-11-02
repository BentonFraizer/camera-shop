import { render, screen } from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import ProductCard from './product-card';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { cameraData } from '../../mockForTests';
import { AppRoute } from '../../consts';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});

describe('Component: ProductCard', ()=> {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard
            cameraData={cameraData}
            onClick={jest.fn()}
            isActive={false}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Видеокамера Ретрокамера Dus Auge lV')).toBeInTheDocument();
    expect(screen.getByText('73 450 ₽')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });

  it('when user click "Купить" button, should open modal', async () => {
    const buyButtonClickHandler = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard
            cameraData={cameraData}
            onClick={buyButtonClickHandler}
            isActive={false}
          />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText('Купить'));

    expect(buyButtonClickHandler).toBeCalled();
  });

  it('should redirect to ProductScreenm url when user clicked to button "Подробнее"', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={
                <ProductCard
                  cameraData={cameraData}
                  onClick={jest.fn()}
                  isActive={false}
                />
              }
            />
            <Route
              path={AppRoute.Product}
              element={<h1>This is Product Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Подробнее')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Подробнее'));

    expect(screen.queryByText('Подробнее')).not.toBeInTheDocument();
    expect(screen.getByText('This is Product Screen')).toBeInTheDocument();
  });
});
