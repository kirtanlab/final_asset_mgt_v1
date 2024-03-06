import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createNewEmployee,
  deleteEmployeeWithId,
  deleteEmployeeWithIds,
  getAllEmployee,
  updateEmployee,
} from 'src/apis/EmployeeApis';
import { useAuth } from 'src/auth/context/jwt/auth-provider';
import { setSession } from 'src/auth/context/jwt/utils';
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { EmployeeLogin } from 'src/utils/CustomAxios';

export const useLoginEmployee = () => {
  const { dispatch } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const { mutateAsync, isLoading, isIdle, error, isError } = useMutation(EmployeeLogin, {
    disableMultipleMutations: true,
    onSuccess: (ResData) => {
      console.log('token', ResData);
      const { token, employeeDetails: user } = ResData;
      setSession(token);
      dispatch({
        type: 'LOGIN',
        payload: { user },
      });

      router.push(returnTo || PATH_AFTER_LOGIN);
    },
  });
  const handleLoginError = (axiosError) => {
    if (axiosError.response && axiosError.response.status === 401) {
      // Handle Unauthorized error here
      // For example, you can set an error message
      // setError('Invalid credentials. Please try again.');
    } else {
      // Handle other Axios errors
      // console.error('Axios Error:', axiosError);
      // setError('An error occurred. Please try again.');
    }
  };

  return {
    mutateAsync: async (employeeData) => {
      try {
        await mutateAsync(employeeData);
      } catch (axiosError) {
        handleLoginError(axiosError);
      }
    },
    isError,
    error,
    isLoading,
    isIdle,
  };
};

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
