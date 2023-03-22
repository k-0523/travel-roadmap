import { FileResponse } from "../types/File";
import { Response } from "../types/Response/SuccessResponse";
import { API } from "./BaseAPI";

const postImage = async (file: any) => {
  const formData = new FormData();
  formData.append("image", file);
  const data = await API.post<string>(
    "/api/v1/file/upload",
    formData
  ).then(
    (response) => response.data
  );
  return data;
};


const postImage2 = async (file: any) => {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await API.post<Response<FileResponse>>(
    "/api/v1/file/upload",
    formData
  );
  return data.data;
};
export { postImage, postImage2 };
