import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import NotFoundScreen from './not-found-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { camerasList, mockOrderData } from '../../mockForTests';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const store = mockStore({
  DATA: {
    searchedCameras: camerasList,
    orderData: mockOrderData,
  },
});

describe('Page: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFoundScreen/>
        </HistoryRouter>
      </Provider>
    );

    const headerElement = screen.getByText('404');
    const spanElement = screen.getByText('Страница не найдена');
    const linkElement = screen.getByText('Вернуться на страницу каталога');

    expect(headerElement).toBeInTheDocument();
    expect(spanElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
