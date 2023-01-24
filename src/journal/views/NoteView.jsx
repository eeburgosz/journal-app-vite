import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startSavingNote } from "../../store/journal";
import { ImageGallery } from "../components";

export const NoteView = () => {
  const dispatch = useDispatch();

  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const { body, title, onInputChange, formState, date } = useForm(note);

  //! useMemo para la fecha---------------------------------------------
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);
  //! ------------------------------------------------------------------

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="ligth">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{ p: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          variant="filled"
          type="text"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Qué sucedió hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      {/* Galería de imágenes */}
      <ImageGallery />
    </Grid>
  );
};
