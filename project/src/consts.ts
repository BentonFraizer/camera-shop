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
  Review = '/reviews'
}

export const RATING_NUMBERS = [1,2,3,4,5];

export enum SliderElement {
  First = 0,
  Last = 2,
}

export enum Filters {
  Photocamera = 'Фотоаппарат',
  Videocamera = 'Видеокамера',
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная',
  Zero = 'Нулевой',
  NonProfessiobal = 'Любительский',
  Professiobal = 'Профессиональный'
}
