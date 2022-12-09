import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import GratitudeModal from './gratitude-modal';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../consts';

const history = createMemoryHistory();
const mockStore = configureMockStore();


describe('Component: GratitudeModal', () => {
  it('should render correctly', () => {
    const onCloseBtnOrOverlayClick = jest.fn();
    const onBackToShoppingBtnClick = jest.fn();

    render(
      <HistoryRouter history={history}>
        <GratitudeModal
          onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
          isModalOpened
          onBackToShoppingBtnClick={onBackToShoppingBtnClick}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
  });

  it('should close modal when user clicked close button', async () => {
    const onCloseBtnOrOverlayClick = jest.fn();
    const onBackToShoppingBtnClick = jest.fn();

    render(
      <HistoryRouter history={history}>
        <GratitudeModal
          onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
          isModalOpened
          onBackToShoppingBtnClick={onBackToShoppingBtnClick}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('close-btn'));
    expect(onCloseBtnOrOverlayClick).toBeCalled();
  });

  it('should close modal when user clicked on modal overlay', async () => {
    const onCloseBtnOrOverlayClick = jest.fn();
    const onBackToShoppingBtnClick = jest.fn();

    render(
      <HistoryRouter history={history}>
        <GratitudeModal
          onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
          isModalOpened
          onBackToShoppingBtnClick={onBackToShoppingBtnClick}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('modal-overlay'));
    expect(onCloseBtnOrOverlayClick).toBeCalled();
  });

  it('should redirect to /catalog when user clicked back to the shopping button', async () => {
    const onCloseBtnOrOverlayClick = jest.fn();
    const onBackToShoppingBtnClick = jest.fn();
    const store = mockStore();
    history.push('/basket');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Basket}
              element={
                <GratitudeModal
                  onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
                  isModalOpened
                  onBackToShoppingBtnClick={onBackToShoppingBtnClick}
                />
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

    expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('back-to-shopping-btn'));
    expect(screen.getByText(/This is a catalog page/i)).toBeInTheDocument();
  });
});
