import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import EmptyQuery from './empty-query';

const history = createMemoryHistory();

describe('Component: EmptyQuery', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <EmptyQuery />
      </HistoryRouter>
    );

    expect(screen.getByText(/По вашему запросу ничего не найдено/i)).toBeInTheDocument();
  });
});
