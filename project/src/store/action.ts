import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../consts';
import { ReviewData } from '../types';

export const redirectToRoute = createAction<AppRoute>('site/redirectToRoute');
export const postReview = createAction('site/postReview', (value: ReviewData) => ({payload: value}));
