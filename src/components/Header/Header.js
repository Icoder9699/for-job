import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
   const isLogged = useSelector(store => store.auth.token)
   let links  = [
      'Login',
   ]

   if(isLogged){
      links = [
         'Products',
         'Search',
         'Logout'
      ]
   }else{
      links = ['Login']
   }

   return (
      <header>
         <nav>
            {
               links.map((link, index) => (
                  <NavLink 
                     activeClassName={'active'}
                     key={link + index} 
                     to={link === '/' ? '/' : link.toLocaleLowerCase()}
                  >
                     {link}
                  </NavLink>
               ))
            }
         </nav>
      </header>
   )
}
