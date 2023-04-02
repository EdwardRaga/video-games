import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import style from './Paginate.module.css'

const Paginate = ({ videogames, setPaginate }) => {

  //pagina actual ---> iniciar en 1
  const [currentPage, setCurrentPage] = useState(1);
  //numero de paginas 
  const totalPages = Math.ceil(videogames.length / 15);
  //array con el numero de paginas '100' --->[1,2,3,4,5,6,7]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


//funcion manejadora de eventos en los botones del paginado
  const handlePageClick = (pageNumber) => {
    const startIndex = (pageNumber - 1) * 15;
    const endIndex = startIndex + 15;
    setPaginate(videogames.slice(startIndex, endIndex));
    setCurrentPage(pageNumber);
  };

  return (
    <div className={style.container}>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? style.active : ""}
          onClick={(e) => {
            handlePageClick(pageNumber);
          }}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Paginate;