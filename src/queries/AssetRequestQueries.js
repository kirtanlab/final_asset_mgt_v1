import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AllocatedRequest,
  ApproveRequest,
  CancelledRequest,
  HandoverRequest,
  RejectedRequest,
  createAssetRequest,
  getAllAdhocRequestByEmployeeId,
  getAllCount,
  getAllRequestByEmployeeId,
  pullbackRequest,
  updateAssetRequest,
} from 'src/apis/AssetRequestApis';
import { useAuth } from 'src/auth/context/jwt/auth-provider';

export const useGetCount = () => {
  const { user } = useAuth();
  return useQuery(['TotalCount', user?.id], getAllCount, {
    retry: 1,
    refetchOnReconnect: 'always',
    refetchInterval: 1000 * 60 * 1,
  });
};

export const useGetAllAssetRequests = () => {
  const { user } = useAuth();
  console.log('user: ', user);
  return useQuery(['AllRequests', user?.id], getAllRequestByEmployeeId, {
    retry: 1,
    refetchOnReconnect: 'always',
    refetchInterval: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });
};
export const useGetAllAdhocAssetRequests = () => {
  const { user } = useAuth();
  console.log('user: ', user);
  return useQuery(['AllAdhocRequests', user?.id], getAllAdhocRequestByEmployeeId, {
    retry: 1,
    refetchOnReconnect: 'always',
    refetchInterval: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateAssetRequests = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const mutation = useMutation(updateAssetRequest, {
    onSuccess: async () => {
      // Invalidate queries and wait for them to complete
      await Promise.all([
        queryClient.invalidateQueries(['AllRequests', user?.id]),
        queryClient.invalidateQueries(['AllAdhocRequests', user?.id]),
      ]);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return mutation;
};

export const useCreateAssetRequests = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const mutation = useMutation(createAssetRequest, {
    onSuccess: async () => {
      // Invalidate queries and wait for them to complete
      await Promise.all([
        queryClient.invalidateQueries(['AllRequests', user?.id]),
        queryClient.invalidateQueries(['AllAdhocRequests', user?.id]),
      ]);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return mutation;
};

export const useApproveRequest = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const mutation = useMutation(ApproveRequest, {
    onSuccess: async () => {
      // Invalidate queries and wait for them to complete
      await Promise.all([
        queryClient.invalidateQueries(['AllRequests', user?.id]),
        queryClient.invalidateQueries(['AllAdhocRequests', user?.id]),
      ]);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return mutation;
};
export const useRejectRequest = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const mutation = useMutation(RejectedRequest, {
    onSuccess: async () => {
      // Invalidate queries and wait for them to complete
      await Promise.all([
        queryClient.invalidateQueries(['AllRequests', user?.id]),
        queryClient.invalidateQueries(['AllAdhocRequests', user?.id]),
      ]);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return mutation;
};

export const useAllocateRequest = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const mutation = useMutation(AllocatedRequest, {
    onSuccess: async () => {
      // Invalidate queries and wait for them to complete
      await Promise.all([
        queryClient.invalidateQueries(['AllRequests', user?.id]),
        queryClient.invalidateQueries(['AllAdhocRequests', user?.id]),
      ]);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return mutation;
};

export const usePullbackRequest = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const mutation = useMutation(pullbackRequest, {
    onSuccess: async () => {
      // Invalidate queries and wait for them to complete
      await Promise.all([
        queryClient.invalidateQueries(['AllRequests', user?.id]),
        queryClient.invalidateQueries(['AllAdhocRequests', user?.id]),
      ]);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return mutation;
};

export const useCancelRequest = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const mutation = useMutation(CancelledRequest, {
    onSuccess: async () => {
      // Invalidate queries and wait for them to complete
      await Promise.all([
        queryClient.invalidateQueries(['AllRequests', user?.id]),
        queryClient.invalidateQueries(['AllAdhocRequests', user?.id]),
      ]);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return mutation;
};

export const useHandoverRequest = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const mutation = useMutation(HandoverRequest, {
    onSuccess: async () => {
      // Invalidate queries and wait for them to complete
      await Promise.all([
        queryClient.invalidateQueries(['AllRequests', user?.id]),
        queryClient.invalidateQueries(['AllAdhocRequests', user?.id]),
      ]);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return mutation;
};
// export const
