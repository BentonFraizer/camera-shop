import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { Order } from '../../types';
import { SiteData } from '../../types/state';
import {
  fetchCamerasAction,
  fetchCameraAction,
  fetchSimilarCamerasAction,
  fetchPromoCameraAction,
  fetchReviewsAction,
  reviewPostAction,
  fetchSortedAndFilteredCamerasAction,
  fetchSearchedCamerasAction,
  orderPostAction,
} from '../api-actions';

const START_DISCOUNT_VALUE = 0;

const initialState: SiteData = {
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

export const siteData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    resetCameraData: (state) => {
      state.camera = null;
    },
    resetPostSentSuccessful: (state) => {
      state.isPostSentSuccessful = false;
    },
    setOrderData: (state, action) => {
      state.orderData = action.payload as Order;
    },
    setDiscountValueInPercent: (state, action) => {
      state.discountValueInPercent = action.payload as number;
    },
    resetDiscountValueInPercent: (state) => {
      state.discountValueInPercent = START_DISCOUNT_VALUE;
    },
    resetIsOrderSentSuccessful: (state) => {
      state.isOrderSentSuccessful = false;
    },
    resetIsOrderSentError: (state) => {
      state.isOrderSentError = false;
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
      .addCase(fetchSortedAndFilteredCamerasAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchSortedAndFilteredCamerasAction.fulfilled, (state, action) => {
        state.sortedAndFilteredCamerasList = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchSearchedCamerasAction.fulfilled, (state, action) => {
        state.searchedCameras = action.payload;
      })
      .addCase(orderPostAction.fulfilled, (state) => {
        state.isOrderSentSuccessful = true;
      })
      .addCase(orderPostAction.rejected, (state) => {
        state.isOrderSentError = true;
      });
  },
});

export const { resetCameraData, resetPostSentSuccessful, setOrderData, setDiscountValueInPercent, resetDiscountValueInPercent, resetIsOrderSentSuccessful, resetIsOrderSentError } = siteData.actions;
