import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createNewEmployee,
  deleteEmployeeWithId,
  deleteEmployeeWithIds,
  getAllEmployee,
  updateEmployee,
} from 'src/apis/EmployeeApis';

export const useGetAllEmployees = () =>
  useQuery(['AllEmployee'], getAllEmployee, {
    retry: 1,
    refetchOnReconnect: 'always',
    refetchInterval: 1000 * 60 * 0.2,
  });

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createNewEmployee, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllEmployee']);
    },
  });

  return mutation;
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(updateEmployee, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllEmployee']);
    },
  });

  return mutation;
};

export const useDeleteEmployeeWithId = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteEmployeeWithId, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllEmployee']);
    },
  });
  return mutation;
};

export const useDeleteEmployeeWithIds = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteEmployeeWithIds, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllEmployee']);
    },
  });
  return mutation;
};
