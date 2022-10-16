import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Camera, PromoCamera } from '../types';
// import { redirectToRoute } from './action';
import { APIRoute } from '../consts';

// Запрос всех камер
export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {rejectWithValue, dispatch, extra: api}) => {
    // try {
    //   const {data} = await api.get<Camera[]>(APIRoute.Cameras);
    //   return data;
    // } catch (error) {
    //   return rejectWithValue(dispatch(redirectToRoute(AppRoute.Offline)));
    // }
    const {data} = await api.get<Camera[]>(APIRoute.Cameras);
    return data;
  },
);

// Зарос одной камеры
export const fetchCameraAction = createAsyncThunk<Camera, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamera',
  async (id: number, {extra: api}) => {
    const {data} = await api.get<Camera>(`${APIRoute.Camera}${id}`);
    return data;
  },
);

// Запрос похожих камер
export const fetchSimilarCamerasAction = createAsyncThunk<Camera[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async (id: number, {extra: api}) => {
    const {data} = await api.get<Camera[]>(`${APIRoute.Camera}${id}/similar`);
    return data;
  },
);

// Запрос промопредложения
export const fetchPromoCameraAction = createAsyncThunk<PromoCamera, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoCamera',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoCamera>(APIRoute.Promo);
    return data;
  },
);
