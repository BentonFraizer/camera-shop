import { NameSpace } from '../../consts';
import { State } from '../../types/state';
import { Camera, PromoCamera, Review } from '../../types';

export const getCameras = (state: State):Camera[] => state[NameSpace.Data].camerasList;
export const getCamera = (state: State):Camera | null => state[NameSpace.Data].camera;
export const getPromoCamera = (state: State):PromoCamera | null => state[NameSpace.Data].promoCamera;
export const getSimilarCamerasList = (state: State):Camera[] => state[NameSpace.Data].similarCamerasList;
export const getReviews = (state: State):Review[] => state[NameSpace.Data].reviews;
export const getIsPostSendingStatus = (state: State):boolean => state[NameSpace.Data].isPostSentSuccessful;
export const getIsDataLoadedStatus = (state: State):boolean => state[NameSpace.Data].isDataLoaded;
