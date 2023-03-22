import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import * as api from "../api/ContentDetailAPI";

const useCreateContentDetail = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation(api.createContentDetail, {
		onSuccess: (response) => {
			navigate({
				pathname: "/content-detail/view",
				search: '?id=' + JSON.parse(JSON.stringify(response)).data.ID
			});
		},
		onError: (error: AxiosError) => {
			if (error.response?.data.data) {
				const errorObject = JSON.parse(JSON.stringify(error.response?.data)).data;
				queryClient.setQueryData('errorObject', errorObject);
			} else {
				toast.error("error");
			}
		},
	});
};

const useGetContentDetail = () => {
	return useMutation(api.getContentDetail, {
		onSuccess: () => {
		},
		onError: () => {
			toast.error("error");
		},
	});
};

const useUpdateContentDetail = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation(api.updateContentDetail, {
		onSuccess: () => {
			const url = new URL(window.location.href);
			navigate({
				pathname: "/content-detail/view",
				search: '?id='+ url.searchParams.get('id')
			});
		},
		onError: (error: AxiosError) => {
			if (error.response?.data.data) {
				const errorObject = JSON.parse(JSON.stringify(error.response?.data)).data;
				queryClient.setQueryData('errorObject', errorObject);
			} else {
				toast.error("error");
			}
		},
	});
};

const useDeleteContentDetail = () => {
	const navigate = useNavigate();
	return useMutation(api.deleteContentDetail, {
		onSuccess: () => {
			navigate({pathname: "/content/list"});
		},
		onError: () => {
			toast.error("error");
		},
	});
};

export {useCreateContentDetail, useGetContentDetail, useUpdateContentDetail, useDeleteContentDetail}