import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import DeleteItemModal from './delete-item-modal';
import { cameraData, mockOrderData } from '../../mockForTests';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    orderData: mockOrderData,
  },
});

describe('Component: DeleteItemModal', () => {
  it('should render correctly', () => {
    const onCloseBtnOrOverlayClick = jest.fn();
    const onDeleteBtnClick = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <DeleteItemModal
            dataForAddItemModal={cameraData}
            onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
            isModalOpened
            onDeleteBtnClick={onDeleteBtnClick}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Удалить этот товар/i)).toBeInTheDocument();
    expect(screen.getByText(/Ретрокамера Dus Auge lV/i)).toBeInTheDocument();
    expect(screen.getByText(/DA4IU67AD5/i)).toBeInTheDocument();
    expect(screen.getByTestId('delete-btn')).toBeInTheDocument();
    expect(screen.getByTestId('continue-btn')).toBeInTheDocument();
  });

  it('should close modal when user clicked close button', async () => {
    const onCloseBtnOrOverlayClick = jest.fn();
    const onDeleteBtnClick = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <DeleteItemModal
            dataForAddItemModal={cameraData}
            onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
            isModalOpened
            onDeleteBtnClick={onDeleteBtnClick}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Удалить этот товар/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('close-btn'));
    expect(onCloseBtnOrOverlayClick).toBeCalled();
  });

  it('should close modal when user clicked continue button', async () => {
    const onCloseBtnOrOverlayClick = jest.fn();
    const onDeleteBtnClick = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <DeleteItemModal
            dataForAddItemModal={cameraData}
            onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
            isModalOpened
            onDeleteBtnClick={onDeleteBtnClick}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Удалить этот товар/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('continue-btn'));
    expect(onCloseBtnOrOverlayClick).toBeCalled();
  });

  it('should close modal when user clicked on modal overlay', async () => {
    const onCloseBtnOrOverlayClick = jest.fn();
    const onDeleteBtnClick = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <DeleteItemModal
            dataForAddItemModal={cameraData}
            onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
            isModalOpened
            onDeleteBtnClick={onDeleteBtnClick}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Удалить этот товар/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('modal-overlay'));
    expect(onCloseBtnOrOverlayClick).toBeCalled();
  });

  it('should delete item from basket when user clicked delete button', async () => {
    const onCloseBtnOrOverlayClick = jest.fn();
    const onDeleteBtnClick = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <DeleteItemModal
            dataForAddItemModal={cameraData}
            onCloseBtnOrOverlayClick={onCloseBtnOrOverlayClick}
            isModalOpened
            onDeleteBtnClick={onDeleteBtnClick}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Удалить этот товар/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('delete-btn'));
    expect(onDeleteBtnClick).toBeCalled();
  });
});
