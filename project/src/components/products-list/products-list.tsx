import ProductCard from '../product-card/product-card';
import { Camera } from '../../types';

type ProductsListProps = {
  productsList: Camera[];
  onClick:(id:number) => void;
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
            />
          )
        )
      }
    </div>
  );
}

export default ProductsList;
