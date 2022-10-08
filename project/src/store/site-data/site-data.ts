import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { SiteData } from '../../types/state';
import { fetchCamerasAction, fetchPromoCameraAction } from '../api-actions';

const initialState: SiteData = {
  camerasList: [],
  promoCamera: null,
};

export const siteData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.camerasList = action.payload;
      })
      .addCase(fetchPromoCameraAction.fulfilled, (state, action) => {
        state.promoCamera = action.payload;
      });
  },
});

