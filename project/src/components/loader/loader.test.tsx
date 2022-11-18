import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import Loader from './loader';

const history = createMemoryHistory();

describe('Component: Loader', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Loader />
      </HistoryRouter>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

