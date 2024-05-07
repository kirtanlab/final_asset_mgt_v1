import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createNewClassification,
  deleteClassificationWithId,
  deleteClassificationWithIds,
  getAllClassification,
  updateClassification,
} from 'src/apis/ClassificationApis';

const seconds = 1000;
export const useGetAllClassification = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, isSuccess, isError } = useQuery(
    ['AllClassification'],
    getAllClassification
  );
  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
  };
};
export const useCreateClassification = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createNewClassification, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllClassification']);
    },
  });

  return mutation;
};

export const useUpdateClassification = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(updateClassification, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllClassification']);
    },
  });

  return mutation;
};

export const useDeleteClassificationWithId = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteClassificationWithId, {
    onSuccess: async () => {
      await Promise.all([queryClient.invalidateQueries(['AllClassification'])]);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return mutation;
};

export const useDeleteClassificationWithIds = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteClassificationWithIds, {
    onSuccess: async () => {
      await Promise.all([queryClient.refetchQueries(['AllClassification'])]);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return mutation;
};
