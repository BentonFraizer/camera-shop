import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { siteData } from './site-data/site-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: siteData.reducer,
});
