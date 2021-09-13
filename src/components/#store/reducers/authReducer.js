const initialState = {
   token: null
};

// constants 
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOGOUT = "LOGIN_LOGOUT";


export default function authReducer(state=initialState, action){
   switch(action.type){
      case LOGIN_SUCCESS: return {...state, token: action.payload}
      case LOGIN_LOGOUT:  return {...state, token: null}
      default: return state
   }
};