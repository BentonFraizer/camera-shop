import { FiltersType, StartParams } from './types';

export enum AppRoute {
  Main = '/',
  Catalog = '/catalog/page_:pageNumber',
  Product = '/product/:id',
  Basket = '/basket',
  Offline = '/offline',
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
  Photocamera: { name: 'Фотоаппарат', option: 'type' },
  Videocamera: { name: 'Видеокамера', option: 'type' },
  Digital: { name: 'Цифровая', option: 'type' },
  Film: { name: 'Плёночная', option: 'type' },
  Snapshot: { name: 'Моментальная', option: 'type' },
  Collection: { name: 'Коллекционная', option: 'type' },
  Zero: { name: 'Нулевой', option: 'level' },
  NonProfessional: { name: 'Любительский', option: 'level' },
  Professional: { name: 'Профессиональный', option: 'level' }
};
