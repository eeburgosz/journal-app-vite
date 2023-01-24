import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const startNewNote = () => {
   return async (dispatch, getState) => {
      //console.log(getState());
      const { uid } = getState().auth;

      //uid para almacenar en usuario
      const newNote = {
         title: "",
         body: "",
         date: new Date().getTime(),
      };

      const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notas`));   //! puse "notas" en la DB de Firebase
      const setDocResp = await setDoc(newDoc, newNote);

      console.log({ newDoc, setDocResp });

      //! dispatch
      // dispatch( newNote )
      // dispatch( activarNote )
   };
};