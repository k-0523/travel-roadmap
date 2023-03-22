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
import { useCurrentUser } from "../../queries/AuthQuery";
import { useUpdateUserPassword } from "../../queries/UserQuery";
import { UpdateUserPassword } from "../../types/User";
import Loading from "../../components/ui/Loading";
import { NotFoundPage } from "../../components/ui/404NotFound";
import { Link } from "react-router-dom";

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UpdateUserPassword>();
  const { data: currentUser, isLoading, isError } = useCurrentUser();
  const UpdatePassword = useUpdateUserPassword();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <NotFoundPage />;
  }

  const onSubmit: SubmitHandler<UpdateUserPassword> = (data) => {
    UpdatePassword.mutate(data);
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
              パスワード変更
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
                    id="password"
                    label="現在のパスワード"
                    autoComplete="password"
                    {...register("password", {
                      required: "パスワードを入力してください。",
                    })}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                  />
                </Grid>
              </Grid>
              <Typography component="p">
                パスワードを忘れた場合は<Link to="/reminder">こちら</Link>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="newPassword"
                    label="新しいパスワード"
                    autoComplete="newPassword"
                    {...register("newPassword", {
                      required: "新しいパスワードを入力してください。",
                      minLength: {
                        value: 8,
                        message: "8文字以上入力してください。",
                      },
                      maxLength: {
                        value: 30,
                        message: "30文字以内で入力してください。",
                      },
                    })}
                    error={Boolean(errors.newPassword)}
                    helperText={errors.newPassword?.message}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="newPassword2"
                    label="新しいパスワード確認"
                    autoComplete="newPassword2"
                    {...register("newPassword2", {
                      required: "新しいパスワード確認を入力してください。",
                      validate: (value: any) => {
                        return (
                          value === getValues("newPassword") ||
                          "パスワードが一致しません"
                        );
                      },
                    })}
                    error={Boolean(errors.newPassword2)}
                    helperText={errors.newPassword2?.message}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                更新
              </Button>
            </Box>
          </Box>
        </Container>
      </>
    </GenericTemplate>
  );
};
export default UpdatePassword;
