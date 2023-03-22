import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

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
  useFollowUsers,
  useUnFollow,
} from "../../../queries/FollowQuery";
import { FollowUser } from "../../../types/Follow";
import Loading from "../Loading";
import { useAuth } from "../../../hooks/AuthContext";
import { useMyPage } from "../../../queries/UserQuery";
import { useCurrentUser } from "../../../queries/AuthQuery";

export const FollowList = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const follow = useFollow();
  const unFollow = useUnFollow();
  const { isAuth } = useAuth();
  const path = process.env.REACT_APP_IMAGE_DOMAIN;

  const [checked, setChecked] = React.useState([1]);
	const { data: currenUser } = useCurrentUser();
  const { data: Users, status, isError } = useFollowUsers(Number(userId));
  const { data: User } = useMyPage(Number(userId));

  if (status === "loading") return <Loading />;

  if (!Users) return <>フォローユーザーが存在しません</>;
  const handleAction = (userId: number) => {
    navigate(`/profile/${userId}`);
  };
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
      {Users.map((user: FollowUser) => {
        const userId = user.userId;
        const labelId = `checkbox-list-secondary-label-${user.userId}`;
        const followUserId = user.followUserId;
        const followerUserId = user.followerUserId;
        const userName = user.userName ?? "未設定";
        const imagePath = user.imagePath;
        return (
          <ListItem
            disablePadding
            key={user.userId}
            secondaryAction={(() => {
              if (isAuth) {
                // if (user.isFollowingCount === 0) {
                if (currenUser?.userId === userId) {
                  return <></>;
                } else if (user.isFollowingCount === 0) {
                  return (
                    <Button
                      variant="outlined"
                      onClick={() => handleFollow(followerUserId)}
                    >
                      {/* todo: url定数化 */}
                      フォロー
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      variant="outlined"
                      onClick={() => handleUnFollow(followerUserId)}
                    >
                      フォロー解除
                    </Button>
                  );
                }
              } else {
                return <Button disabled>フォロー</Button>;
              }
            })()}
          >
            <ListItemButton
              onClick={() => handleAction(followerUserId)}
              component={Link}
              to={`/profile/${followerUserId}`}
            >
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
