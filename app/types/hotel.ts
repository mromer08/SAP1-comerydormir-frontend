// types/hotel.ts
export interface HotelResponseDTO {
  id: string;
  name: string;
  address: string;
  city: string;
  phoneNumber: string;
  email: string;
  nit: string;
  hasPool: boolean;
  hasGym: boolean;
  active: boolean;
}

export interface HotelRoomResponseDTO {
  id: string;
  name: string;
  description: string;
  productionCost: number;
  salePrice: number;
  capacity: number;
  hasTV: boolean;
  hotelId: string;
  hotelName: string;
}

export interface CreateHotelRequest {
  name: string;
  address: string;
  city: string;
  phoneNumber: string;
  email: string;
  nit: string;
  hasPool: boolean;
  hasGym: boolean;
}

export interface CreateHotelRoomRequest {
  name: string;
  description: string;
  productionCost: number;
  salePrice: number;
  capacity: number;
  hasTV: boolean;
  hotelId: string;
}

export interface FindHotelsRequest {
  name?: string;
  city?: string;
  hasPool?: boolean;
  hasGym?: boolean;
  active?: boolean;
  page?: number;
  size?: number;
}

export interface FindHotelRoomsRequest {
  name?: string;
  minSalePrice?: number;
  maxSalePrice?: number;
  minCapacity?: number;
  maxCapacity?: number;
  hasTV?: boolean;
  page?: number;
  size?: number;
}