import ProductCard from '../product-card/product-card';
import { Camera } from '../../types';

type ProductsListProps = {
  productsList: Camera[];
  onClick:(id:number) => void;
  basketProductsIdentifiers: number[];
}

function ProductsList(props: ProductsListProps): JSX.Element {
  return (
    <div
      className="cards catalog__cards"
      data-testid="products-list"
    >
      {
        props.productsList.map((product) =>
          (
            <ProductCard
              key={product.id}
              cameraData={product}
              onClick={props.onClick}
              basketProductsIdentifiers={props.basketProductsIdentifiers}
            />
          )
        )
      }
    </div>
  );
}

export default ProductsList;
