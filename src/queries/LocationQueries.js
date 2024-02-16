import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createNewLocation,
  deleteLocationWithId,
  deleteLocationsWithIds,
  getAllLocations,
  updateLocation,
} from 'src/apis/LocationApis';

export const useGetAllLocations = () =>
  useQuery(['AllLocations'], getAllLocations, {
    retry: 1,
    refetchOnReconnect: 'always',
    refetchInterval: 1000 * 60 * 0.2,
  });

export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createNewLocation, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllLocations']);
    },
  });

  return mutation;
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(updateLocation, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllLocations']);
    },
  });

  return mutation;
};

export const useDeleteLocationWithId = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteLocationWithId, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllLocations']);
    },
  });
  return mutation;
};

export const useDeleteLocationWithIds = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteLocationsWithIds, {
    onSuccess: () => {
      queryClient.refetchQueries(['AllLocations']);
    },
  });
  return mutation;
};
