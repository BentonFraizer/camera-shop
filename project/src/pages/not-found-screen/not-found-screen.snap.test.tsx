import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import NotFoundScreen from './not-found-screen';
import HistoryRouter from '../../components/history-router/history-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { camerasList } from '../../mockForTests';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const store = mockStore({
  DATA: {searchedCameras: camerasList},
});

describe('Page: NotFoundScreen', () => {
  it('should render correctly', () => {

    const {container} = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFoundScreen />
        </HistoryRouter>,
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
