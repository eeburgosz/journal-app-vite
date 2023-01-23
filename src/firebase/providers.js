import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
   try {
      const result = await signInWithPopup(FirebaseAuth, googleProvider);
      //const credentials = GoogleAuthProvider.credentialFromResult(result);
      //console.log(credentials);
      //const user = result.user;
      //console.log(user);
      const { displayName, email, photoURL, uid } = result.user;
      return {
         ok: true,
         //! user info
         displayName, email, photoURL, uid
      };


   } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      return {
         ok: false,
         //! user info
         errorCode, errorMessage, email, credential
      };
   }
};

export const registerUserWithEmailAndPassword = async ({ email, password, displayName }) => {
   try {
      console.log({ email, password, displayName });
      const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
      const { uid, photoURL } = resp.user;
      //console.log(resp);

      await updateProfile(FirebaseAuth.currentUser, { displayName });
      return { ok: true, uid, photoURL, email, displayName };
   } catch (error) {
      //console.log(error);
      return { ok: false, errorMessage: error.message };
   }
};