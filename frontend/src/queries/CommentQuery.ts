import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as api from "../api/CommentAPI";

const useGetCountComments = () => {
	return useMutation(api.getCountComments, {
		onSuccess: () => {
		},
		onError: () => {
            toast.error("error");
		},
	});
};

const useGetComments = () => {
	return useMutation(api.getComments, {
		onSuccess: () => {
		},
		onError: () => {
            toast.error("error");
		},
	});
};

const useSubmitComment = () => {
	return useMutation(api.submitComment, {
		onSuccess: () => {
		},
		onError: () => {
            toast.error("error");
		},
	});
};

export {useGetCountComments, useGetComments, useSubmitComment}