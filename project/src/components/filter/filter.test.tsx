import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Filter from './filter';
import { camerasList, promoCameraData } from '../../mockForTests';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

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
type StartParams = {
  _sort: string;
  _order: string;
  category: string[];
  type: string[];
  level: string[];
  price_gte?: string;
  price_lte?: string;
};
const START_PARAMS: StartParams = {
  _sort: 'price',
  _order: 'asc',
  category: [],
  type: [],
  level: [],
};

let params = START_PARAMS;

describe('Component: Footer', () => {
  beforeEach(() => {
    params = START_PARAMS;
  });
  describe('testing price inputs', () => {
    it('should not type minus symbol in price inputs', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Filter params={params} cameras={camerasList} onSetParams={jest.fn()} onSetCurrentPage={jest.fn()}/>
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
            <Filter params={params} cameras={camerasList} onSetParams={jest.fn()} onSetCurrentPage={jest.fn()}/>
          </HistoryRouter>
        </Provider>
      );

      await userEvent.type(screen.getByTestId('price-from'), '1234567letters&*%*');

      expect(screen.getByDisplayValue('1234567')).toBeInTheDocument();
    });
    it('should type numbers only in "price-to" input', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Filter params={params} cameras={camerasList} onSetParams={jest.fn()} onSetCurrentPage={jest.fn()}/>
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
            <Filter params={params} cameras={camerasList} onSetParams={jest.fn()} onSetCurrentPage={jest.fn()}/>
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
            <Filter params={params} cameras={camerasList} onSetParams={jest.fn()} onSetCurrentPage={jest.fn()}/>
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
            <Filter params={params} cameras={camerasList} onSetParams={jest.fn()} onSetCurrentPage={jest.fn()}/>
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
            <Filter params={params} cameras={camerasList} onSetParams={jest.fn()} onSetCurrentPage={jest.fn()}/>
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
            <Filter params={params} cameras={camerasList} onSetParams={jest.fn()} onSetCurrentPage={jest.fn()}/>
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
            <Filter params={params} cameras={camerasList} onSetParams={jest.fn()} onSetCurrentPage={jest.fn()}/>
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
            <Filter params={params} cameras={camerasList} onSetParams={jest.fn()} onSetCurrentPage={jest.fn()}/>
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
            <Filter params={params} cameras={camerasList} onSetParams={jest.fn()} onSetCurrentPage={jest.fn()}/>
          </HistoryRouter>
        </Provider>
      );

      await userEvent.type(screen.getByTestId('price-to'), '128000');
      await userEvent.tab();

      expect(screen.queryByDisplayValue('128000')).not.toBeInTheDocument();
    });
  });

  describe('testing checkboxes of filter', () => {
    it('should called setParams callback when user clicked photocamera checkbox', async () => {
      const setParams = jest.fn();
      const setCurrentPage = jest.fn();

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Filter
              params={params}
              cameras={camerasList}
              onSetParams={setParams}
              onSetCurrentPage={setCurrentPage}
            />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('photocamera-checkbox'));

      expect(setParams).toBeCalled();
      expect(setCurrentPage).toBeCalled();
    });

    it('should called setParams callback when user clicked videocamera checkbox', async () => {
      const setParams = jest.fn();
      const setCurrentPage = jest.fn();

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Filter
              params={params}
              cameras={camerasList}
              onSetParams={setParams}
              onSetCurrentPage={setCurrentPage}
            />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('videocamera-checkbox'));

      expect(setParams).toBeCalled();
      expect(setCurrentPage).toBeCalled();
    });

    it('should called setParams callback when user clicked digital checkbox', async () => {
      const setParams = jest.fn();
      const setCurrentPage = jest.fn();

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Filter
              params={params}
              cameras={camerasList}
              onSetParams={setParams}
              onSetCurrentPage={setCurrentPage}
            />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('digital-checkbox'));

      expect(setParams).toBeCalled();
      expect(setCurrentPage).toBeCalled();
    });

    it('should called setParams callback when user clicked film checkbox', async () => {
      const setParams = jest.fn();
      const setCurrentPage = jest.fn();

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Filter
              params={params}
              cameras={camerasList}
              onSetParams={setParams}
              onSetCurrentPage={setCurrentPage}
            />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('film-checkbox'));

      expect(setParams).toBeCalled();
      expect(setCurrentPage).toBeCalled();
    });

    it('should called setParams callback when user clicked snapshot checkbox', async () => {
      const setParams = jest.fn();
      const setCurrentPage = jest.fn();

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Filter
              params={params}
              cameras={camerasList}
              onSetParams={setParams}
              onSetCurrentPage={setCurrentPage}
            />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('snapshot-checkbox'));

      expect(setParams).toBeCalled();
      expect(setCurrentPage).toBeCalled();
    });

    it('should called setParams callback when user clicked collection checkbox', async () => {
      const setParams = jest.fn();
      const setCurrentPage = jest.fn();

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Filter
              params={params}
              cameras={camerasList}
              onSetParams={setParams}
              onSetCurrentPage={setCurrentPage}
            />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('collection-checkbox'));

      expect(setParams).toBeCalled();
      expect(setCurrentPage).toBeCalled();
    });

    it('should called setParams callback when user clicked zero checkbox', async () => {
      const setParams = jest.fn();
      const setCurrentPage = jest.fn();

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Filter
              params={params}
              cameras={camerasList}
              onSetParams={setParams}
              onSetCurrentPage={setCurrentPage}
            />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('zero-checkbox'));

      expect(setParams).toBeCalled();
      expect(setCurrentPage).toBeCalled();
    });

    it('should called setParams callback when user clicked non-professional checkbox', async () => {
      const setParams = jest.fn();
      const setCurrentPage = jest.fn();

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Filter
              params={params}
              cameras={camerasList}
              onSetParams={setParams}
              onSetCurrentPage={setCurrentPage}
            />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('non-professional-checkbox'));

      expect(setParams).toBeCalled();
      expect(setCurrentPage).toBeCalled();
    });
    it('should called setParams callback when user clicked professional checkbox', async () => {
      const setParams = jest.fn();
      const setCurrentPage = jest.fn();

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Filter
              params={params}
              cameras={camerasList}
              onSetParams={setParams}
              onSetCurrentPage={setCurrentPage}
            />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('professional-checkbox'));

      expect(setParams).toBeCalled();
      expect(setCurrentPage).toBeCalled();
    });

    it('should called setParams callback nine times when user clicked all checkboxes at row', async () => {
      const setParams = jest.fn();
      const setCurrentPage = jest.fn();

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Filter
              params={params}
              cameras={camerasList}
              onSetParams={setParams}
              onSetCurrentPage={setCurrentPage}
            />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByTestId('photocamera-checkbox'));
      await userEvent.click(screen.getByTestId('videocamera-checkbox'));
      await userEvent.click(screen.getByTestId('digital-checkbox'));
      await userEvent.click(screen.getByTestId('film-checkbox'));
      await userEvent.click(screen.getByTestId('snapshot-checkbox'));
      await userEvent.click(screen.getByTestId('collection-checkbox'));
      await userEvent.click(screen.getByTestId('zero-checkbox'));
      await userEvent.click(screen.getByTestId('non-professional-checkbox'));
      await userEvent.click(screen.getByTestId('professional-checkbox'));

      expect(setParams).toBeCalledTimes(9);
      expect(setCurrentPage).toBeCalledTimes(9);
    });
  });
});

