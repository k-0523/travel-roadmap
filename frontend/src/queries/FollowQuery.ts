import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as api from "../api/FollowAPI";
import { KEY } from "../consts/follow/QueryKey";
import { KEY as UKEY } from "../consts/user/QueryKey";

import { AxiosError } from "axios";

const useFollow = () => {
  const queryClient = useQueryClient();

  return useMutation(api.Follow, {
    onSuccess: () => {
      toast.success("フォローしました。");
      queryClient.invalidateQueries(UKEY.PROFILE);
      queryClient.invalidateQueries(KEY.FollowUsers);
      queryClient.invalidateQueries(KEY.Follower);
    },
    onError: (error: AxiosError) => {
      console.log(error);
      toast.error("フォローできませんでした。");
    },
  });
};

const useUnFollow = () => {
  const queryClient = useQueryClient();

  return useMutation(api.UnFollow, {
    onSuccess: () => {
      toast.success("フォロー解除しました。");
      queryClient.invalidateQueries(UKEY.PROFILE);
      queryClient.invalidateQueries(KEY.FollowUsers);
      queryClient.invalidateQueries(KEY.Follower);
    },
    onError: (error: AxiosError) => {
      console.log(error);
      toast.error("フォロー解除できませんでした。");
    },
  });
};

const useFollowUsers = (userId: number) => {
  return useQuery([KEY.FollowUsers, userId], () => api.GetFollowUsers(userId));
};
const useFollower = (userId: number) => {
  return useQuery([KEY.Follower, userId], () => api.GetFollower(userId));
};

export { useFollow, useFollowUsers, useFollower, useUnFollow };
