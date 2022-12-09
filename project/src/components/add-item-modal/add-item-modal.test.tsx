import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import AddItemModal from './add-item-modal';
import { cameraData } from '../../mockForTests';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();


describe('Component: AddItemModal', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <AddItemModal
          dataForAddItemModal={cameraData}
          onCloseBtnOrOverlayClick={jest.fn()}
          isModalOpened
          onAddToBasketBtnClick={jest.fn()}
        />
      </HistoryRouter>,
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });

  it('should be closed when close button click', async () => {
    const closeButtonClickHandle = jest.fn();
    render(
      <HistoryRouter history={history}>
        <AddItemModal
          dataForAddItemModal={cameraData}
          onCloseBtnOrOverlayClick={closeButtonClickHandle}
          isModalOpened
          onAddToBasketBtnClick={jest.fn()}
        />
      </HistoryRouter>,
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('close-btn'));

    expect(closeButtonClickHandle).toBeCalled();
  });
});
