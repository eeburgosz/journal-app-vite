import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
   name: "journal",
   initialState: {
      isSaving: false,
      messageSaved: "",
      notes: [],
      active: null,
      /* active: {
         id: "ABC123",
         title: "",
         body: "",
         date: 1234567,
         imageUrls: [] // https://foto1.jpg, https://foto2.jpg, ...
      } */
   },
   reducers: {
      //!   Siempre cosas síncronas

      savingNewNote: (state) => {
         state.isSaving = true;
      },
      addNewEmptyNote: (state, action) => {
         state.notes.push(action.payload);
         state.isSaving = false;
      },
      setActiveNote: (state, action) => {
         state.active = action.payload;
      },
      setNotes: (state, action) => {
         state.notes = action.payload;
      },
      setSaving: (state) => {
         state.isSaving = true;
         //TODO: Mensaje de error...
      },
      noteUpdated: (state, action) => {
         state.isSaving = false;
         state.notes = state.notes.map(note => {
            if (note.id === action.payload.id) {
               return action.payload;
            }
            return note;
         });
         //TODO: Mostrar mensaje de actualización
      },
      deleteNoteById: (state, action) => {

      },
   }
});

export const {
   savingNewNote,
   addNewEmptyNote,
   setActiveNote,
   setNotes,
   setSaving,
   noteUpdated,
   deleteNoteById,
} = journalSlice.actions;