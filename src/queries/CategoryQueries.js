import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createNewCategory,
  deleteCategoryWithId,
  deleteCategoryWithIds,
  getAllCategories,
  updateCategory,
} from 'src/apis/CategoryApis';

export const useGetAllCategories = () =>
  useQuery(['AllCategory'], getAllCategories, {
    retry: 1,
    refetchOnReconnect: 'always',
    refetchInterval: 1000 * 60 * 5,
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createNewCategory, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllCategory']);
    },
  });

  return mutation;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(updateCategory, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllCategory']);
    },
  });

  return mutation;
};

export const useDeleteCategoryWithId = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteCategoryWithId, {
    onSuccess: () => {
      queryClient.invalidateQueries(['AllCategory']);
    },
  });
  return mutation;
};

export const useDeleteCategoryWithIds = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteCategoryWithIds, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllCategory']);
    },
  });
  return mutation;
};
