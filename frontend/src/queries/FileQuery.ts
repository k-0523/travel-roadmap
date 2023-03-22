import { toast } from "react-toastify";
import { useMutation } from "react-query";
import * as api from "../api/FileAPI";
import { FileResponse } from "../types/File";

const usePostImage = () => {
	return useMutation(api.postImage, {
		onSuccess: () => {
		},
		onError: () => {
            toast.error("error");
		},
	});
};

const usePostImage2 = () => {
  return useMutation(api.postImage2, {
    onSuccess: (data: any) => {
		console.log(data)
    },
    onError: () => {
      toast.error("error");
    },
  });
};


export {usePostImage,usePostImage2}