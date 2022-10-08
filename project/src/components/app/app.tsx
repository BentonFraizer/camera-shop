import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import BasketScreen from '../../pages/basket-screen/basket-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
