import { LOGIN_LOGOUT, LOGIN_SUCCESS } from "../reducers/authReducer";

export function loginSucces(token){
   return {
      type: LOGIN_SUCCESS,
      payload: token
   }
}

export function loginLogout(){
   localStorage.removeItem('token');
   localStorage.removeItem('subdomain');
   return{
      type: LOGIN_LOGOUT
   }
}

export function autoLogin() {
   return (dispatch) => {
      const token = localStorage.getItem('token')
      if (!token) {
         dispatch(loginLogout())
      } else {
         dispatch(loginSucces(token))
      }
   }
 }