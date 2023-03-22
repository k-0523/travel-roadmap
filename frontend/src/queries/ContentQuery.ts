import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import * as api from "../api/ContentAPI";
import { KEY } from "../consts/content/QueryKey";

const useGetContents = () => {
  return useMutation(api.getContents, {
    onSuccess: () => {
    },
    onError: (error: AxiosError) => {
      toast.error("error");
    },
  });
};

const useGetSearchedContents = () => {
  return useMutation(api.getSearchedContents, {
    onSuccess: () => {
    },
    onError: (error: AxiosError) => {
      toast.error("error");
    },
  });
};

const useUserContents = (contentId: number) => {
  return useQuery([KEY.PROFILE_CONTENT, contentId], () =>
    api.GetUserContents(contentId)
  );
};

export { useGetContents, useGetSearchedContents, useUserContents };
