// API entity (raw backend shape)
export interface ApiAddress {
  id: string;
  country: string;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;
  detail?: string;
}

// Service DTOs
export interface CreateAddressBodyDto {
  country: string;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;
  detail: string;
}

export interface UpdateAddressBodyDto {
  country: string;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;
  detail: string;
}
