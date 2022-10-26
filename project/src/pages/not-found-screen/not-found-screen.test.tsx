import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import NotFoundScreen from './not-found-screen';

describe('Page: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundScreen/>
      </HistoryRouter>
    );

    const headerElement = screen.getByText('404');
    const spanElement = screen.getByText('Страница не найдена');
    const linkElement = screen.getByText('Вернуться на страницу каталога');

    expect(headerElement).toBeInTheDocument();
    expect(spanElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
