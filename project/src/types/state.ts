import { store } from '../store/index';
import { Camera, PromoCamera } from './index';

export type SiteData = {
  camerasList: Camera[];
  promoCamera: PromoCamera | null;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;