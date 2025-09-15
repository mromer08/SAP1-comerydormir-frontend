// services/hotel-service.ts
import type { 
  HotelResponseDTO, 
  HotelRoomResponseDTO, 
  CreateHotelRequest, 
  CreateHotelRoomRequest, 
  FindHotelsRequest, 
  FindHotelRoomsRequest 
} from '~/types/hotel';
import type { PagedResponseDTO } from '~/types/generic';
import { apiClient, ApiError } from '~/lib/api-client';

class HotelService {
  private basePath = '/api/v1/hotels';

  private async handleError(error: any): Promise<never> {
    console.error('Hotel API Error:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new Error(error.message || 'Error desconocido en el servicio de hoteles');
  }

  // Hoteles
  async createHotel(request: CreateHotelRequest): Promise<HotelResponseDTO> {
    try {
      return await apiClient.post<HotelResponseDTO>(this.basePath, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deactivateHotel(id: string): Promise<void> {
    try {
      return await apiClient.delete(`${this.basePath}/${id}`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getHotel(id: string): Promise<HotelResponseDTO> {
    try {
      return await apiClient.get<HotelResponseDTO>(`${this.basePath}/${id}`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllHotels(params?: FindHotelsRequest): Promise<PagedResponseDTO<HotelResponseDTO>> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.name) queryParams.append('name', params.name);
      if (params?.city) queryParams.append('city', params.city);
      if (params?.hasPool !== undefined) queryParams.append('hasPool', params.hasPool.toString());
      if (params?.hasGym !== undefined) queryParams.append('hasGym', params.hasGym.toString());
      if (params?.active !== undefined) queryParams.append('active', params.active.toString());
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.size) queryParams.append('size', params.size.toString());

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}?${queryString}` : this.basePath;

      return await apiClient.get<PagedResponseDTO<HotelResponseDTO>>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Habitaciones de hotel
  async createHotelRoom(request: CreateHotelRoomRequest): Promise<HotelRoomResponseDTO> {
    try {
      return await apiClient.post<HotelRoomResponseDTO>(`${this.basePath}/rooms`, request);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getHotelRoom(id: string): Promise<HotelRoomResponseDTO> {
    try {
      return await apiClient.get<HotelRoomResponseDTO>(`${this.basePath}/rooms/${id}`);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAllHotelRooms(params?: FindHotelRoomsRequest): Promise<PagedResponseDTO<HotelRoomResponseDTO>> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.name) queryParams.append('name', params.name);
      if (params?.minSalePrice) queryParams.append('minSalePrice', params.minSalePrice.toString());
      if (params?.maxSalePrice) queryParams.append('maxSalePrice', params.maxSalePrice.toString());
      if (params?.minCapacity) queryParams.append('minCapacity', params.minCapacity.toString());
      if (params?.maxCapacity) queryParams.append('maxCapacity', params.maxCapacity.toString());
      if (params?.hasTV !== undefined) queryParams.append('hasTV', params.hasTV.toString());
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.size) queryParams.append('size', params.size.toString());

      const queryString = queryParams.toString();
      const endpoint = queryString ? `${this.basePath}/rooms?${queryString}` : `${this.basePath}/rooms`;

      return await apiClient.get<PagedResponseDTO<HotelRoomResponseDTO>>(endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const hotelService = new HotelService();