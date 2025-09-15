// routes/hotels/rooms/create-room.tsx
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { RoomForm } from "~/components/hotels/hotel-room-form";
import { ApiError } from "~/lib/api-client";
import { hotelService } from "~/services/hotels-service";

// Loader para obtener la lista de hoteles
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const hotelsResponse = await hotelService.getAllHotels({ 
      active: true,
      size: 100
    });
    
    return hotelsResponse;
  } catch (error: any) {
    console.error("Error loading hotels:", error);
    
    // Error de fetching
    if (error.message?.includes('fetch failed') || error.message?.includes('ECONNREFUSED')) {
      console.warn("API no disponible, devolviendo hoteles vacíos");
      return { 
        content: [],
        totalPages: 0,
        totalElements: 0,
        size: 0,
        number: 0
      };
    }
    
    if (error instanceof ApiError && error.status === 404) {
      return { 
        content: [],
        totalPages: 0,
        totalElements: 0,
        size: 0,
        number: 0
      };
    }
    
    // Para otros errores
    console.warn("Error inesperado, devolviendo hoteles vacíos:", error.message);
    return { 
      content: [],
      totalPages: 0,
      totalElements: 0,
      size: 0,
      number: 0
    };
    
    // propagar el error
    // throw new Response("Error al cargar los hoteles", { status: 500 });
  }
}

// Action para crear la habitación
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  try {
    const roomData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      productionCost: parseFloat(formData.get("productionCost") as string),
      salePrice: parseFloat(formData.get("salePrice") as string),
      capacity: parseInt(formData.get("capacity") as string),
      hasTV: formData.get("hasTV") === "true",
      hotelId: formData.get("hotelId") as string
    };

    await hotelService.createHotelRoom(roomData);
    return redirect("/hotels/rooms");
  } catch (error: any) {
    console.error("Action error:", error);
    
    // Manejar errores de API específicos
    if (error instanceof ApiError && error.response) {
      try {
        const errorData = await error.response.json();
        return { 
          errors: errorData.errors || {}, 
          error: errorData.detail || `Error ${error.status}` 
        };
      } catch (parseError) {
        return { error: `Error ${error.status}: No se pudo procesar la respuesta` };
      }
    }
    
    return { error: error.message || "Error al crear la habitación" };
  }
}

export default function CreateRoomPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registrar Nueva Habitación</h1>
        <p className="text-muted-foreground">
          Complete la información para registrar una nueva habitación
        </p>
      </div>

      <RoomForm />
    </div>
  );
}