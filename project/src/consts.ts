import { FiltersType, StartParams } from './types';

export enum AppRoute {
  Main = '/',
  Catalog = '/catalog/page_:pageNumber',
  Product = '/product/:id',
  Basket = '/basket',
  Offline = '/offline',
  FailedOrder = '/failed-order',
}

export enum NameSpace {
  Data = 'DATA',
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Camera = '/cameras/',
  Review = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders',
}

export const RATING_NUMBERS = [1,2,3,4,5];

export const FIRST_PAGE_NUMBER = 1;

export const START_PARAMS: StartParams = {
  _sort: 'price',
  _order: 'asc',
  category: [],
  type: [],
  level: [],
};

export const FILTERS: FiltersType = {
  Photocamera: { name: 'Фотоаппарат', option: 'category' },
  Videocamera: { name: 'Видеокамера', option: 'category' },
  Digital: { name: 'Цифровая', option: 'type' },
  Film: { name: 'Плёночная', option: 'type' },
  Snapshot: { name: 'Моментальная', option: 'type' },
  Collection: { name: 'Коллекционная', option: 'type' },
  Zero: { name: 'Нулевой', option: 'level' },
  NonProfessional: { name: 'Любительский', option: 'level' },
  Professional: { name: 'Профессиональный', option: 'level' }
};

export const CATEGORIES = [
  { name: 'photocamera', label: 'Фотоаппарат' },
  { name: 'videocamera', label: 'Видеокамера' },
];

export const TYPES = [
  { name: 'digital', label: 'Цифровая' },
  { name: 'film', label: 'Плёночная' },
  { name: 'snapshot', label: 'Моментальная' },
  { name: 'collection', label: 'Коллекционная' },
];

export const LEVELS = [
  { name: 'zero', label: 'Нулевой' },
  { name: 'non-professional', label: 'Любительский' },
  { name: 'professional', label: 'Профессиональный' }
];

export enum Promocode {
  Camera333 = 'camera-333',
  Camera444 = 'camera-444',
  Camera555 = 'camera-555',
}
