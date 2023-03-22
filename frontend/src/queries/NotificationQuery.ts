import { KEY } from "../consts/notification/QueryKey";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as api from "../api/NotificationAPI";
import { Notification } from "../types/Notification";
import { AxiosError } from "axios";

const useNotifications = () => {
  // @ts-ignore to ignore the type checking errors on the next line in a TypeScript
  return useQuery<Notification[]>(KEY.NOTIFICATIONS, api.GetNotifications);
};

const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(api.ReadNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries(KEY.NOTIFICATIONS);
    },
	  onError: (error: AxiosError) => {
		console.log(error)
	},
  });
};

export { useNotifications, useReadNotification };
