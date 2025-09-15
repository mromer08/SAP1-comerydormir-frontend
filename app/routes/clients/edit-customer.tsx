import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { EditCustomerForm } from "~/components/customers/edit-customer-form";
import { ApiError } from "~/lib/api";
import { customerService } from "~/services/customer-service";

// Loader para obtener los datos del cliente
export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  
  if (!id) {
    throw new Error("ID de cliente no proporcionado");
  }

  try {
    const customer = await customerService.getCustomer(id);
    return customer;
  } catch (error) {
    console.error("Error loading customer:", error);
    throw new Response("Cliente no encontrado", { status: 404 });
  }
}

// Action para actualizar el cliente
export async function action({ request, params }: ActionFunctionArgs) {
  const { id } = params;
  const formData = await request.formData();
  
  if (!id) {
    return { error: "ID de cliente no proporcionado" };
  }

  try {
    const customerData = {
      id: id,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      nit: formData.get("nit") as string,
      phoneNumber: formData.get("phoneNumber") as string,
    };

    await customerService.updateCustomer(customerData);
    return redirect("/clients");
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
    
    return { error: error.message || "Error al actualizar el cliente" };
  }
}

export default function EditCustomerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Cliente</h1>
        <p className="text-muted-foreground">
          Modifique la información del cliente seleccionado
        </p>
      </div>

      <EditCustomerForm />
    </div>
  );
}