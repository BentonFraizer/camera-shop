import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import userEvent from '@testing-library/user-event';
import Banner from './banner';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../consts';
import { promoCameraData } from '../../mockForTests';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Banner', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Banner
          promoCamera={promoCameraData}
        />
      </HistoryRouter>
    );

    expect(screen.getByText('Новинка!')).toBeInTheDocument();
    expect(screen.getByText('Профессиональная камера от известного производителя')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('btn');
  });

  it('should redirect to ProductScreen when user clicked button', async () => {
    history.push('/');
    const store = mockStore();
    const mockPromoCameraData = {
      id: 7,
      name: 'Look 54',
      previewImg: 'img/content/promo.jpg',
      previewImg2x: 'img/content/promo@2x.jpg',
      previewImgWebp: 'img/content/promo.webp',
      previewImgWebp2x: 'img/content/promo@2x.webp'
    };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={
                <>
                  <h1>This is catalog page</h1>
                  <Banner promoCamera={mockPromoCameraData}/>
                </>
              }
            />
            <Route
              path={AppRoute.Product}
              element={<h1>This is a product page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>

    );

    expect(screen.getByText(/This is catalog page/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is a product page/i)).toBeInTheDocument();
  });
});
