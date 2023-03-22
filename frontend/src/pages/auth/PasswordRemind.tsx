import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { SubmitHandler, useForm } from "react-hook-form";
import GenericTemplate from "../../components/templates/GenericTemplate";
import { useReminder } from "../../queries/UserQuery";
import { Remind } from "../../types/User";

const PasswordRemind = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Remind>();
  type FormData = {
    email: string;
  };
  const remider = useReminder();

  const onSubmit: SubmitHandler<Remind> = (data) => {
    remider.mutate(data);
  };
  return (
    <GenericTemplate title="">
      <>
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
              パスワード再設定
            </Typography>
            <Typography component="p">
              ご登録されているメールアドレスを入力してください。メールアドレス宛にパスワード再設定メールを送信します。
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  メールアドレス
                </Grid>
              </Grid>
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                送信
              </Button>
            </Box>
          </Box>
        </Container>
      </>
    </GenericTemplate>
  );
};
export default PasswordRemind;
