import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import OfflineScreen from './offline-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { camerasList } from '../../mockForTests';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const store = mockStore({
  DATA: {searchedCameras: camerasList},
});

describe('Page: OfflineScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfflineScreen/>
        </HistoryRouter>
      </Provider>
    );

    const headerElement = screen.getByText('В данный момент сайт недоступен');
    const spanElement = screen.getByText('Попробуйте ещё раз позднее');
    const linkElement = screen.getByText('Страница каталога');

    expect(headerElement).toBeInTheDocument();
    expect(spanElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});

