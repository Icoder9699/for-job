import React, { useEffect, useState } from 'react'
import './index.css';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'

import Items from '../../components/Items/Items';
import Pagination from '../../components/Pagination/Pagination';
import {fetchItems} from '../../components/#store/actions/data';

export default function Products() {
   const isLoading = useSelector(store => store.data.isLoading)
   const posts = useSelector(store => store.data.items)
   const [currentPage, setCurrentPage] = useState(1)
   const [postsPerPage] = useState(5)
   const dispatch = useDispatch()
 
   useEffect(() => {
      dispatch(fetchItems()) // eslint-disable-next-line
   }, [])

   // ! get current items 
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

   // ! sahifani o'zgartirish uchun
   function paginate(number){
      setCurrentPage(number)
   }

   return (
      <div className="products">
         <div className="products-absolute">
            <h2>Products Page</h2>
            <h3>Page: {currentPage}</h3>
         </div>
         {
            isLoading ? <h2 className="products-loading">Loading...</h2> : <Items items={currentPosts}/>
         }
         <Pagination postsPerPage={postsPerPage} currentPage={currentPage} totalPosts={posts.length} paginate={paginate}/>
      </div>
   )
}
