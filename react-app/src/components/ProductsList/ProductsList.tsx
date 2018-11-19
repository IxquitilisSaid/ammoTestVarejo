import * as React from 'react';

type Props = {
  children?: JSX.Element
}

const ProductList = (props: Props) => {
  return (
    <div style={{border: '1px solid lightgrey', maxWidth: '1075px', margin: '0 auto'}}>
      {props.children}
    </div>
  );
};

export default ProductList;