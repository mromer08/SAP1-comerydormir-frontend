// components/hotels/hotels-table.tsx
import { Button } from "~/components/ui/button";
import { Link, useFetcher } from "react-router";
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
import type { HotelResponseDTO } from "~/types/hotel";
import type { PagedResponseDTO } from "~/types/generic";

interface HotelsTableProps {
  data: PagedResponseDTO<HotelResponseDTO>;
}

export function HotelsTable({ data }: HotelsTableProps) {
  const fetcher = useFetcher();

  const handleDeactivate = (hotel: HotelResponseDTO) => {
    if (confirm(`¿Estás seguro de desactivar el hotel "${hotel.name}"? Esta acción no se puede deshacer.`)) {
      fetcher.submit(
        {
          id: hotel.id,
          redirectTo: "/hotels"
        },
        {
          method: "DELETE",
          action: "/hotels/delete-hotel"
        }
      );
    }
  };

  const isDeactivating = fetcher.state !== "idle";

  if (data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Sin hoteles registrados</h3>
        <p className="text-muted-foreground mb-4">No se encontraron hoteles en el sistema.</p>
        <Button asChild>
          <Link to="/hotels/register">Registrar primer hotel</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>NIT</TableHead>
              <TableHead>Instalaciones</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-40">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span className="font-semibold">{hotel.name}</span>
                    <span className="text-sm text-muted-foreground">{hotel.email}</span>
                  </div>
                </TableCell>
                <TableCell>{hotel.city}</TableCell>
                <TableCell>
                  <div className="max-w-xs truncate" title={hotel.address}>
                    {hotel.address}
                  </div>
                </TableCell>
                <TableCell>{hotel.phoneNumber}</TableCell>
                <TableCell>{hotel.nit}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {hotel.hasPool && (
                      <Badge variant="secondary" className="text-xs">
                        🏊 Piscina
                      </Badge>
                    )}
                    {hotel.hasGym && (
                      <Badge variant="secondary" className="text-xs">
                        💪 Gimnasio
                      </Badge>
                    )}
                    {!hotel.hasPool && !hotel.hasGym && (
                      <span className="text-sm text-muted-foreground">Básico</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={hotel.active ? "default" : "secondary"}>
                    {hotel.active ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {/* <Button asChild variant="outline" size="sm">
                      <Link to={`/hotels/${hotel.id}/edit`}>
                        Editar
                      </Link>
                    </Button> */}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeactivate(hotel)}
                      disabled={!hotel.active || isDeactivating}
                      className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      {isDeactivating ? "..." : "Desactivar"}
                    </Button>
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
                    url.searchParams.set("page", (index + 1).toString());
                    window.location.href = url.toString();
                  }}
                  isActive={data.pageNumber === index + 1}
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
        Mostrando {data.data.length} de {data.totalElements} hoteles
      </div>

      {fetcher.data?.error && (
        <div className="bg-destructive text-destructive-foreground p-3 rounded-md">
          Error: {fetcher.data.error}
        </div>
      )}
    </div>
  );
}