import { Response } from "../types/Response/SuccessResponse";
import * as FavoriteType from "../types/Favorite";
import { API } from "./BaseAPI";

const getCountFavorites = async (postID: number) => {
  const data = await API.post<string>("/api/v1/favorite/count", {
    postID: postID,
  }).then((response) => response.data);
  return data;
};

const execFavorite = async (params: any) => {
  const data = await API.post<string>(
    "/api/v1/favorite/update",
    JSON.stringify(params)
  ).then((response) => response.data);
  return data;
};

const SearchUserFavoriteContents = async (userId: number) => {
  const { data } = await API.get<Response<FavoriteType.FavoiteWithContents[]>>(
    `/api/v1/favorite/${userId}/contents`
  );
  return data.data
};

export { getCountFavorites, execFavorite, SearchUserFavoriteContents };
