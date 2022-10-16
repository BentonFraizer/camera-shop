import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { SiteData } from '../../types/state';
import { fetchCamerasAction, fetchCameraAction, fetchPromoCameraAction } from '../api-actions';

const initialState: SiteData = {
  camerasList: [],
  camera: null,
  promoCamera: null,
};

export const siteData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    resetCameraData: (state) => {
      state.camera = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.camerasList = action.payload;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
      })
      .addCase(fetchPromoCameraAction.fulfilled, (state, action) => {
        state.promoCamera = action.payload;
      });
  },
});

export const { resetCameraData } = siteData.actions;
