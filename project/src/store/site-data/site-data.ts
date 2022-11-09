import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { SiteData } from '../../types/state';
import {
  fetchCamerasAction,
  fetchCameraAction,
  fetchSimilarCamerasAction,
  fetchPromoCameraAction,
  fetchReviewsAction,
  reviewPostAction,
  fetchSortedCamerasAction
} from '../api-actions';

const initialState: SiteData = {
  camerasList: [],
  camera: null,
  promoCamera: null,
  similarCamerasList: [],
  reviews: [],
  isPostSentSuccessful: false,
  isDataLoaded: true,
  sortedCamerasList: [],
};

export const siteData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    resetCameraData: (state) => {
      state.camera = null;
    },
    resetPostSentSuccessful: (state) => {
      state.isPostSentSuccessful = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.camerasList = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
      })
      .addCase(fetchPromoCameraAction.fulfilled, (state, action) => {
        state.promoCamera = action.payload;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCamerasList = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(reviewPostAction.fulfilled, (state) => {
        state.isPostSentSuccessful = true;
      })
      .addCase(fetchSortedCamerasAction.pending, (state, action) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchSortedCamerasAction.fulfilled, (state, action) => {
        state.sortedCamerasList = action.payload;
        state.isDataLoaded = false;
      });
  },
});

export const { resetCameraData, resetPostSentSuccessful } = siteData.actions;
