import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import BasketItem from './basket-item';
import { cameraData, mockOrderData } from '../../mockForTests';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    orderData: mockOrderData,
  },
});

describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    const onClick = jest.fn();
    const PRICES_AMOUNT_ON_PAGE = 2;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItem
            cameraData={cameraData}
            orderData={mockOrderData}
            onClick={onClick}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Ретрокамера Dus Auge lV/i)).toBeInTheDocument();
    expect(screen.getByText(/DA4IU67AD5/i)).toBeInTheDocument();
    expect(screen.getByText(/Коллекционная видеокамера/i)).toBeInTheDocument();
    expect(screen.getByText(/Любительский уровень/i)).toBeInTheDocument();
    expect(screen.getAllByText(/73 450/i).length).toBe(PRICES_AMOUNT_ON_PAGE);
  });

  it('should open DeleteItemModal when uer clicked delete-item-btn', async () => {
    const onClick = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItem
            cameraData={cameraData}
            orderData={mockOrderData}
            onClick={onClick}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('delete-item-btn')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('delete-item-btn'));

    expect(onClick).toBeCalled();
  });

  it('should increace amount of items to three value when user typed 3 in input', async () => {
    const onClick = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItem
            cameraData={cameraData}
            orderData={mockOrderData}
            onClick={onClick}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText('1')).toBeInTheDocument();

    await userEvent.click(screen.getByPlaceholderText('1'));
    await userEvent.clear(screen.getByPlaceholderText('1'));
    await userEvent.type(screen.getByPlaceholderText('1'), '3{enter}');

    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  });
});
