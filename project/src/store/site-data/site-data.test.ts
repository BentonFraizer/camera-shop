import { siteData } from './site-data';
import { camerasList, cameraData, promoCameraData, reviewsList } from '../../mockForTests';
import { fetchCamerasAction,
  fetchCameraAction,
  fetchPromoCameraAction,
  fetchReviewsAction,
  fetchSimilarCamerasAction,
  reviewPostAction,
} from '../api-actions';
import { resetCameraData, resetPostSentSuccessful } from './site-data';

describe('Reduser: siteData', () => {
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
    };

    expect(siteData.reducer(previousState, resetPostSentSuccessful())).toEqual(state);
  });
});


