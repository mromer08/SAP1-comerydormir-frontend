import { redirect, type ActionFunctionArgs } from "react-router";
import { CustomerForm } from "~/components/customers/customer-form";
import { ApiError } from "~/lib/api-customer";
import { customerService } from "~/services/customer-service";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  try {
    const customerData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      nit: formData.get("nit") as string,
      phoneNumber: formData.get("phoneNumber") as string,
    };

    await customerService.createCustomer(customerData);
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
    
    return { error: error.message || "Error al crear el cliente" };
  }
}

export default function CreateCustomerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registrar Nuevo Cliente</h1>
        <p className="text-muted-foreground">
          Complete la información para registrar un nuevo cliente en el sistema
        </p>
      </div>

      <CustomerForm />
    </div>
  );
}