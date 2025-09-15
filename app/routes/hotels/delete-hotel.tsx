// routes/hotels/delete-hotel.tsx
import { redirect, type ActionFunctionArgs } from "react-router";
import { ApiError } from "~/lib/api-client";
import { hotelService } from "~/services/hotels-service";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const redirectTo = formData.get("redirectTo") as string;

  if (!id) {
    return { error: "ID de hotel no proporcionado" };
  }

  try {
    await hotelService.deactivateHotel(id);
    
    return redirect(redirectTo || "/hotels");
  } catch (error: any) {
    console.error("Error desactivando hotel:", error);
    
    if (error instanceof ApiError && error.response) {
      try {
        const errorData = await error.response.json();
        return { 
          error: errorData.detail || `Error ${error.status}` 
        };
      } catch (parseError) {
        return { error: `Error ${error.status}: No se pudo procesar la respuesta` };
      }
    }
    
    return { error: error.message || "Error al desactivar el hotel" };
  }
}