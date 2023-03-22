import React, { useState } from "react";
import GenericTemplate from "../../components/templates/GenericTemplate";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCreateTmpUser } from "../../queries/UserQuery";
import { useForm, SubmitHandler } from "react-hook-form";
const theme = createTheme();

type FormData = {
  email: string;
  password: string;
};

const SignUp: React.VFC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isSended, setSendedFlag] = useState<boolean>(false);
  const createTmpUser = useCreateTmpUser();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    createTmpUser.mutate(data);
    setSendedFlag(true);
  };
  return (
    <>
      <GenericTemplate title="">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                会員登録
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
                      fullWidth
                      id="email"
                      label="メールアドレス"
                      autoComplete="email"
                      {...register("email", {
                        required: "メールアドレスを入力してください。",
                      })}
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="password"
                      label="パスワード"
                      autoComplete="password"
                      {...register("password", {
                        required: "パスワードを入力してください。",
                        minLength: {
                          value: 8,
                          message: "8文字以上入力してください。",
                        },
                        maxLength: {
                          value: 30,
                          message: "30文字以内で入力してください。",
                        },
                      })}
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  認証メールを送信
                </Button>
              </Box>
            </Box>
          </Container>
      </GenericTemplate>
    </>
  );
};

export default SignUp;
