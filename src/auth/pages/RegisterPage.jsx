import { Link as RounterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";

const formData = {
  email: "eburgos@gmail.com",
  password: "123456",
  displayName: "Ernesto Burgos",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El mail debe tener una @"],
  password: [
    (value) => value.length > 5,
    "Password debe tener al menos 6 caracteres",
  ],
  displayName: [(value) => value.lenth > 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
  const {
    email,
    password,
    onInputChange,
    displayName,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const isDisplayNameValid = displayName.length > 1;

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre y apellido"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!displayNameValid}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@mail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth type="submit">
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
            <Link component={RounterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
