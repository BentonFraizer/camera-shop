import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Camera, PromoCamera, Review, ReviewData } from '../types';
import { redirectToRoute, postReview } from './action';
import { APIRoute, AppRoute } from '../consts';

// Запрос всех камер
export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, {rejectWithValue, dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Camera[]>(APIRoute.Cameras);
      return data;
    } catch (error) {
      return rejectWithValue(dispatch(redirectToRoute(AppRoute.Offline)));
    }
  },
);

// Зарос одной камеры
export const fetchCameraAction = createAsyncThunk<Camera, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamera',
  async (id: number, {extra: api}): Promise<Camera> => {
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
  'data/fetchSimilarCameras',
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

// Запрос отзывов
export const fetchReviewsAction = createAsyncThunk<Review[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id: number, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Camera}${id}/reviews`);
    return data;
  },
);

// Отправка отзыва на сервер
export const reviewPostAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'site/postReview',
  async ({cameraId, userName, advantage, disadvantage, review, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<ReviewData>(APIRoute.Review, {cameraId, userName, advantage, disadvantage, review, rating});
    dispatch(postReview(data));
  }
);

// Запрос отсортированных и отфильтрованных камер
export const fetchSortedAndFilteredCamerasAction = createAsyncThunk<Camera[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSortedAndFilteredCameras',
  async (URL: string, {extra: api}) => {
    const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}?${URL}`);
    return data;
  },
);

// Запрос камер для формы поиска, которая располагается в компоненте header
export const fetchSearchedCamerasAction = createAsyncThunk<Camera[], object, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSearchedCameras',
  async (params: object, {extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.Cameras, { params });
    return data;
  },
);
