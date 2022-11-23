import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import CatalogScreen from './catalog-screen';
import { camerasList, promoCameraData } from '../../mockForTests';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

window.scrollTo = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const store = mockStore({
  DATA: {
    promoCamera: promoCameraData,
    camerasList: camerasList,
    sortedAndFilteredCamerasList: camerasList,
    searchedCameras: camerasList
  },
});

describe('Page: CatalogScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });

  describe('testing checkboxes of filter', () => {
    it('should disable checboxes type and snapshot when user clicked videocamera checkbox', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('videocamera-checkbox'));

      expect(screen.getByTestId('film-checkbox')).toBeDisabled();
      expect(screen.getByTestId('snapshot-checkbox')).toBeDisabled();
      expect(screen.queryByTestId('photocamera-checkbox')).not.toBeDisabled();
      expect(screen.queryByTestId('digital-checkbox')).not.toBeDisabled();
      expect(screen.queryByTestId('collection-checkbox')).not.toBeDisabled();
      expect(screen.queryByTestId('zero-checkbox')).not.toBeDisabled();
      expect(screen.queryByTestId('non-professional-checkbox')).not.toBeDisabled();
      expect(screen.queryByTestId('professional-checkbox')).not.toBeDisabled();
    });

    it('should not to be checked film-checkbox and snapshot-checkbox when user clicked videocamera checkbox', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('film-checkbox'));
      await userEvent.click(screen.getByTestId('snapshot-checkbox'));

      expect(screen.getByTestId('film-checkbox')).toBeChecked();
      expect(screen.getByTestId('snapshot-checkbox')).toBeChecked();

      await userEvent.click(screen.getByTestId('videocamera-checkbox'));

      expect(screen.queryByTestId('film-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('snapshot-checkbox')).not.toBeChecked();
    });

    it('should checked photocamera-checkbox only when user clicked photocamera checkbox', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('photocamera-checkbox'));

      expect(screen.getByTestId('photocamera-checkbox')).toBeChecked();
      expect(screen.queryByTestId('videocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('digital-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('film-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('snapshot-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('collection-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('zero-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('non-professional-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('professional-checkbox')).not.toBeChecked();
    });

    it('should checked videocamera-checkbox only when user clicked videocamera checkbox', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('videocamera-checkbox'));

      expect(screen.queryByTestId('photocamera-checkbox')).not.toBeChecked();
      expect(screen.getByTestId('videocamera-checkbox')).toBeChecked();
      expect(screen.queryByTestId('digital-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('film-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('snapshot-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('collection-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('zero-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('non-professional-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('professional-checkbox')).not.toBeChecked();
    });

    it('should checked digital-checkbox only when user clicked digital checkbox', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('digital-checkbox'));

      expect(screen.queryByTestId('photocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('videocamera-checkbox')).not.toBeChecked();
      expect(screen.getByTestId('digital-checkbox')).toBeChecked();
      expect(screen.queryByTestId('film-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('snapshot-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('collection-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('zero-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('non-professional-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('professional-checkbox')).not.toBeChecked();
    });

    it('should checked film-checkbox only when user clicked film checkbox', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('film-checkbox'));

      expect(screen.queryByTestId('photocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('videocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('digital-checkbox')).not.toBeChecked();
      expect(screen.getByTestId('film-checkbox')).toBeChecked();
      expect(screen.queryByTestId('snapshot-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('collection-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('zero-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('non-professional-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('professional-checkbox')).not.toBeChecked();
    });

    it('should checked snapshot-checkbox only when user clicked snapshot checkbox', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('snapshot-checkbox'));

      expect(screen.queryByTestId('photocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('videocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('digital-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('film-checkbox')).not.toBeChecked();
      expect(screen.getByTestId('snapshot-checkbox')).toBeChecked();
      expect(screen.queryByTestId('collection-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('zero-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('non-professional-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('professional-checkbox')).not.toBeChecked();
    });

    it('should checked collection-checkbox only when user clicked collection checkbox', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('collection-checkbox'));

      expect(screen.queryByTestId('photocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('videocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('digital-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('film-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('snapshot-checkbox')).not.toBeChecked();
      expect(screen.getByTestId('collection-checkbox')).toBeChecked();
      expect(screen.queryByTestId('zero-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('non-professional-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('professional-checkbox')).not.toBeChecked();
    });

    it('should checked zero-checkbox only when user clicked zero checkbox', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('zero-checkbox'));

      expect(screen.queryByTestId('photocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('videocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('digital-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('film-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('snapshot-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('collection-checkbox')).not.toBeChecked();
      expect(screen.getByTestId('zero-checkbox')).toBeChecked();
      expect(screen.queryByTestId('non-professional-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('professional-checkbox')).not.toBeChecked();
    });

    it('should checked non-professional-checkbox only when user clicked non-professional checkbox', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('non-professional-checkbox'));

      expect(screen.queryByTestId('photocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('videocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('digital-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('film-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('snapshot-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('collection-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('zero-checkbox')).not.toBeChecked();
      expect(screen.getByTestId('non-professional-checkbox')).toBeChecked();
      expect(screen.queryByTestId('professional-checkbox')).not.toBeChecked();
    });
    it('should checked professional-checkbox only when user clicked professional checkbox', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('professional-checkbox'));

      expect(screen.queryByTestId('photocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('videocamera-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('digital-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('film-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('snapshot-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('collection-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('zero-checkbox')).not.toBeChecked();
      expect(screen.queryByTestId('non-professional-checkbox')).not.toBeChecked();
      expect(screen.getByTestId('professional-checkbox')).toBeChecked();
    });
  });
});
