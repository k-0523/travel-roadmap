import * as React from "react";
import { useParams, Link } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {
  useFollow,
  useFollower,
  useUnFollow,
} from "../../../queries/FollowQuery";
import { Follower, FollowUser } from "../../../types/Follow";
import Loading from "../Loading";
import { useAuth } from "../../../hooks/AuthContext";
import { useMyPage } from "../../../queries/UserQuery";
import { useCurrentUser } from "../../../queries/AuthQuery";

export const FollowerList = () => {
  const { userId } = useParams();
  const { isAuth } = useAuth();
  const follow = useFollow();
  const unFollow = useUnFollow();
  const { data: User } = useMyPage(Number(userId));
  const { data: currenUser } = useCurrentUser();
  const path = process.env.REACT_APP_IMAGE_DOMAIN;
  const { data: Users, status, isError } = useFollower(Number(userId));
  if (status === "loading") return <Loading />;

  if (!Users) return <>フォロワーが存在しません</>;
  const handleFollow = (userId: number) => {
    follow.mutate(Number(userId));
  };
  const handleUnFollow = (userId: number) => {
    unFollow.mutate(Number(userId));
  };
  return (
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
      {Users.map((user: Follower) => {
        const labelId = `checkbox-list-secondary-label-${user.userId}`;
        const userId = user.userId;
        const followUserId = user.followUserId;
        const followerUserId = user.followerUserId;
        const imagePath = user.imagePath;
        const userName = user.userName ?? "未設定";

        return (
          <ListItem
            key={userId}
            secondaryAction={(() => {
              if (isAuth) {
                if (currenUser?.userId === followUserId) {
                  return <></>;
                } else if (user.isFollowingCount >= 1) {
                  return (
                    <Button
                      variant="outlined"
                      onClick={() => handleUnFollow(followUserId)}
                    >
                      フォロー解除
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      variant="outlined"
                      onClick={() => handleFollow(followUserId)}
                    >
                      フォロー
                    </Button>
                  );
                }
              } else {
                return <Button disabled>フォロー</Button>;
              }
            })()}
            disablePadding
          >
            <ListItemButton component={Link} to={`/profile/${followUserId}`}>
              <ListItemAvatar>
                {!imagePath ? (
                  <Avatar />
                ) : (
                  <Avatar src={`${path}${imagePath}`} />
                )}
              </ListItemAvatar>
              <ListItemText id={labelId} primary={userName} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
