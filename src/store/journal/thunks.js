import { async } from "@firebase/util";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice";

export const startNewNote = () => {
   return async (dispatch, getState) => {

      dispatch(savingNewNote());

      //console.log(getState());
      const { uid } = getState().auth;

      //uid para almacenar en usuario
      const newNote = {
         title: "",
         body: "",
         date: new Date().getTime(),
      };

      const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notas`));   //! puse "notas" en la DB de Firebase
      //const setDocResp = await setDoc(newDoc, newNote);
      //console.log({ newDoc, setDocResp });
      await setDoc(newDoc, newNote);

      newNote.id = newDoc.id;

      //! dispatch      
      // dispatch( newNote )
      dispatch(addNewEmptyNote(newNote));
      // dispatch( setActiveNote )
      dispatch(setActiveNote(newNote));
   };
};

export const startLoadingNotes = (uid) => {
   return async (dispatch, getState) => {
      const { uid } = getState().auth;
      //console.log({ uid });
      const notes = await loadNotes(uid);
      dispatch(setNotes(notes));
   };
};