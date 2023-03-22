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
import { useUpdatePasswordRemind } from "../../queries/UserQuery";
import { PasswordRemind, UpdatePasswordRemind } from "../../types/User";
import { useParams } from "react-router-dom";

const PasswordConfirm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<PasswordRemind>();
  const UpdatePasswordRemind = useUpdatePasswordRemind();
  const { uuId } = useParams();
	const onSubmit: SubmitHandler<UpdatePasswordRemind> = (data) => {
    // @ts-ignore to ignore the type checking errors on the next line in a TypeScript
    data.token = uuId;
    UpdatePasswordRemind.mutate(data);
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
              パスワード入力
            </Typography>
            <Box
              component="form"
              noValidate
              // @ts-ignore to ignore the type checking errors on the next line in a TypeScript
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
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
                設定する
              </Button>
            </Box>
          </Box>
        </Container>
      </>
    </GenericTemplate>
  );
};
export default PasswordConfirm;
