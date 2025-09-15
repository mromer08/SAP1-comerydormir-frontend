// routes/clients/delete-customer.tsx
import { redirect, type ActionFunctionArgs } from "react-router";
import { ApiError } from "~/lib/api-client";
import { customerService } from "~/services/customer-service";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const redirectTo = formData.get("redirectTo") as string;

  if (!id) {
    return { error: "ID de cliente no proporcionado" };
  }

  try {
    await customerService.deactivateCustomer(id);
    
    // Redirigir a donde se especificó o al listado por defecto
    return redirect(redirectTo || "/clients");
  } catch (error: any) {
    console.error("Error desactivando cliente:", error);
    
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
    
    return { error: error.message || "Error al desactivar el cliente" };
  }
}