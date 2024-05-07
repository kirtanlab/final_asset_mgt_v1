import axios from 'axios';
import { getAuthHeader } from 'src/auth/context/jwt/utils';

import { useAuth } from 'src/auth/context/jwt/auth-provider';
import { HOST_ADDRESS } from './host';

export async function getAllCount({ queryKey }) {
  const [_, EmployeeId] = queryKey;
  return axios
    .get(`${HOST_ADDRESS}/AssetRequest/count/${EmployeeId}`, getAuthHeader())
    .then((res) => res.data);
}
export async function getAllRequestByEmployeeId({ queryKey }) {
  // console.log('queryKey: ' + queryKey);
  const [_, EmployeeId] = queryKey;
  return axios
    .get(`${HOST_ADDRESS}/AssetRequest/${EmployeeId}/assetRequests`, getAuthHeader())
    .then((res) => res.data);
}
export async function getAllAdhocRequestByEmployeeId({ queryKey }) {
  // console.log('queryKey: ' + queryKey);
  const [_, EmployeeId] = queryKey;
  return axios
    .get(`${HOST_ADDRESS}/AssetRequest/${EmployeeId}/AdhocAssetRequests`, getAuthHeader())
    .then((res) => res.data);
}
export async function updateAssetRequest(RequestData) {
  return axios
    .put(`${HOST_ADDRESS}/AssetRequest/updateAssetRequest`, RequestData, getAuthHeader())
    .then((res) => res.data);
}
export async function createAssetRequest(RequestData) {
  return axios
    .post(`${HOST_ADDRESS}/AssetRequest/createAssetRequest/`, RequestData, getAuthHeader())
    .then((res) => res.data);
}

export async function ApproveRequest(AssetRequestId) {
  return axios
    .get(`${HOST_ADDRESS}/AssetRequest/${AssetRequestId}/updateStatus/2`, getAuthHeader())
    .then((res) => res.data);
}
export async function RejectedRequest(AssetRequestId) {
  return axios
    .get(`${HOST_ADDRESS}/AssetRequest/${AssetRequestId}/updateStatus/3`, getAuthHeader())
    .then((res) => res.data);
}
export async function AllocatedRequest(AssetRequestId) {
  return axios
    .get(`${HOST_ADDRESS}/AssetRequest/${AssetRequestId}/updateStatus/4`, getAuthHeader())
    .then((res) => res.data);
}
export async function pullbackRequest(AssetRequestId) {
  console.log('getAuthHeader', getAuthHeader());
  return axios
    .get(`${HOST_ADDRESS}/AssetRequest/${AssetRequestId}/updateStatus/5`, getAuthHeader())
    .then((res) => res.data);
}
export async function CancelledRequest(AssetRequestId) {
  return axios
    .get(`${HOST_ADDRESS}/AssetRequest/${AssetRequestId}/updateStatus/6`, getAuthHeader())
    .then((res) => res.data);
}
export async function HandoverRequest(AssetRequestId) {
  return axios
    .get(`${HOST_ADDRESS}/AssetRequest/${AssetRequestId}/updateStatus/7`, getAuthHeader())
    .then((res) => res.data);
}

// export async function createNewType(typeData) {
//   return axios
//     .post(`${BACKEND_CALL_URL}/type/Createtype`, typeData, getAuthHeader())
//     .then((res) => res.data);
// }
// export async function updateType(typeData) {
//   return axios
//     .put(`${BACKEND_CALL_URL}/type/updateType`, typeData, getAuthHeader())
//     .then((res) => res.data);
// }
// export async function deleteCategoryWithId(categoryId) {
//   return axios
//     .delete(`${BACKEND_CALL_URL}/category/${categoryId}`, getAuthHeader())
//     .then((res) => res.data);
// }
// export async function deleteCategoryWithIds(categoryIds) {
//   return axios
//     .delete(`${BACKEND_CALL_URL}/category/deleteSelected`, { data: categoryIds }, getAuthHeader())
//     .then((res) => res.data);
// }
