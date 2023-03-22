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
import { UpdateUserPassword, User } from "../../types/User";
import Loading from "../../components/ui/Loading";
import { NotFoundPage } from "../../components/ui/404NotFound";
import { Link } from "react-router-dom";

const ProfileInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UpdateUserPassword>();
  const { data: currentUser, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <NotFoundPage />;
  }

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
              アカウント情報
            </Typography>
            <Grid container>
              <Grid item xs={12}></Grid>
              <Grid container>
                <Grid item xs={6}>
                  作成日
                </Grid>
                <Grid item xs={6}>
                  {currentUser?.createdAt}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    ユーザー名
                  </Grid>
                  <Grid item xs={6}>
                    <Link to="/profile/update/username">
                      {!currentUser?.userName
                        ? "未設定"
                        : currentUser?.userName}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    メールアドレス
                  </Grid>
                  <Grid item xs={6}>
                    <Link to="/profile/update/email">{currentUser?.email}</Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </>
    </GenericTemplate>
  );
};
export default ProfileInfo;
