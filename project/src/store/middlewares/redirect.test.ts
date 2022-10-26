import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { redirect } from './redirect';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../consts';
import { State } from '../../types/state';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /catalog', () => {
    store.dispatch(redirectToRoute(AppRoute.Catalog));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Catalog);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Catalog),
    ]);
  });

  it('should not to be redirect /offline because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Offline});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Offline);
  });
});
