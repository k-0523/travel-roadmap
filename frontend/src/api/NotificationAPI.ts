import { Response } from "../types/Response/SuccessResponse";
import { API } from "./BaseAPI";

type Notification = {
  notificationId: number;
};
const GetNotifications = async () => {
  const { data } = await API.get<Response<Notification[]>>(
    "/api/v1/notifications"
  );
  return data.data;
};
const ReadNotification = async (notificationId: number) => {
  const { data } = await API.put<Response<object>>(
    `/api/v1/notifications/${notificationId}`
  );
  return data;
};

export { GetNotifications, ReadNotification };
