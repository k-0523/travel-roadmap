import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as api from "../api/UserAPI";
import { KEY } from "../consts/user/QueryKey";
import * as AUTHKEY from "../consts/auth/QueryKey";
import * as UserType from "../types/User";

const useCreateTmpUser = () => {
  return useMutation(api.createTmpUser, {
    onSuccess: () => {
      toast.success("認証メールを送信しました。");
    },
    onError: (error: AxiosError) => {
      toast.error("入力されたメールアドレスは使用できませんんんん");
    },
  });
};

const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(api.UpdateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(AUTHKEY.KEY.USER);
      queryClient.invalidateQueries(KEY.PROFILE);
      toast.success("更新しました。");
    },
    onError: (error: AxiosError) => {
      console.log(error);
      toast.error("更新できませんでした。");
    },
  });
};

const useUpdateUserPassword = () => {
  return useMutation(api.UpdatePassword, {
    onSuccess: () => {
      toast.success("更新しました。");
    },
    onError: (error: AxiosError) => {
      console.log(error);
      toast.error("更新できませんでした。");
    },
  });
};
const useUpdatePasswordRemind = () => {
  return useMutation(api.UpdatePasswordRemind, {
    onSuccess: () => {
      toast.success("更新しました。");
    },
    onError: (error: AxiosError) => {
      console.log(error);
      toast.error("更新できませんでした。");
    },
  });
};
const useReminder = () => {
  return useMutation(api.Reminder, {
    onSuccess: () => {
      toast.success("送信しました。");
    },
    onError: (error: AxiosError) => {
      toast.success("送信しました。");
    },
  });
};

const useUpdateUserName = () => {
  const queryClient = useQueryClient();

  return useMutation(api.UpdateUserName, {
    onSuccess: () => {
      toast.success("更新しました。");
      queryClient.invalidateQueries(AUTHKEY.KEY.USER);
      queryClient.invalidateQueries(KEY.PROFILE);
    },
    onError: (error: AxiosError) => {
      console.log(error);
      if (error.response!.status === 422) {
        toast.error("入力されたユーザー名は使用できません");
      } else {
        toast.error("更新できませんでした。");
      }
    },
  });
};

const useUpdateEmail = () => {
  return useMutation(api.UpdateEmail, {
    onSuccess: () => {
      toast.success("認証メールを送信しました。");
    },
    onError: (error: AxiosError) => {
      console.log(error);
      if (error.response!.status === 422) {
        toast.error("入力されたメールアドレスは使用できません");
      } else {
        toast.error("更新できませんでした。");
      }
    },
  });
};
const useUpdatePrivate = () => {
  const queryClient = useQueryClient();

  return useMutation(api.UpdatePrivate, {
    onSuccess: () => {
      toast.success("更新しました。");
      queryClient.invalidateQueries(AUTHKEY.KEY.USER);
      queryClient.invalidateQueries(KEY.PROFILE);
    },
    onError: (error: AxiosError) => {
      console.log(error);
      toast.error("更新できませんでした。");
    },
  });
};

const useMyPage = (userId: number) => {
  return useQuery<UserType.MyPage>(
    [KEY.PROFILE, userId],
    () => api.getProfileInfo(userId),
    {
      onSuccess: () => {
      },
      onError: () => {
      },
    }
  );
};

export {
  useCreateTmpUser,
  useMyPage,
  useUpdateUserProfile,
  useUpdateUserPassword,
  useUpdateUserName,
  useUpdateEmail,
  useUpdatePrivate,
  useReminder,
  useUpdatePasswordRemind,
};
