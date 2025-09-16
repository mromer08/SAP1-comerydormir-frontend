import { Link } from "react-router";
import { CustomersTable } from "~/components/customers/customer-table";
import { Button } from "~/components/ui/button";
import { customerService } from "~/services/customer-service";

export async function loader({ request }: { request: Request }) {
  console.log('Loader called with request:', request.url);
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "0");
  const size = parseInt(url.searchParams.get("size") || "10");

  try {
    const response = await customerService.getAllCustomers({ page, size });
    console.log('Loader response:', response);
    
    return Response.json(response);
  } catch (error) {
    console.error('Loader error:', error);
    return Response.json({
      data: [],
      totalElements: 0,
      pageNumber: 1,
      totalPages: 0,
      isFirst: true,
      isLast: true,
      hasNext: false,
      hasPrevious: false
    }, { status: 500 });
  }
}


export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground">
          Gestiona los clientes registrados en el sistema
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex-1">
          {/* barra buscador después */}
        </div>
        <Button asChild>
          <Link to="/clients/register">Nuevo Cliente</Link>
        </Button>
      </div>

      <CustomersTable />
    </div>
  );
}