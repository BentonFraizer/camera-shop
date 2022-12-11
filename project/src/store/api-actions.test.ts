import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore }from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { Promocode } from '../consts';
import { fetchCamerasAction,
  fetchCameraAction,
  fetchSimilarCamerasAction,
  fetchPromoCameraAction,
  fetchReviewsAction,
  reviewPostAction,
  fetchSortedAndFilteredCamerasAction,
  fetchSearchedCamerasAction,
  couponPostAction,
  orderPostAction
} from './api-actions';
import { APIRoute } from '../consts';
import { State } from '../types/state';
import { camerasList,
  cameraData,
  promoCameraData,
  reviewData,
  sortedAndFilteredCamerasList,
  searchedCameras,
  mockOrderForSent
} from '../mockForTests';
import { siteData } from './site-data/site-data';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch fetchCamerasAction when GET /cameras', async () => {
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, camerasList);

    const store = mockStore();

    await store.dispatch(fetchCamerasAction());

    const actions = store.getActions().map(({type}:Action<string>) => type);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchCameraAction when GET /cameras/:id', async () => {
    mockAPI
      .onGet('/cameras/1')
      .reply(200, cameraData);

    const store = mockStore();

    await store.dispatch(fetchCameraAction(1));

    const actions = store.getActions();

    expect(actions[1].type).toEqual(fetchCameraAction.fulfilled.type);
  });

  it('should dispatch fetchSimilarCamerasAction when GET /cameras/:id/similar', async () => {
    mockAPI
      .onGet('/cameras/1/similar')
      .reply(200, camerasList);

    const store = mockStore();

    await store.dispatch(fetchSimilarCamerasAction(1));

    const actions = store.getActions();

    expect(actions[1].type).toEqual(fetchSimilarCamerasAction.fulfilled.type);
  });

  it('should dispatch fetchPromoCameraAction when GET /promo', async () => {
    mockAPI
      .onGet('/promo')
      .reply(200, promoCameraData);

    const store = mockStore();

    await store.dispatch(fetchPromoCameraAction());

    const actions = store.getActions();

    expect(actions[1].type).toEqual(fetchPromoCameraAction.fulfilled.type);
  });

  it('should dispatch fetchReviewsAction when GET /cameras/:id/reviews', async () => {
    mockAPI
      .onGet('/cameras/1/reviews')
      .reply(200, promoCameraData);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(1));

    const actions = store.getActions();

    expect(actions[1].type).toEqual(fetchReviewsAction.fulfilled.type);
  });

  it('should dispatch reviewPostAction when POST /reviews', async () => {
    mockAPI
      .onPost('/reviews')
      .reply(201);

    const store = mockStore();

    await store.dispatch(reviewPostAction(reviewData));

    const actions = store.getActions();

    expect(actions[2].type).toEqual(reviewPostAction.fulfilled.type);
  });

  it('should dispatch fetchSortedAndFilteredCamerasAction when GET "/cameras?_sort=price&_order=asc"', async () => {
    mockAPI
      .onGet('/cameras?_sort=price&_order=asc')
      .reply(200, sortedAndFilteredCamerasList);

    const store = mockStore();

    await store.dispatch(fetchSortedAndFilteredCamerasAction('_sort=price&_order=asc'));

    const actions = store.getActions().map(({type}:Action<string>) => type);

    expect(actions).toEqual([
      fetchSortedAndFilteredCamerasAction.pending.type,
      fetchSortedAndFilteredCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchSearchedCamerasAction when GET "/cameras?name_like=Van"', async () => {
    mockAPI
      .onGet('/cameras?name_like=Van')
      .reply(200, searchedCameras);

    const store = mockStore();

    await store.dispatch(fetchSearchedCamerasAction({'name_like': 'Van'}));

    const actions = store.getActions();

    expect(actions[1].type).toEqual(fetchSearchedCamerasAction.fulfilled.type);
  });

  it('should dispatch couponPostAction when POST /coupons', async () => {
    mockAPI
      .onPost('/coupons')
      .reply(200);

    const store = mockStore();

    await store.dispatch(couponPostAction({coupon: Promocode.Camera444}));

    const actions = store.getActions().map(({type}:Action<string>) => type);

    expect(actions).toEqual([
      couponPostAction.pending.type,
      siteData.actions.setDiscountValueInPercent.type,
      couponPostAction.fulfilled.type
    ]);
  });

  it('should dispatch orderPostAction when POST /orders', async () => {
    mockAPI
      .onPost('/orders')
      .reply(201);

    const store = mockStore();

    await store.dispatch(orderPostAction(mockOrderForSent));

    const actions = store.getActions().map(({type}:Action<string>) => type);

    expect(actions).toEqual([
      orderPostAction.pending.type,
      'site/postOrder',
      orderPostAction.fulfilled.type
    ]);
  });
});
