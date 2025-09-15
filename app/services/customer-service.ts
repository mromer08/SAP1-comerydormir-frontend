import { apiClient, ApiError } from "~/lib/api";
import type { CreateCustomerRequest, CustomerResponseDTO, FindCustomersRequest, UpdateCustomerRequest } from "~/types/customer";
import type { PagedResponseDTO } from "~/types/generic";

class CustomerService {
  private basePath = '/customer/api/v1/customers';

  private async handleError(error: any): Promise<never> {
    console.error('API Error:', error);
    
    if (error instanceof ApiError) {
      // Preservar el error de API que incluye la respuesta
      throw error;
    }
    
    throw new Error(error.message || 'Error desconocido');
  }

  async createCustomer(request: CreateCustomerRequest): Promise<CustomerResponseDTO> {
    try {
      return await apiClient.post<CustomerResponseDTO>(this.basePath, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateCustomer(request: UpdateCustomerRequest): Promise<CustomerResponseDTO> {
    try {
      return await apiClient.put<CustomerResponseDTO>(this.basePath, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deactivateCustomer(id: string): Promise<void> {
    return apiClient.delete(`${this.basePath}/${id}`);
  }

  async getCustomer(id: string): Promise<CustomerResponseDTO> {
    return apiClient.get<CustomerResponseDTO>(`${this.basePath}/${id}`);
  }

  async getAllCustomers(params?: FindCustomersRequest): Promise<PagedResponseDTO<CustomerResponseDTO>> {
    const queryParams = new URLSearchParams();
    
    if (params?.firstName) queryParams.append('firstName', params.firstName);
    if (params?.lastName) queryParams.append('lastName', params.lastName);
    if (params?.nit) queryParams.append('nit', params.nit);
    if (params?.active !== undefined) queryParams.append('active', params.active.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.size) queryParams.append('size', params.size.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

    return apiClient.get<PagedResponseDTO<CustomerResponseDTO>>(endpoint);
  }
}

export const customerService = new CustomerService();