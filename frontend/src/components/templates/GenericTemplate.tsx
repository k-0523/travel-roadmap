import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { useLogout, useCurrentUser } from "../../queries/AuthQuery";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useAuth } from "../../hooks/AuthContext";
import Search from "./Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PersonIcon from "@mui/icons-material/Person";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "../../style/Search.css";
import Button from '@mui/material/Button';
import { Notifications } from "../../pages/notification/Notifications";
export interface GenericTemplateProps {
  children: React.ReactNode;
  title: string;
}

const GenericTemplate: React.FC<GenericTemplateProps> = ({
  children,
  title,
}) => {
  const logout = useLogout();
  const { isAuth, setIsAuth } = useAuth();
  const navigate = useNavigate();
  const [openNotification, setOpenNotification] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [dotCheck, setDotCheck] = useState(false);

  // @ts-ignore to ignore the type checking errors on the next line in a TypeScript
  const { isLoading, data: authUser, isError } = useCurrentUser();

  // TODO: 別コンポーネント化
  const normalNav = (
    <>
      <Button variant="outlined" component={Link} to="/signup" sx={{ mr: 1 }}>
        会員登録
      </Button>
      <Button variant="outlined" component={Link} to="/login">
        ログイン
      </Button>
    </>
  );

  const menuModalStyle = {
    position: "absolute" as "absolute",
    top: "50px",
    right: "0px",
    width: 350,
    bgcolor: "background.paper",
    py: 2,
    px: 1,
  };

  const menuModal = (
    <Modal open={openMenu} onClose={() => setOpenMenu(false)}>
      <Box sx={menuModalStyle}>
        <Typography
          sx={{ border: "dotted", py: 1, cursor: "pointer" }}
          align="center"
          onClick={() => navigate({ pathname: "/view-history/list" })}
        >
          閲覧履歴
        </Typography>
        <Typography
          sx={{ border: "dotted", py: 1, mt: 0.5, cursor: "pointer" }}
          align="center"
        >
          お問い合わせ
        </Typography>
        <Typography
          sx={{ border: "dotted", py: 1, mt: 0.5, cursor: "pointer" }}
          align="center"
          onClick={() => logout.mutate()}
        >
          ログアウト
        </Typography>
      </Box>
    </Modal>
  );

  const theme = createTheme({
    palette: {
      background: {
        default: "#f5f5f5",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ backgroundColor: "white" }}>
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={isAuth ? { flexGrow: 0.3 } : { flexGrow: 1 }}
              >
                <Link to="/">
                  <ImageListItem sx={{ width: "180px" }}>
                    {/* <img src={Logo} /> */}
                  </ImageListItem>
                </Link>
              </Typography>
              {isAuth ? (
                <>
                  <Search />
                  <Button variant="outlined" component={Link} to="/content-detail/create">
                    投稿する
                  </Button>
                  <Box sx={{ mx: 1, cursor: "pointer" }}>
                    <NewspaperIcon
                      fontSize="large"
                      sx={{ color: "black" }}
                      onClick={() => navigate({ pathname: "/content/list" })}
                    />
                  </Box>
                  <Box sx={{ mx: 1, cursor: "pointer" }}>
                    {dotCheck ? (
                      <Badge color="secondary" badgeContent=" " variant="dot">
                        <NotificationsNoneIcon
                          fontSize="large"
                          sx={{ color: "black", mb: 0.5 }}
                          onClick={() => setOpenNotification(true)}
                        />
                      </Badge>
                    ) : (
                      <NotificationsNoneIcon
                        fontSize="large"
                        sx={{ color: "black", mb: 0.5 }}
                        onClick={() => setOpenNotification(true)}
                      />
                    )}
                  </Box>
                  <Box sx={{ mx: 1, cursor: "pointer" }}>
                    <Link to={`/profile/${authUser?.userId}`}>
                      <PersonIcon fontSize="large" sx={{ color: "black" }} />
                    </Link>
                  </Box>
                  <Box sx={{ mx: 1, cursor: "pointer" }}>
                    <MenuIcon
                      fontSize="large"
                      sx={{ color: "black" }}
                      onClick={() => setOpenMenu(true)}
                    />
                  </Box>
                  {menuModal}
                  <Notifications
                    open={openNotification}
                    closeState={setOpenNotification}
                    dotCheckState={setDotCheck}
                  />
                </>
              ) : (
                normalNav
              )}
            </Toolbar>
          </AppBar>
        </Box>
        {title}
        {children}
      </ThemeProvider>
    </>
  );
};

export default GenericTemplate;
