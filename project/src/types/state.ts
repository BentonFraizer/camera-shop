import { store } from '../store/index';
import { Camera, PromoCamera, Review, Order } from './index';

export type SiteData = {
  camerasList: Camera[];
  camera: Camera | null;
  promoCamera: PromoCamera[] | null;
  similarCamerasList: Camera[];
  reviews: Review[];
  isPostSentSuccessful: boolean;
  isDataLoaded: boolean;
  sortedAndFilteredCamerasList: Camera[];
  searchedCameras: Camera[];
  orderData: Order;
  discountValueInPercent: number;
  isOrderSentError: boolean;
  isOrderSentSuccessful: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
