import { API } from "./BaseAPI";
import { Response } from "../types/Response/SuccessResponse";
import { ProfileContents } from "../types/Content";

const getContents = async (params: any) => {
	const data = await API.post<string>(
        "/api/v1/content/list",
        {'searchParam': params}
    ).then((response) => response.data)
	return data
}

const getSearchedContents = async (params: any) => {
	const data = await API.post<string>(
        "/api/v1/content/search",
        {
            // userIDを受け渡す
            'userID': 1,
            'searchParam': params
        }
    ).then((response) => response.data)
	return data
}

const GetUserContents = async (userId: number) => {
  const { data } = await API.get<Response<ProfileContents[]>>(`/api/v1/content/${userId}`);
  return data.data;
};
export { getContents, getSearchedContents, GetUserContents };