import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as api from "../api/ViewHistoryAPI";

const useGetViewHistories = () => {
	return useMutation(api.getViewHistories, {
		onSuccess: () => {
		},
		onError: (error: AxiosError) => {
			toast.error("error");
		},
	});
};

export {useGetViewHistories}