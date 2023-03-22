import { Response } from "../types/Response/SuccessResponse";
import * as FollowType from "../types/Follow";
import { API } from "./BaseAPI";

const Follow = async (userId: number) => {
  const result = await API.post<any>(`/api/v1/following/${userId}`);
  return result;
};
const UnFollow = async (userId: number) => {
  const result = await API.delete<Response<null>>(`/api/v1/following/${userId}`);
  return result;
};

const GetFollowUsers = async (userId: number) => {
  const { data } = await API.get<Response<FollowType.FollowUser[]>>(
    `/api/v1/following/${userId}`
  );
  return data.data;
};

const GetFollower = async (userId: number) => {
  const { data } = await API.get<Response<FollowType.Follower[]>>(
    `/api/v1/follower/${userId}`
  );
  return data.data;
};
export { Follow, GetFollowUsers, GetFollower,UnFollow };
