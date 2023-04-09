import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import style from './Paginate.module.css'

const Paginate = ({ videogames, setPaginate,setLanding }) => {

  //pagina actual ---> iniciar en 1
  const [currentPage, setCurrentPage] = useState(1);
  //numero de paginas 
  const totalPages = Math.ceil(videogames.length / 15);
  //array con el numero de paginas '100' --->[1,2,3,4,5,6,7]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);


//funcion manejadora de eventos en los botones del paginado
  const handlePageClick = (pageNumber) => {
    const startIndex = (pageNumber - 1) * 15;
    const endIndex = startIndex + 15;
    setPaginate(null);
    setLanding(true)
    console.log(pageNumber);
    
    setPaginate(videogames.slice(startIndex, endIndex));
   
    if(videogames?.length > 1){
      setLanding(false)
      // setTimeout(()=>{
      // },1000)
      
    }
    setCurrentPage(pageNumber);
    
  };

  return (
    videogames?.length > 5 && (<div className={style.pagination}>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? style.active : null}
          onClick={(e) => {
            handlePageClick(pageNumber);
          }}
        >
          {pageNumber}
        </button>
      ))}
    </div>)
  );
};

export default Paginate;