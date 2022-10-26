import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import OfflineScreen from './offline-screen';

describe('Page: OfflineScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <OfflineScreen/>
      </HistoryRouter>
    );

    const headerElement = screen.getByText('В данный момент сайт недоступен');
    const spanElement = screen.getByText('Попробуйте ещё раз позднее');
    const linkElement = screen.getByText('Страница каталога');

    expect(headerElement).toBeInTheDocument();
    expect(spanElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});

