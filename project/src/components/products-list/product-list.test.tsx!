import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import ProductList from './products-list';
import { camerasList } from '../../mockForTests';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ProductList
          productsList={camerasList}
          onClick={jest.fn()}
        />
      </HistoryRouter>);

    expect(screen.getByTestId(/products-list/i)).toHaveClass('cards catalog__cards');
  });
});
