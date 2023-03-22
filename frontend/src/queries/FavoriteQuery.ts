import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as api from "../api/FavoriteAPI";
import { KEY } from "../consts/favorite/QueryKey";

const useGetCountFavorites = () => {
  return useMutation(api.getCountFavorites, {
    onSuccess: () => {
    },
    onError: () => {
      toast.error("error");
    },
  });
};

const useExecFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation(api.execFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries(KEY.FAVORITE_CONTENTS);
    },
    onError: () => {
      toast.error("error");
    },
  });
};

const useFavoriteContents = (userId: number) => {
  return useQuery([KEY.FAVORITE_CONTENTS, userId], () =>
    api.SearchUserFavoriteContents(userId)
  );
};

export { useGetCountFavorites, useExecFavorite, useFavoriteContents };
