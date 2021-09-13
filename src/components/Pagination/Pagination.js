import React from 'react'

export default function Pagination({postsPerPage, totalPosts, paginate, currentPage}) {  
   const pageNumbers = [];

   for(let i=1; i <= Math.ceil(totalPosts / postsPerPage); i++){
      pageNumbers.push(i);
   };

   return (
      <nav>
         <ul className="pagination">
            {
               pageNumbers.map(number => (
                  <li 
                     onClick={() => paginate(number)} 
                     key={number} 
                     className={number === currentPage ? "active" : ""}
                  >
                     <a href="#"> 
                        {number}
                     </a>
                  </li>
               ))
            }
         </ul>
      </nav>
   )
}
