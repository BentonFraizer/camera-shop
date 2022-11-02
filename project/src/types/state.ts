import { store } from '../store/index';
import { Camera, PromoCamera, Review } from './index';

export type SiteData = {
  camerasList: Camera[];
  camera: Camera | null;
  promoCamera: PromoCamera | null;
  similarCamerasList: Camera[];
  reviews: Review[];
  isPostSentSuccessful: boolean;
  isDataLoaded: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
