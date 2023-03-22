import { API } from "./BaseAPI";
import * as UserType from "../types/User";
import { Response } from "../types/Response/SuccessResponse";
const createTmpUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await API.post<string>("/api/v1/signup", {
    email: email,
    password: password,
  });
  return data;
};
const getProfileInfo = async (userId: number) => {
  const { data } = await API.get<Response<UserType.MyPage>>(
    `/api/v1/mypage/${userId}`
  );
  return data.data;
};

const UpdateProfile = async (params: UserType.UpdateUserProfile) => {
  const { data } = await API.put<Response<Object>>("/api/v1/user", params);
  return data;
};
const UpdatePassword = async (params: UserType.UpdateUserPassword) => {
  const { data } = await API.put<Response<Object>>("/api/v1/user/password", params);
  return data;
};
const UpdatePasswordRemind = async (params: UserType.UpdatePasswordRemind) => {
  const { data } = await API.post<Response<undefined>>(
    `/api/v1/password/${params.token}`,
    params
  );
  return data;
};
;
const Reminder = async (params: UserType.Remind) => {
  const { data } = await API.post<Response<undefined>>(
    "/api/v1/password",
    params
  );
  return data;
};
const UpdateUserName = async (params: UserType.UpdateUserName) => {
  const { data } = await API.put<Response<undefined>>(
    "/api/v1/user/username",
    params
  );
  return data;
};
const UpdateEmail = async (params: UserType.UpdateEmail) => {
  const { data } = await API.put<Response<undefined>>(
    "/api/v1/user/email",
    params
  );
  return data;
};
const UpdatePrivate = async () => {
  const { data } = await API.put<Response<undefined>>(
    "/api/v1/user/private"
  );
  return data;
};
export {
  createTmpUser,
  getProfileInfo,
  UpdateProfile,
  UpdatePassword,
  UpdateUserName,
  UpdateEmail,
  UpdatePrivate,
  Reminder,
  UpdatePasswordRemind,
};
