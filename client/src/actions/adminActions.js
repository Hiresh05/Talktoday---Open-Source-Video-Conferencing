import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { LOAD_ADMIN,GET_ERRORS, SET_CURRENT_USER, USER_LOADING ,ADMIN_LOGIN} from "./types";
import {loadAdmin} from './authActions'
export const activateUser = (data) => dispatch =>
{
axios
    .post("/api/users/activateUser", data)
    .then(res => loadAdmin())
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const inactivateUser = (data) => dispatch =>
{
axios
    .post("/api/users/inactivateUser", data)
    .then(res => {
      loadAdmin()
      console.log(data)    
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};