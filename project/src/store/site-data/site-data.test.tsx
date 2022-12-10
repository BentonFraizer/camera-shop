import { setOrderData, siteData } from './site-data';
import { camerasList,
  cameraData,
  promoCameraData,
  reviewsList,
  sortedAndFilteredCamerasList,
  searchedCameras
} from '../../mockForTests';

import { fetchCamerasAction,
  fetchCameraAction,
  fetchPromoCameraAction,
  fetchReviewsAction,
  fetchSimilarCamerasAction,
  reviewPostAction,
  fetchSortedAndFilteredCamerasAction,
  fetchSearchedCamerasAction,
  orderPostAction,
} from '../api-actions';

import { resetCameraData,
  resetPostSentSuccessful,
  setDiscountValueInPercent,
  resetDiscountValueInPercent,
  resetIsOrderSentSuccessful,
  resetIsOrderSentError
} from './site-data';

describe('Reduser: siteData', () => {
  const START_DISCOUNT_VALUE = 0;
  let state = {
    camerasList: [],
    camera: null,
    promoCamera: null,
    similarCamerasList: [],
    reviews: [],
    isPostSentSuccessful: false,
    isDataLoaded: true,
    sortedAndFilteredCamerasList: [],
    searchedCameras: [],
    orderData: {
      identifiers: [],
      amounts: [],
      prices: [],
    },
    discountValueInPercent: START_DISCOUNT_VALUE,
    isOrderSentError: false,
    isOrderSentSuccessful: false,
  };

  beforeEach(() => {
    state = {
      camerasList: [],
      camera: null,
      promoCamera: null,
      similarCamerasList: [],
      reviews: [],
      isPostSentSuccessful: false,
      isDataLoaded: true,
      sortedAndFilteredCamerasList: [],
      searchedCameras: [],
      orderData: {
        identifiers: [],
        amounts: [],
        prices: [],
      },
      discountValueInPercent: START_DISCOUNT_VALUE,
      isOrderSentError: false,
      isOrderSentSuccessful: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(siteData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should update camerasList by load camerasList', () => {
    expect(siteData.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: camerasList}))
      .toEqual({...state, camerasList: camerasList, isDataLoaded: false });
  });

  it('should update camera by load cameraData', () => {
    expect(siteData.reducer(state, {type: fetchCameraAction.fulfilled.type, payload: cameraData}))
      .toEqual({...state, camera: cameraData });
  });

  it('should update promoCamera by load promoCameraData', () => {
    expect(siteData.reducer(state, {type: fetchPromoCameraAction.fulfilled.type, payload: promoCameraData}))
      .toEqual({...state, promoCamera: promoCameraData });
  });

  it('should update similarCamerasList by load camerasList', () => {
    expect(siteData.reducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: camerasList}))
      .toEqual({...state, similarCamerasList: camerasList });
  });

  it('should update reviews by load reviewsList', () => {
    expect(siteData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviewsList}))
      .toEqual({...state, reviews: reviewsList });
  });

  it('should update isPostSentSuccessful by sent review', () => {
    expect(siteData.reducer(state, {type: reviewPostAction.fulfilled.type, payload: true}))
      .toEqual({...state, isPostSentSuccessful: true });
  });

  it('should reset camera data by use action resetCameraData', () => {
    const previousState = {
      camerasList: [],
      camera: cameraData,
      promoCamera: null,
      similarCamerasList: [],
      reviews: [],
      isPostSentSuccessful: false,
      isDataLoaded: true,
      sortedAndFilteredCamerasList: [],
      searchedCameras: [],
      orderData: {
        identifiers: [],
        amounts: [],
        prices: [],
      },
      discountValueInPercent: START_DISCOUNT_VALUE,
      isOrderSentError: false,
      isOrderSentSuccessful: false,
    };

    expect(siteData.reducer(previousState, resetCameraData())).toEqual(state);
  });

  it('should reset post sent successful data by use action resetPostSentSuccessful', () => {
    const previousState = {
      camerasList: [],
      camera: null,
      promoCamera: null,
      similarCamerasList: [],
      reviews: [],
      isPostSentSuccessful: true,
      isDataLoaded: true,
      sortedAndFilteredCamerasList: [],
      searchedCameras: [],
      orderData: {
        identifiers: [],
        amounts: [],
        prices: [],
      },
      discountValueInPercent: START_DISCOUNT_VALUE,
      isOrderSentError: false,
      isOrderSentSuccessful: false,
    };

    expect(siteData.reducer(previousState, resetPostSentSuccessful())).toEqual(state);
  });

  it('should update sortedAndFilteredCamerasList by load sortedAndFilteredCamerasList', () => {
    expect(siteData.reducer(state, {type: fetchSortedAndFilteredCamerasAction.fulfilled.type, payload: sortedAndFilteredCamerasList}))
      .toEqual({...state, sortedAndFilteredCamerasList: sortedAndFilteredCamerasList, isDataLoaded: false });
  });

  it('should update searchedCameras by load searchedCameras', () => {
    expect(siteData.reducer(state, {type: fetchSearchedCamerasAction.fulfilled.type, payload: searchedCameras}))
      .toEqual({...state, searchedCameras: searchedCameras});
  });

  it('should update isOrderSentSuccessful by successfully sent orderPostAction', () => {
    expect(siteData.reducer(state, {type: orderPostAction.fulfilled.type, payload: true}))
      .toEqual({...state, isOrderSentSuccessful: true});
  });

  it('should update isOrderSentError by sent orderPostAction with error', () => {
    expect(siteData.reducer(state, {type: orderPostAction.rejected.type, payload: true}))
      .toEqual({...state, isOrderSentError: true});
  });

  it('should update orderData by setOrderData', () => {
    const nextState = {
      ...state,
      orderData: {
        identifiers: [1, 2],
        amounts: [1, 1],
        prices: [73450, 18970],
      },};

    expect(siteData.reducer(state, setOrderData({
      identifiers: [1, 2],
      amounts: [1, 1],
      prices: [73450, 18970],
    }))).toEqual(nextState);
  });

  it('should update discountValueInPercent by setDiscountValueInPercent', () => {
    const nextState = {...state, discountValueInPercent: 25};

    expect(siteData.reducer(state, setDiscountValueInPercent(25)))
      .toEqual(nextState);
  });

  it('should reset discountValueInPercent by resetDiscountValueInPercent', () => {
    const previousState = {...state, discountValueInPercent: 25};

    expect(siteData.reducer(previousState, resetDiscountValueInPercent()))
      .toEqual(state);
  });

  it('should reset isOrderSentSuccessful by resetIsOrderSentSuccessful', () => {
    const previousState = {...state, isOrderSentSuccessful: true};

    expect(siteData.reducer(previousState, resetIsOrderSentSuccessful()))
      .toEqual(state);
  });

  it('should reset isOrderSentError by resetIsOrderSentError', () => {
    const previousState = {...state, isOrderSentError: true};

    expect(siteData.reducer(previousState, resetIsOrderSentError()))
      .toEqual(state);
  });


});


