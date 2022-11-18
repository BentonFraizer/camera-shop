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

  it('should not type minus symbol in price inputs', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogScreen />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByTestId('price-from'), '-');
    await userEvent.type(screen.getByTestId('price-to'), '-');

    expect(screen.queryByDisplayValue('-')).not.toBeInTheDocument();
  });

  it('should type numbers only in "price-from" input', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogScreen />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByTestId('price-from'), '1234567letters&*%*');

    expect(screen.getByDisplayValue('1234567')).toBeInTheDocument();
  });
  describe('testing price inputs', () => {
    it('should type numbers only in "price-to" input', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.type(screen.getByTestId('price-to'), '1234567letters&*%*');

      expect(screen.getByDisplayValue('1234567')).toBeInTheDocument();
    });

    it('should automatically change value of "price-from" input to minimal when user typed price lower than minimal', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.type(screen.getByTestId('price-from'), '1000');
      await userEvent.tab();

      expect(screen.getByDisplayValue('4990')).toBeInTheDocument();
    });

    it('should not take value in "price-from" input when user typed price lower than minimal', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.type(screen.getByTestId('price-from'), '1000');
      await userEvent.tab();

      expect(screen.queryByDisplayValue('1000')).not.toBeInTheDocument();
    });

    it('should automatically change value of "price-to" input to maximal when user typed price higher than maximal', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.type(screen.getByTestId('price-to'), '500000');
      await userEvent.tab();

      expect(screen.getByDisplayValue('149990')).toBeInTheDocument();
    });

    it('should not take value in "price-to" input when user typed price higher than maximal', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.type(screen.getByTestId('price-to'), '500000');
      await userEvent.tab();

      expect(screen.queryByDisplayValue('500000')).not.toBeInTheDocument();
    });

    it('should automatically change value of \'price-from\' to closest minimal to value which user typed', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.type(screen.getByTestId('price-from'), '5000');
      await userEvent.tab();

      expect(screen.getByDisplayValue('5690')).toBeInTheDocument();
    });

    it('should not take value in \'price-from\' if the value which user typed not equal to any price value', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.type(screen.getByTestId('price-from'), '5000');
      await userEvent.tab();

      expect(screen.queryByDisplayValue('5000')).not.toBeInTheDocument();
    });

    it('should automatically change value of \'price-to\' to closest maximal to value which user typed', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.type(screen.getByTestId('price-to'), '128000');
      await userEvent.tab();

      expect(screen.getByDisplayValue('126000')).toBeInTheDocument();
    });

    it('should not take value in \'price-to\' if the value which user typed not equal to any price value', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CatalogScreen />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.type(screen.getByTestId('price-to'), '128000');
      await userEvent.tab();

      expect(screen.queryByDisplayValue('128000')).not.toBeInTheDocument();
    });
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
