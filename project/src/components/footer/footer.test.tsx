import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Routes, Route } from 'react-router-dom';
import HistoryRouter from '../../components/history-router/history-router';
import Footer from './footer';
import { AppRoute } from '../../consts';
import userEvent from '@testing-library/user-event';
import BasketScreen from '../../pages/basket-screen/basket-screen';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>,
    );

    expect(screen.getByText('Интернет-магазин фото- и видеотехники')).toBeInTheDocument();
    expect(screen.getByText('Навигация')).toBeInTheDocument();
    expect(screen.getByText('Ресурсы')).toBeInTheDocument();
    expect(screen.getByText('Поддержка')).toBeInTheDocument();
  });

  it('should redirect to CatalogScreen when user clicked to link "Каталог"', async () => {
    history.push('/basket');
    render(
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
    );

    expect(screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('footer-catalog'));

    expect(screen.getByText(/This is catalog page/i)).toBeInTheDocument();
  });
});