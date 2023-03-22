import React from "react";
import GenericTemplate from "../../components/templates/GenericTemplate";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLogin } from "../../queries/AuthQuery";
import { Link } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
};

const SingIn: React.VFC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const login = useLogin();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    login.mutate({ email: data.email, password: data.password });
  };
  return (
    <>
      <GenericTemplate title="">
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              ログイン
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="メールアドレス"
                    autoComplete="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span style={{ color: "red" }}>メアド必須</span>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="パスワード"
                    autoComplete="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span style={{ color: "red" }}>パスワード必須</span>
                  )}
                </Grid>
              </Grid>
              <Typography component="p">
                パスワードを忘れた場合は<Link to="/reminder">こちら</Link>
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                ログイン
              </Button>
            </Box>
          </Box>
        </Container>
      </GenericTemplate>
    </>
  );
};

export default SingIn;
