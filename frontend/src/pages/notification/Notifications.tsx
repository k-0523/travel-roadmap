import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  useNotifications,
  useReadNotification,
} from "../../queries/NotificationQuery";
import Loading from "../../components/ui/Loading";
import { Notification } from "../../types/Notification";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const notificationModalStyle = {
  position: "absolute" as "absolute",
  top: "50px",
  right: "10px",
  width: 350,
  maxHeight: 805,
  overflow: "auto",
  bgcolor: "background.paper",
  py: 2,
  px: 1,
};
type ModalProps = {
  open: boolean;
  //   dot: boolean;
  closeState: any;
  dotCheckState: any;
};
export const Notifications = (props: ModalProps) => {
  const readNotification = useReadNotification();
  const {
    data: notifications,
    isLoading,
    isError,
    isSuccess,
  } = useNotifications();
  if (isLoading) {
    <Loading />;
  } else if (isSuccess) {
    if (notifications) {
      props.dotCheckState(true);
    }
  }

  const handleRead = (id: number) => {
    readNotification.mutate(id);
    props.closeState(false);
  };
  return (
    <>
      <Modal open={props.open} onClose={() => props.closeState(false)}>
        <Box sx={notificationModalStyle}>
          <List
            dense
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
            }}
          >
            {!notifications ? (
              <ListItem>
                <ListItemText primary={`未読の通知はありません。`} />
              </ListItem>
            ) : (
              <>
                {/*// @ts-ignore to ignore the type checking errors on the next line in a TypeScript */}
                {notifications.map((notification: Notification) => {
                  const id = notification.notificationId;
                  const visiterId = notification.visiterId;
                  const userName = notification.userName;

                  return (
                    <ListItem disablePadding key={id}>
                      <ListItemButton
                        onClick={() => handleRead(id)}
                        component={Link}
                        to={`/profile/${visiterId}`}
                      >
                        {!userName ? (
                          <ListItemText
                            // @ts-ignore to ignore the type checking errors on the next line in a TypeScript
                            id={id}
                            primary={`ユーザー名未設定 さんにフォローされました。`}
                          />
                        ) : (
                          <ListItemText
                            // @ts-ignore to ignore the type checking errors on the next line in a TypeScript
                            id={id}
                            primary={`${userName} さんにフォローされました。`}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </>
            )}
          </List>
        </Box>
      </Modal>
    </>
  );
};
