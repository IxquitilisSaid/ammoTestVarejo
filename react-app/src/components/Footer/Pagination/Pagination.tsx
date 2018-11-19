import * as React from 'react';

import '../../../styles/Pagination.css';

interface IPaginationProps {
  crumbSelect(event: React.SyntheticEvent<HTMLButtonElement>): void;
  btnCreator: number;
} 

const Pagination = ({ crumbSelect, btnCreator }: IPaginationProps) => {
  return (
    <div className="Pagination">
      <button
        key={btnCreator}
        value={btnCreator}
        onClick={crumbSelect}>{btnCreator + 1}</button>
    </div>
  );
}



export default Pagination;