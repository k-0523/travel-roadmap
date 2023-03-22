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
import { useUpdateUserName } from "../../queries/UserQuery";
import Loading from "../../components/ui/Loading";
import { NotFoundPage } from "../../components/ui/404NotFound";

const UpdateUserNamePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();
  type FormData = {
    userName: string;
  };
  const { data: currentUser, isLoading, isError } = useCurrentUser();
  const updateUserName = useUpdateUserName();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <NotFoundPage />;
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    updateUserName.mutate(data);
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
                  現在のユーザー名
                </Grid>
                <Grid item xs={12}>
                  {!currentUser?.userName ? "未設定" : currentUser?.userName}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="newPassword"
                    label="新しいユーザー名"
                    autoComplete="userName"
                    {...register("userName", {
                      required: "新しいユーザー名を入力してください。",
                    })}
                    error={Boolean(errors.userName)}
                    helperText={errors.userName?.message}
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
export default UpdateUserNamePage;
