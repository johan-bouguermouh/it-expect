import { axiosInstance, ResponseTypeORM } from "./axios.config";

const prefixEntity = "users";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

interface patchUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

interface PostUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get(`/${prefixEntity}`);
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await axiosInstance.get(`/${prefixEntity}/${id}`);
  return response.data;
};

export const createUser = async (data: PostUser): Promise<User> => {
  const response = await axiosInstance.post(`/${prefixEntity}`, data);
  return response.data;
};

export const updateUser = async (
  id: number,
  data: patchUser
): Promise<ResponseTypeORM> => {
  const response = await axiosInstance.patch(`/${prefixEntity}/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number): Promise<ResponseTypeORM> => {
  const response = await axiosInstance.delete(`/${prefixEntity}/${id}`);
  return response.data;
};
