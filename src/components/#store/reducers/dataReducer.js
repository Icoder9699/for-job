const initialState = {
   items: [],
   isLoading: false
}

export const SET_ITEMS = "SET_ITEMS"
export const REMOVE_ITEMS = "REMOVE_ITEMS"
export const SET_LOADING = 'SET_LOADING'

export default function dataReducer (state = initialState, action){
   switch(action.type){
      case SET_ITEMS: return{
         ...state, items: action.payload
      }
      case REMOVE_ITEMS: return {
         ...state, items: []
      }
      case SET_LOADING: return {
         ...state, isLoading: action.payload
      }
      default: return state
   }
}