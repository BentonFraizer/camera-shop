import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getCameras, getIsDataLoadedStatus } from '../../store/site-data/selectors';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import OfflineScreen from '../../pages/offline-screen/offline-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import FailedOrderScreen from '../../pages/failed-order-screen/failed-order-screen';
import { fetchCamerasAction } from '../../store/api-actions';
import { useEffect } from 'react';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isDataLoaded = useAppSelector(getIsDataLoadedStatus);
  const camerasList = useAppSelector(getCameras);

  useEffect(() => {
    dispatch(fetchCamerasAction());
  }, [dispatch]);

  if (isDataLoaded === true && camerasList.length === 0) {
    return (
      <LoadingScreen/>
    );
  }

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
        path={AppRoute.FailedOrder}
        element={<FailedOrderScreen/>}
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
