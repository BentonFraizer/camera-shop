import { NameSpace } from '../../consts';
import { State } from '../../types/state';
import { Camera, PromoCamera, Review } from '../../types';

export const getCameras = (state: State):Camera[] => state[NameSpace.Data].camerasList;
export const getCamera = (state: State):Camera | null => state[NameSpace.Data].camera;
export const getPromoCamera = (state: State):PromoCamera | null => state[NameSpace.Data].promoCamera;
export const getSimilarCamerasList = (state: State):Camera[] => state[NameSpace.Data].similarCamerasList;
export const getReviews = (state: State):Review[] => state[NameSpace.Data].reviews;
// export const getFilm = (state: State) => state[NameSpace.Data].film;
// export const getSimilarFilmsList = (state: State) => state[NameSpace.Data].similarFilmsList;
// export const getPromoFilm = (state: State) => state[NameSpace.Data].promoFilm;
// export const getComments = (state: State) => state[NameSpace.Data].comments;
// export const getDataLoadedStatus = (state: State) => state[NameSpace.Data].isDataLoaded;
// export const getFavoriteFilms = (state: State) => state[NameSpace.Data].favoriteFilmsList;
// export const getPostCommentError = (state: State) => state[NameSpace.Data].error.postComment;
// export const getCommentSentStatus = (state: State) => state[NameSpace.Data].isCommentSentSuccessfully;
// export const getFavoriteStatusChange = (state: State) => state[NameSpace.Data].isFavoriteStatusChanged;
