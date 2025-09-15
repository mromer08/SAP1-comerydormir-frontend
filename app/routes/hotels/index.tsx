// routes/hotels/index.tsx
import { useLoaderData } from "react-router";
import { HotelsTable } from "~/components/hotels/hotels-table";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import type { HotelResponseDTO } from "~/types/hotel";
import { hotelService } from "~/services/hotels-service";
import type { PagedResponseDTO } from "~/types/generic";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "0");
  const size = parseInt(url.searchParams.get("size") || "10");

  try {
    const response = await hotelService.getAllHotels();
    console.log("Loaded hotels:", response);
    return Response.json(response);
  } catch (error) {
    console.error("Error loading hotels:", error);
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

export default function HotelsPage() {
  const data = useLoaderData() as PagedResponseDTO<HotelResponseDTO>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hoteles</h1>
          <p className="text-muted-foreground">
            Gestiona los hoteles registrados en el sistema
          </p>
        </div>
        <Button asChild>
          <Link to="/hotels/register">Nuevo Hotel</Link>
        </Button>
      </div>

      <HotelsTable data={data} />
    </div>
  );
}