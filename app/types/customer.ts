export interface CustomerResponseDTO {
  id: string;
  firstName: string;
  lastName: string;
  nit: string;
  phoneNumber: string;
  active: boolean;
}

export interface CreateCustomerRequest {
  firstName: string;
  lastName: string;
  nit: string;
  phoneNumber: string;
}

export interface UpdateCustomerRequest {
  id: string;
  firstName: string;
  lastName: string;
  nit: string;
  phoneNumber: string;
}

export interface FindCustomersRequest {
  firstName?: string;
  lastName?: string;
  nit?: string;
  active?: boolean;
  page?: number;
  size?: number;
}