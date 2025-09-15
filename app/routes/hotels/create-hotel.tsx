import { HotelForm } from "~/components/hotels/hotel-form";

export default function CreateHotelPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registrar Nuevo Hotel</h1>
        <p className="text-muted-foreground">
          Complete la información para registrar un nuevo hotel en el sistema
        </p>
      </div>

      <HotelForm />
    </div>
  );
}