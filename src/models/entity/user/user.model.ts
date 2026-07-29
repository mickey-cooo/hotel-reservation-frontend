// Service DTOs
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
