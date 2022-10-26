import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import Icons from './icons';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Icons />
      </HistoryRouter>,
    );

    expect(screen.getByTestId('div-icons')).toHaveClass('visually-hidden');
  });
});
