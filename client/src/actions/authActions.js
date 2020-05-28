import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { LOAD_ADMIN,GET_ERRORS, SET_CURRENT_USER, USER_LOADING ,ADMIN_LOGIN} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("type",'login')
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const loadAdmin = () => dispatch =>{
  let dat= []
    axios.get('/api/users/list').then(e => { 
       console.log("This Data",e);
       dispatch(LoadAdmin(e.data))
       }).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
      );
  

}
export const loginAdmin = userData => dispatch => {
  axios
    .post("/api/users/admin", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      console.log(res)
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("type",'admin')
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setAdmin(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
export const LoadAdmin = (data) => {
  return{
    type: LOAD_ADMIN,
    payload : data
  }
}
export const setAdmin = (decoded) => {
  return {
    type: ADMIN_LOGIN,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const logoutAdmin = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setAdmin({}));
};
export const fetchData = () => dispatch =>{
  axios.post('api/users/admin')
  .then(data =>{})
}