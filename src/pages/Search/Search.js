import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Items from '../../components/Items/Items';

import './index.css';
export default function Search() {
   const [value, setValue] = useState("")
   const [items, setItems] = useState([])
   const posts = useSelector(store => store.data.items)
   const isLoading = useSelector(store => store.data.isLoading)

   const newPosts = [];
   const onChangeHandler = (e) => {
      setValue(e.target.value);
      posts.forEach(post => {
         const postName = post.name.toLowerCase()
         if(postName.indexOf(value) > -1){
            newPosts.push(post);
         }
      })
      // ! sorting
      setItems(newPosts.sort((a, b) => a.name > b.name ? 1 : -1))
   }

   function clear(){
      setValue('')
   }

   return (
      <div className="search">
         <h1>Search</h1>
         <div className="search-row">
            <input onChange={e =>  onChangeHandler(e)} value={value}/>
            <button disabled={value.length === 0} onClick={() => clear()}>Clear</button>
         </div>
         {
            isLoading ? <h3>Loading...</h3> : <Items items={items}/>
         }
      </div>
   )
}
