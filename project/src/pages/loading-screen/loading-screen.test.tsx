import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import LoadingScreen from './loading-screen';

describe('Page: LoadingScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <LoadingScreen/>
      </HistoryRouter>
    );

    const divElement = screen.getByText('Loading...');

    expect(divElement).toBeInTheDocument();
  });
});
