import * as React from 'react';

import '../../../styles/Dropdown.css';

interface IFooterProps {
  dropdownSelect(event: React.SyntheticEvent<HTMLSelectElement>): void;
} 

const Footer = ({ dropdownSelect }: IFooterProps) => {
  
  return (
    <div className='DropdownWrap'>
      <div className='Dropdown'>
        <select onChange={dropdownSelect}>
          <option value="5">5 Produtos por Página</option>
          <option value="10">10 Produtos por Página</option>
          <option value="15">15 Produtos por Página</option>
          <option value="20">20 Produtos por Página</option>
        </select>
      </div>
    </div> 
  );
};

export default Footer;