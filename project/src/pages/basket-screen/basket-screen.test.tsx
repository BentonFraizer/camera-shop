import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import BasketScreen from './basket-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { camerasList, mockOrderData } from '../../mockForTests';

window.scrollTo = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const store = mockStore({
  DATA: {
    camerasList: camerasList,
    searchedCameras: camerasList,
    orderData: mockOrderData,
  },
});

describe('Page: BasketScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketScreen/>
        </HistoryRouter>
      </Provider>
    );

    const paragraphElement = screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле');

    expect(screen.getByTestId('basket')).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
    expect(screen.getByTestId('basket')).toHaveClass('title--h2');
  });
});
