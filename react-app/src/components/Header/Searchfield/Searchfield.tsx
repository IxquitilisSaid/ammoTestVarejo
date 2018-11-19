import * as React from 'react';

import '../../../styles/searchfield.css';
const imageSrc = require('../../../images/mmartan.png')

interface ISearchfieldProps {
  searchChange(event: React.SyntheticEvent<HTMLInputElement>): void;
} 

const Searchfield = ({ searchChange }: ISearchfieldProps) => {
  
  return (
    <div className='HeaderWrap'>
      <div className='Header'>
        <div>
          <img src={String(imageSrc)} alt="mmartan logo"/>
        </div>
        <div className="Searchfield">
          <input
            className=''
            type='search'
            placeholder='Procure Produtos'
            onChange={searchChange}
          />          
        </div>
      </div>
    </div> 
  );
};

export default Searchfield;