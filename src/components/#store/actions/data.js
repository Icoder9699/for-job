import axios from "axios"
import { SET_ITEMS, REMOVE_ITEMS, SET_LOADING } from "../reducers/dataReducer"

export function fetchItems(){
   return dispatch => {
      console.log('fetching...');
      dispatch(setLoading(true))
      const subdomain = localStorage.getItem('subdomain')
      const token = localStorage.getItem('token')
      axios.post(`https://${subdomain}.ox-sys.com/variations`,
         {
         "size": 20,
         "page": 3,
         "stock": {
               "exist": true,
               "location": [
                  42
               ]
         },
         },
         {
         headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
         }
         }
      )
      .then(resp => dispatch(setItemsAction(resp.data.items)))
      .finally(() => dispatch(setLoading(false)))
   }
}

export function setItemsAction(payload){
   return{
      type: SET_ITEMS,
      payload
   }
}

export function setLoading(payload){
   return{
      type: SET_LOADING,
      payload
   }
}

export function removeItemsAction(){
   return{
      type: REMOVE_ITEMS,
   }
}