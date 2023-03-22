import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { SubmitHandler, useForm } from "react-hook-form";
import GenericTemplate from "../../components/templates/GenericTemplate";
import { useCurrentUser } from "../../queries/AuthQuery";
import { useMyPage, useUpdateUserProfile } from "../../queries/UserQuery";
import { UpdateUserProfile } from "../../types/User";
import Loading from "../../components/ui/Loading";
import { NotFoundPage } from "../../components/ui/404NotFound";
import { usePostImage2 } from "../../queries/FileQuery";
import ImageListItem from "@mui/material/ImageListItem";
// @ts-ignore to ignore the type checking errors on the next line in a TypeScript
import Resizer from "react-image-file-resizer";
import { postImage2 } from "../../api/FileAPI";

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserProfile>();
  const { data: currentUser, isLoading, isError } = useCurrentUser();
  const updateProfile = useUpdateUserProfile();
  const [imagePath, setImagePath] = useState<string>("");
  const [signedUrl, setSignedUrl] = useState<string>("");

  const {
    data: mypage,
    isLoading: mypageLoading,
    isError: mypageError,
  } = useMyPage(Number(currentUser?.userId));

  if (mypageLoading) {
    return <Loading />;
  }
  if (mypageError) {
    return <NotFoundPage />;
  }

	const onSubmit: SubmitHandler<UpdateUserProfile> = (data) => {
	  data.imagePath = imagePath
    updateProfile.mutate(data);
  };
  const resizeFile = (file: any) =>
    new Promise((resolve: any) => {
      Resizer.imageFileResizer(
        file,
        520,
        340,
        "PNG",
        100,
        0,
        (uri: any) => {
          resolve(uri);
        },
        "file"
      );
    });
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imageFile = e.target.files[0];
    const image = await resizeFile(imageFile);
    const { filePath, signedUrl } = await postImage2(image);

    setImagePath(filePath);
    setSignedUrl(signedUrl);
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
              プロフィール更新
            </Typography>
            <Typography variant="subtitle1">プロフィール画像</Typography>
            <label htmlFor="upload-thumbnail-button">
              <Input
                id="upload-thumbnail-button"
                // @ts-ignore to ignore the type checking errors on the next line in a TypeScript
                accept="image/*"
                multiple
                type="file"
                style={{ display: "none" }}
                // value={imagePath}
                // @ts-ignore to ignore the type checking errors on the next line in a TypeScript
                onChange={(e) => handleImage(e)}
                // {...register("imagePath")}
              />
              {!signedUrl ? (
                <Button
                  variant="outlined"
                  color="inherit"
                  component="span"
                  fullWidth
                  //   sx={{ height: "160px", width: "30%" }}
                >
                  画像添付
                </Button>
              ) : (
                <ImageListItem
                  sx={{
                    p: 0.5,
                    pb: 2,
                    width: "30%",
                    height: "160px",
                    objectFit: "cover",
                  }}
                >
                  <img src={signedUrl} alt="プロフィール" />
                </ImageListItem>
              )}
            </label>
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
                    id="name"
                    label="名前"
                    autoComplete="name"
                    defaultValue={mypage?.name}
                    {...register("name")}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="introduce"
                    label="自己紹介"
                    autoComplete="introduce"
                    multiline
                    defaultValue={mypage?.introduce}
                    {...register("introduce")}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="url"
                    label="Webサイト"
                    autoComplete="url"
                    defaultValue={mypage?.url}
                    {...register("url")}
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
export default UpdateProfile;
