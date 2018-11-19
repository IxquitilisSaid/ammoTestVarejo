import * as React from 'react';

import '../../../../styles/Product.css';

interface ProductStatelessProps {
  name: string;
	colour: string;
	price: number;
  imgOne: string;
  imgTwo: string;
  imgThree: string;
  imgFour: string;
  id: number;
}

const Product: React.SFC<ProductStatelessProps> = ({
  name, 
  colour, 
  price, 
  imgOne,
  imgTwo,
  imgThree,
  imgFour,
  id }) => {
    return (
      <div className="Product">
        <div className="ImgWrap">
          <img src={imgOne} alt={name} />
          <img src={imgTwo} alt={name} />
          <img src={imgThree} alt={name} />
          <img src={imgFour} alt={name}/>
        </div>
        <div className="NameWrap">
          <h6>{name}</h6>
          <p>{colour}</p>
        </div>
        <div className="PriceWrap">
          <h6><span id="Strike">R${price} </span>por</h6>
          <h6>R${price - 30}</h6>
        </div>
      </div>
    );
};

export default Product;
