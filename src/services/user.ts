import type { ApiResponse } from '../types/shared/types';
import type { UpdateUserData, UpdateUserPayload, UserPointData } from '../types/user/types';
import { api } from '../lib/api/api';

const userRoute = '/users';

export const deleteUser = async (userId: string) => {
  return api.delete(`${userRoute}/${userId}`);
};

export const getUserPoint = async (userId: string) => {
  return api.get<ApiResponse<UserPointData>>(`${userRoute}/${userId}/points`);
};

export const updateUser = async (userId: string, payload: UpdateUserPayload) => {
  return api.patch<ApiResponse<UpdateUserData>>(`${userRoute}/${userId}`, payload);
};
