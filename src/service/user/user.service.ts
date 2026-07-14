import { AxiosError } from 'axios';
import { requestClient, authHeader } from '../request';

export interface AddressDto {
  country: string;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;
  detail: string;
}

export interface RegisterBodyDto {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyOtpBodyDto {
  email: string;
  otp: string;
}

export interface LoginBodyDto {
  email: string;
  password: string;
}

export interface UserNameDto {
  th: string;
  en: string;
}

export interface CreateBodyUserDto {
  firstName: UserNameDto;
  lastName: UserNameDto;
  phoneNumber: string;
  addressDetail: AddressDto;
}

export interface UpdateBodyUserDto {
  firstName: UserNameDto;
  lastName: UserNameDto;
  phoneNumber: string;
  addressDetail: AddressDto;
}

const BASE_PATH = '/api/v1/user';

export const userService = {
  async register<TResponse = unknown>(body: RegisterBodyDto): Promise<TResponse> {
    try {
      return await requestClient.post<TResponse, TResponse>(`${BASE_PATH}/register`, body);
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async verifyOtp<TResponse = unknown>(body: VerifyOtpBodyDto): Promise<TResponse> {
    try {
      return await requestClient.post<TResponse, TResponse>(`${BASE_PATH}/verify-otp`, body);
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async login<TResponse = unknown>(body: LoginBodyDto): Promise<TResponse> {
    try {
      return await requestClient.post<TResponse, TResponse>(`${BASE_PATH}/login`, body);
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async create<TResponse = unknown>(body: CreateBodyUserDto, token?: string): Promise<TResponse> {
    try {
      return await requestClient.post<TResponse, TResponse>(
        `${BASE_PATH}/create`,
        body,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async findAll<TResponse = unknown>(token?: string): Promise<TResponse> {
    try {
      return await requestClient.get<TResponse, TResponse>(`${BASE_PATH}/list`, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async findOne<TResponse = unknown>(id: string, token?: string): Promise<TResponse> {
    try {
      return await requestClient.get<TResponse, TResponse>(`${BASE_PATH}/${id}`, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async update<TResponse = unknown>(id: string, body: UpdateBodyUserDto, token?: string): Promise<TResponse> {
    try {
      return await requestClient.patch<TResponse, TResponse>(
        `${BASE_PATH}/update/${id}`,
        body,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async delete<TResponse = unknown>(id: string, token?: string): Promise<TResponse> {
    try {
      return await requestClient.delete<TResponse, TResponse>(
        `${BASE_PATH}/delete/${id}`,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },
};
