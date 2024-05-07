import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createNewCategory,
  deleteCategoryWithId,
  deleteCategoryWithIds,
  getAllCategories,
  updateCategory,
} from 'src/apis/CategoryApis';
import { createNewType, getAllTypes, updateType } from 'src/apis/TypesApi';

const seconds = 1000;
export const useGetAllTypes = () => {
  const queryClient = useQueryClient();
  return useQuery(['AllTypes'], getAllTypes);
};

export const useCreateType = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createNewType, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllTypes']);
    },
  });

  return mutation;
};

export const useUpdateType = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(updateType, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllTypes']);
    },
  });

  return mutation;
};

export const useDeleteCategoryWithId = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteCategoryWithId, {
    onSuccess: async () => {
      await Promise.all([queryClient.refetchQueries(['AllTypes'])]);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return mutation;
};

export const useDeleteCategoryWithIds = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteCategoryWithIds, {
    onSuccess: async () => {
      await Promise.all([queryClient.refetchQueries(['AllTypes'])]);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return mutation;
};
