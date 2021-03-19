import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  
  import {signIn, signOut} from "../../database/User";
  
  export const login = (username, password) => (dispatch) => {

    console.log("user action login reciebed" , username, password);

    const loginSuccess=signIn(username,  password);
    if(loginSuccess){
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user:{email: username , password:password }},
          });
    }else{
        dispatch({
            type: LOGIN_FAIL,
          });
          const message="User not founded"
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
    }
    
  };
  
  export const logout = () => (dispatch) => {
  
   const response=signOut();
   if(response)
   console.log("user action logging out");
    dispatch({
      type: LOGOUT,
    });
  };


//   export const register = (username, email, password) => (dispatch) => {
//     return AuthService.register(username, email, password).then(
//       (response) => {
//         dispatch({
//           type: REGISTER_SUCCESS,
//         });
  
//         dispatch({
//           type: SET_MESSAGE,
//           payload: response.data.message,
//         });
  
//         return Promise.resolve();
//       },
//       (error) => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
  
//         dispatch({
//           type: REGISTER_FAIL,
//         });
  
//         dispatch({
//           type: SET_MESSAGE,
//           payload: message,
//         });
  
//         return Promise.reject();
//       }
//     );
//   };