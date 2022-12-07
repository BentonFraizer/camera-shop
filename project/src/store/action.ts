import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../consts';
import { ReviewData, Coupon } from '../types';

export const redirectToRoute = createAction<AppRoute>('site/redirectToRoute');
export const postReview = createAction('site/postReview', (value: ReviewData) => ({payload: value}));
export const postCoupon = createAction('site/postCoupon', (value: Coupon) => ({payload: value}));
