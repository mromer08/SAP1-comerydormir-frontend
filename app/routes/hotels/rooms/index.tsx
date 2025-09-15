// routes/hotels/rooms/index.tsx
import { Link, useLoaderData } from "react-router";
import { HotelRoomsTable, HotelRoomsTableSkeleton } from "~/components/hotels/hotel-rooms-table";
import type { HotelRoomResponseDTO} from "~/types/hotel";
import { useState, useEffect } from "react";
import { hotelService } from "~/services/hotels-service";
import type { PagedResponseDTO } from "~/types/generic";
import { Button } from "~/components/ui/button";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "0");
  const size = parseInt(url.searchParams.get("size") || "10");

  try {
    const response = await hotelService.getAllHotelRooms({ page, size });
    return Response.json(response);
  } catch (error) {
    console.error("Error loading hotel rooms:", error);
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

export default function HotelRoomsPage() {
  const data = useLoaderData() as PagedResponseDTO<HotelRoomResponseDTO>;
  const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Habitaciones de Hoteles</h1>
                    <p className="text-muted-foreground">
                        Listado de todas las habitaciones registradas en el sistema
                    </p>
                </div>
                <Button asChild>
                    <Link to="/hotels/rooms/register">Nueva Habitación</Link>
                </Button>
            </div>

            {isLoading ? <HotelRoomsTableSkeleton /> : <HotelRoomsTable data={data} />}
        </div>
  );
}