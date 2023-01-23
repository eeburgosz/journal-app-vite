
import { registerUserWithEmailAndPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./";

export const checkingAuthentication = (email, password) => {
   return async (dispatch) => {
      dispatch(checkingCredentials());
   };
};
export const startGoogleSignIn = () => {
   return async (dispatch) => {
      dispatch(checkingCredentials());
      const result = await signInWithGoogle();
      //console.log({ result });
      if (!result.ok) return dispatch(logout(result.errorMessage));

      dispatch(login(result));
   };
};

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
   return async (dispatch) => {
      dispatch(checkingCredentials());
      const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailAndPassword({ email, password, displayName });
      if (!ok) return dispatch(logout({ errorMessage }));
      dispatch(login({ uid, displayName, email, photoURL }));
   };
};