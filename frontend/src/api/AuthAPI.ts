import { User } from "../types/User";
import { API } from "./BaseAPI";

const Login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // TODO: レスポンス型定義
  const result = await API.post<any>("/api/v1/signin", {
    email: email,
    password: password,
  });
  return result;
};

const Logout = async () => {
  // TODO: レスポンス型定義
  const result = await API.post<any>("/api/v1/signout");
  return result;
};

type UserApiResponse = {
  message: string;
  data: User;
};

const GetUser = async () => {
  // todo:型定義
  const { data } = await API.get<UserApiResponse>("/api/v1/user");
  return data.data;
};

const Confirmation = async (uuid: string) => {
  const { data } = await API.post<UserApiResponse>(
    `/api/v1/confirmation/${uuid}`
  );
  return data;
};

const ConfirmationEmail = async (uuid: string) => {
  const { data } = await API.post<UserApiResponse>(
    `/api/v1/confirmation/email/${uuid}`
  );
  return data;
};

export { Login, Logout, GetUser, Confirmation, ConfirmationEmail };
