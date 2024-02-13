import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createNewCategory,
  deleteCategoryWithId,
  getAllCategories,
  updateCategory,
} from 'src/apis/CategoryApis';

export const useGetAllCategories = () => useQuery(['AllCategory'], getAllCategories);

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
      queryClient.refetchQueries(['AllCategory']);
    },
  });
  return mutation;
};
