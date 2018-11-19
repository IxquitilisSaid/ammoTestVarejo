import * as React from 'react';
import Product from './Product/Product';
import { IProduct } from '../../../containers/App';


const ProductsWrapper = ({ products }: {products: Array<IProduct>}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {
        products.map((name, id) => {
          return (
            <Product
              key={id}
              id={products[id].id}
              name={products[id].name}
							colour={products[id].colour}
							price={products[id].price} 
              imgOne={products[id].imgOne}
              imgTwo={products[id].imgTwo}
              imgThree={products[id].imgThree}
              imgFour={products[id].imgFour}/>
          );
        })
      }
    </div>
  );
}

export default ProductsWrapper;
