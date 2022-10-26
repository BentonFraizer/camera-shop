import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import OfflineScreen from '../../pages/offline-screen/offline-screen';


function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<CatalogScreen/>}
      >
      </Route>
      <Route
        path={AppRoute.Catalog}
        element={<CatalogScreen/>}
      >
      </Route>
      <Route
        path={AppRoute.Product}
        element={<ProductScreen/>}
      >
      </Route>
      <Route
        path={AppRoute.Basket}
        element={<BasketScreen/>}
      >
      </Route>
      <Route
        path={AppRoute.Offline}
        element={<OfflineScreen/>}
      >
      </Route>
      <Route
        path='*'
        element={<NotFoundScreen/>}
      >
      </Route>
    </Routes>
  );
}

export default App;
