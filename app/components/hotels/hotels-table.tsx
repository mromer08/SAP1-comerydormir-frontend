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
import type { PagedResponseDTO } from "~/types/generic";
import type { HotelResponseDTO } from "~/types/hotel";

interface HotelsTableProps {
  data: PagedResponseDTO<HotelResponseDTO>;
}

export function HotelsTable({ data }: HotelsTableProps) {
  const fetcher = useFetcher();

  const handleDeactivate = (hotel: HotelResponseDTO) => {
    if (confirm(`¿Estás seguro de desactivar el hotel ${hotel.name}?`)) {
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

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>NIT</TableHead>
              <TableHead>Instalaciones</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell className="font-medium">{hotel.name}</TableCell>
                <TableCell>{hotel.city}</TableCell>
                <TableCell>{hotel.phoneNumber}</TableCell>
                <TableCell>{hotel.email}</TableCell>
                <TableCell>{hotel.nit}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {hotel.hasPool && <Badge variant="secondary">Piscina</Badge>}
                    {hotel.hasGym && <Badge variant="secondary">Gimnasio</Badge>}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={hotel.active ? "default" : "secondary"}>
                    {hotel.active ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/hotels/${hotel.id}/edit`}>
                        Editar
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeactivate(hotel)}
                      disabled={!hotel.active || isDeactivating}
                    >
                      {isDeactivating ? "Desactivando..." : "Desactivar"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {fetcher.data?.error && (
        <div className="bg-destructive text-destructive-foreground p-3 rounded-md">
          Error: {fetcher.data.error}
        </div>
      )}
    </div>
  );
}