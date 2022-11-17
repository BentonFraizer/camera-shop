import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import CatalogScreen from './catalog-screen';
import { camerasList, promoCameraData } from '../../mockForTests';
import thunk from 'redux-thunk';

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
});
