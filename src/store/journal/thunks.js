
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, noteUpdated, savingNewNote, setActiveNote, setNotes, setSaving } from "./journalSlice";

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

export const startSavingNote = () => {
   return async (dispatch, getState) => {

      dispatch(setSaving());

      const { uid } = getState().auth;
      const { active: note } = getState().journal;
      //! La nota (note) trae el ID de la nota, pero necesito removerlo porque si mando a grabar la nota así como está, Firebase va a crear ese ID otra vez
      const noteToFirestore = { ...note };
      delete noteToFirestore.id;
      //console.log(noteToFirestore);
      //!--
      const docRef = doc(FirebaseDB, `${uid}/journal/notas/${note.id}`);
      await setDoc(docRef, noteToFirestore, { merge: true }); //!  Tercer parámentro "setOptions" -> merge:true sirve por si hay campos que estoy mandando en "noteToFirebase" que no existen en la DB, los campos que están en DB se mantienen
      dispatch(noteUpdated(note));
   };
};