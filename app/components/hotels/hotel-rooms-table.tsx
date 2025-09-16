// components/hotels/hotel-rooms-table.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "~/components/ui/pagination";
import { Skeleton } from "~/components/ui/skeleton";
import type { HotelRoomResponseDTO } from "~/types/hotel";
import type { PagedResponseDTO } from "~/types/generic";
import { Button } from "../ui/button";
import { Link } from "react-router";

interface HotelRoomsTableProps {
  data: PagedResponseDTO<HotelRoomResponseDTO>;
}

export function HotelRoomsTable({ data }: HotelRoomsTableProps) {
  if (data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Sin habitaciones registradas</h3>
        <p className="text-muted-foreground mb-4">No se encontraron habitaciones en el sistema.</p>
        <Button asChild>
          <Link to="/hotels/rooms/register">Registrar primera habitación</Link>
        </Button>
      </div>
    );
  }

  // Función para formatear precios
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ'
    }).format(price);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Hotel</TableHead>
              <TableHead>Capacidad</TableHead>
              <TableHead>Precio p/noche</TableHead>
              <TableHead>Costo de mantenimiento p/noche</TableHead>
              <TableHead>Características</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((room) => (
              <TableRow key={room.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span className="font-semibold">{room.name}</span>
                    <span className="text-sm text-muted-foreground">ID: {room.id.substring(0, 8)}...</span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="max-w-xs">
                    {room.description || (
                      <span className="text-muted-foreground italic">Sin descripción</span>
                    )}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{room.hotelName}</span>
                    <span className="text-sm text-muted-foreground">ID: {room.hotelId.substring(0, 8)}...</span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <Badge variant="outline" className="text-lg">
                    {room.capacity} 👥
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <div className="font-semibold">
                    {formatPrice(room.salePrice)}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div>
                    {formatPrice(room.productionCost)}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {room.hasTV && (
                      <Badge variant="secondary" className="text-xs">
                        📺 TV
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {room.capacity} {room.capacity === 1 ? 'persona' : 'personas'}
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {data.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (data.hasPrevious) {
                    const url = new URL(window.location.href);
                    url.searchParams.set("page", (data.pageNumber - 1).toString());
                    window.location.href = url.toString();
                  }
                }}
                className={!data.hasPrevious ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {[...Array(data.totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const url = new URL(window.location.href);
                    url.searchParams.set("page", (index).toString());
                    window.location.href = url.toString();
                  }}
                  isActive={data.pageNumber === index}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (data.hasNext) {
                    const url = new URL(window.location.href);
                    url.searchParams.set("page", (data.pageNumber + 1).toString());
                    window.location.href = url.toString();
                  }
                }}
                className={!data.hasNext ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div className="text-sm text-muted-foreground">
        Mostrando {data.data.length} de {data.totalElements} habitaciones
      </div>
    </div>
  );
}

// Componente de skeleton para loading
export function HotelRoomsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Hotel</TableHead>
              <TableHead>Capacidad</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Costo Producción</TableHead>
              <TableHead>Características</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-6 w-24" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}