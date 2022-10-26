import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import BasketScreen from './basket-screen';

describe('Page: BasketScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <BasketScreen/>
      </HistoryRouter>
    );

    const paragraphElement = screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле');

    expect(screen.getByTestId('basket')).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
    expect(screen.getByTestId('basket')).toHaveClass('title--h2');
  });
});
