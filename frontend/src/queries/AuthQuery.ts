import { useMutation, useQuery, useQueryClient } from "react-query";
import * as api from "../api/AuthAPI";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/AuthContext";
import { KEY } from "../consts/auth/QueryKey";

const useLogin = () => {
  const { isAuth, setIsAuth } = useAuth();

  return useMutation(api.Login, {
    onSuccess: () => {
      setIsAuth(true);
      toast.success("ログインしました");
    },
    onError: (error: AxiosError) => {
      toast.error("メールアドレスかパスワードが違います。");
    },
  });
};

const useConfirmation = (uuid: string) => {
  return useQuery("", () => api.Confirmation(uuid));
};
const useConfirmationEmail = (uuid: string) => {
  return useQuery("", () => api.ConfirmationEmail(uuid));
};

const useLogout = () => {
  const { isAuth, setIsAuth } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(api.Logout, {
    onSuccess: () => {
      queryClient.invalidateQueries(KEY.USER);
      setIsAuth(false);

      toast.success("ログアウトしました。");
    },
    onError: (error: AxiosError) => {
      toast.error("ログアウトできませんでした。");
    },
  });
};

const useCurrentUser = () => {
  const { isAuth, setIsAuth } = useAuth();

  return useQuery(KEY.USER, api.GetUser, {
    onSuccess: () => {
      setIsAuth(true);
    },
	  onError: () => {
      setIsAuth(false);
    },
  });
};

export {
  useLogin,
  useLogout,
  useCurrentUser,
  useConfirmation,
  useConfirmationEmail,
};
