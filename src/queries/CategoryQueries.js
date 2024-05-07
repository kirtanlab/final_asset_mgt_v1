import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createNewCategory,
  deleteCategoryWithId,
  deleteCategoryWithIds,
  getAllCategories,
  updateCategory,
} from 'src/apis/CategoryApis';

const seconds = 1000;
export const useGetAllCategories = () => {
  const queryClient = useQueryClient();
  // console.log('queryClient', queryClient.getQueryData(['AllCategory']));
  return useQuery(['AllCategory'], getAllCategories, {
    placeholderData: queryClient.getQueryData(['AllCategory']),
  });
};

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
    onSuccess: async () => {
      await Promise.all([queryClient.refetchQueries(['AllCategory'])]);
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
      await Promise.all([queryClient.refetchQueries(['AllCategory'])]);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return mutation;
};
