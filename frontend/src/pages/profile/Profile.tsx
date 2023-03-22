import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import GenericTemplate from "../../components/templates/GenericTemplate";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import ShareIcon from "@mui/icons-material/Share";
import SettingsIcon from "@mui/icons-material/Settings";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FollowList } from "../../components/ui/Profile/FollowList";
import { FollowerList } from "../../components/ui/Profile/FollowerList";
import { useMyPage, useUpdatePrivate } from "../../queries/UserQuery";
import { useCurrentUser } from "../../queries/AuthQuery";
import { NotFoundPage } from "../../components/ui/404NotFound";
import Loading from "../../components/ui/Loading";
import ProfileTab from "./ProfileTab";
import { useFollow, useUnFollow } from "../../queries/FollowQuery";
import { useAuth } from "../../hooks/AuthContext";
import { CODE } from "../../consts/user/Code";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  LineIcon,
  LineShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  // @ts-ignore to ignore the type checking errors on the next line in a TypeScript
} from "react-share";
import LinkIcon from "@mui/icons-material/Link";
import MailIcon from "@mui/icons-material/Mail";
const ProfilePage: React.VFC = () => {
  const [open, setOpen] = useState(false);
  const [followerOpen, setFollowerOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleFollowerOpen = () => setFollowerOpen(true);
  const handleClose = () => setOpen(false);
  const handleFollowerClose = () => setFollowerOpen(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);

  const follow = useFollow();
  const unFollow = useUnFollow();
  const privateSetting = useUpdatePrivate();
  const path = process.env.REACT_APP_IMAGE_DOMAIN;
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  // @ts-ignore to ignore the type checking errors on the next line in a TypeScript
  const { userId } = useParams<number>();

  const { isAuth } = useAuth();
  const url = new URL(window.location.href);

  const { data: User, isLoading, isError, isSuccess } = useMyPage(userId);
  const { data: currentUser } = useCurrentUser();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <NotFoundPage />;
  }
  if (isSuccess) {
    if (User?.isPrivate) {
      return <NotFoundPage />;
    }
  }

  const handleFollow = () => {
    follow.mutate(userId);
  };
  const handleUnFollow = () => {
    unFollow.mutate(userId);
  };

  const shareModalStyle = {
    position: "absolute" as "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    py: 2,
    px: 1,
  };
  const shareModal = (
    <Modal open={openShareModal} onClose={() => setOpenShareModal(false)}>
      <Box sx={shareModalStyle}>
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          <Grid item xs="auto">
            <LineShareButton url={url.href}>
              <LineIcon round={true} size={40} />
              <Typography variant="body2" align="center">
                Line
              </Typography>
            </LineShareButton>
          </Grid>
          <Grid item xs="auto">
            <WhatsappShareButton url={url.href}>
              <WhatsappIcon round={true} size={40} />
              <Typography variant="body2" align="center">
                Whatsapp
              </Typography>
            </WhatsappShareButton>
          </Grid>
          <Grid item xs="auto">
            <FacebookShareButton url={url.href}>
              <FacebookIcon round={true} size={40} />
              <Typography variant="body2" align="center">
                Facebook
              </Typography>
            </FacebookShareButton>
          </Grid>
          <Grid item xs="auto">
            <TwitterShareButton url={url.href}>
              <TwitterIcon round={true} size={40} />
              <Typography variant="body2" align="center">
                Twitter
              </Typography>
            </TwitterShareButton>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="flex-start"
          alignItems="center"
          spacing={3}
          sx={{ mt: 0.1 }}
        >
          <Grid item xs={3}>
            <Box>
              <Box
                sx={{
                  backgroundColor: "silver",
                  width: "38.75px",
                  height: "38.75px",
                  borderRadius: "20px",
                  ml: 3,
                }}
              >
                <LinkIcon
                  sx={{
                    width: "80%",
                    height: "80%",
                    mt: 0.5,
                    ml: 0.5,
                    p: 0.5,
                  }}
                />
              </Box>
              <Typography variant="body2" align="right" sx={{ mt: 0.5 }}>
                コピー
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <a
              href="message:"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Box
                sx={{
                  backgroundColor: "silver",
                  width: "38.75px",
                  height: "38.75px",
                  borderRadius: "20px",
                  ml: 1.5,
                }}
              >
                <MailIcon
                  sx={{
                    width: "80%",
                    height: "80%",
                    mt: 0.5,
                    ml: 0.5,
                    p: 0.5,
                  }}
                />
              </Box>
              <Typography variant="body2" align="center" sx={{ mt: 0.5 }}>
                メール
              </Typography>
            </a>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
  return (
    <>
      <GenericTemplate title="">
        <Container maxWidth="lg" id="wrap">
          <Box
            sx={{
              height: 200,
              mt: 5,
              bgcolor: "#ffffff",
              borderRadius: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4} sx={{ mx: "auto" }}>
                <Grid container spacing={2} sx={{ mx: "auto" }}>
                  <Grid item xs={4} sx={{ mx: "auto" }}>
                    閲覧総数
                  </Grid>
                  <Grid item xs={4} sx={{ mx: "auto" }}>
                    <Button onClick={handleOpen}>フォロー</Button>
                  </Grid>
                  <Grid item xs={4} sx={{ mx: "auto" }}>
                    <Button onClick={handleFollowerOpen}>フォロワー</Button>
                  </Grid>
                </Grid>
                <Grid container sx={{ mx: "auto" }} spacing={2}>
                  <Grid item xs={4}>
                    {User?.totalViewCount}
                  </Grid>
                  <Grid item xs={4}>
                    {User?.followingCount}
                  </Grid>
                  <Grid item xs={4}>
                    {User?.followerCount}
                  </Grid>
                </Grid>
                {/* <Grid container spacing={2} sx={{ mx: "auto" }}>
                  <Grid item xs={12}>
                    {(() => {
                      if (User?.canFollow) {
                        return (
                          <Button variant="outlined" onClick={handleFollow}>
                            フォローする
                          </Button>
                        );
                      } else {
                        return (
                          <Button variant="outlined" onClick={handleUnFollow}>
                            フォロー解除する
                          </Button>
                        );
                      }
                    })()}
                  </Grid>
                </Grid> */}
              </Grid>

              <Grid item xs={4}>
                <Grid
                  container
                  spacing={2}
                  sx={{ alignItems: "center", justify: "center" }}
                >
                  <Grid item xs={12}>
                    {!User?.imagePath ? (
                      <Avatar />
                    ) : (
                      <Avatar src={`${path}${User.imagePath}`} />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    @ {User?.userName}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    {User?.name}
                  </Grid>
                  <Grid item xs={2}>
                    <ShareIcon onClick={() => setOpenShareModal(true)} />
                    {shareModal}
                  </Grid>
                  {isAuth && User?.isOwn ? (
                    <Grid item xs={2}>
                      <SettingsIcon onClick={() => setOpenMenu(true)} />
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {User?.introduce}
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {User?.url}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* <Container>
          <ProfileTab />
        </Container> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              フォロー
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <FollowList />
            </Typography>
          </Box>
        </Modal>
        {/* todo：分ける */}

        <Modal open={openMenu} onClose={() => setOpenMenu(false)}>
          <Box sx={style}>
            <Typography sx={{ border: "dotted", py: 1 }} align="center">
              <Link to="/profile/info">アカウント情報</Link>
            </Typography>
            <Typography
              sx={{ border: "dotted", py: 1, mt: 0.5 }}
              align="center"
            >
              <Link to="/profile/update">プロフィール編集</Link>
            </Typography>
            <Typography
              sx={{ border: "dotted", py: 1, mt: 0.5 }}
              align="center"
            >
              {/* // @ts-ignore to ignore the type checking errors on the next line in a TypeScript */}
              {currentUser?.isPrivate === CODE.IS_PRIVATE ? (
                // @ts-ignore to ignore the type checking errors on the next line in a TypeScript
                <Button variant="outlined" onClick={privateSetting.mutate}>
                  非公開を解除する
                </Button>
              ) : (
                // @ts-ignore to ignore the type checking errors on the next line in a TypeScript
                <Button variant="outlined" onClick={privateSetting.mutate}>
                  非公開にする
                </Button>
              )}
            </Typography>
            <Typography
              sx={{ border: "dotted", py: 1, mt: 0.5 }}
              align="center"
            >
              <Link to="/profile/update/password">パスワード変更</Link>
            </Typography>
          </Box>
        </Modal>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              フォロー
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <FollowList />
            </Typography>
          </Box>
        </Modal>
        <Modal
          open={followerOpen}
          onClose={handleFollowerClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              フォロワー
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <FollowerList />
            </Typography>
          </Box>
        </Modal>
      </GenericTemplate>
    </>
  );
};

export default ProfilePage;
