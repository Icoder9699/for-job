import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router'
import { loginLogout } from '../#store/actions/auth';

export default function Logout() {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(loginLogout())// eslint-disable-next-line
   }, []);

   return (
      <Redirect to={'/'} />
   )
}
