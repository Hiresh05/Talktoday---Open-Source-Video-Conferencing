import { LOAD_ADMIN,SET_CURRENT_USER, USER_LOADING,ADMIN_LOGIN } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        page : 'login',
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADMIN_LOGIN:
      return{
        
          ...state,
          page: 'admin_login',
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        

      }
    case LOAD_ADMIN:
      return{
        
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      

    }
    default:
      return state;
  }
}
