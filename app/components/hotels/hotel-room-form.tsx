// components/hotels/hotel-room-form.tsx
import { Form, useActionData, useNavigation, useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Checkbox } from "~/components/ui/checkbox";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { HotelResponseDTO } from "~/types/hotel";
import type { PagedResponseDTO } from "~/types/generic";

interface ActionData {
  errors?: Record<string, string>;
  error?: string;
}

export function RoomForm() {
  const actionData = useActionData() as ActionData | undefined;
  const navigation = useNavigation();
  const loaderData = useLoaderData() as PagedResponseDTO<HotelResponseDTO>;
  
  const isLoading = navigation.state === "submitting";
  const hotels = loaderData?.data || [];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Registrar Nueva Habitación</CardTitle>
        <CardDescription>
          Complete la información de la nueva habitación
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {actionData?.error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{actionData.error}</AlertDescription>
          </Alert>
        )}

        <Form method="post" className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Habitación *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ej: Suite Presidencial"
                disabled={isLoading}
                className={actionData?.errors?.name ? "border-destructive" : ""}
                required
              />
              {actionData?.errors?.name && (
                <p className="text-sm text-destructive">{actionData.errors.name}</p>
              )}
              <p className="text-sm text-muted-foreground">Nombre descriptivo de la habitación</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hotelId">Hotel *</Label>
              <Select name="hotelId" required>
                <SelectTrigger className={actionData?.errors?.hotelId ? "border-destructive" : ""}>
                  <SelectValue placeholder="Seleccionar hotel" />
                </SelectTrigger>
                <SelectContent>
                  {hotels.map((hotel) => (
                    <SelectItem key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {actionData?.errors?.hotelId && (
                <p className="text-sm text-destructive">{actionData.errors.hotelId}</p>
              )}
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Descripción de la habitación, características, etc."
              disabled={isLoading}
              rows={3}
              className={actionData?.errors?.description ? "border-destructive" : ""}
              maxLength={1000}
            />
            {actionData?.errors?.description && (
              <p className="text-sm text-destructive">{actionData.errors.description}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Máximo 1000 caracteres
            </p>
          </div>

          {/* Precios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="productionCost">Costo de mantenimiento p/noche *</Label>
              <Input
                id="productionCost"
                name="productionCost"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                disabled={isLoading}
                className={actionData?.errors?.productionCost ? "border-destructive" : ""}
                required
              />
              {actionData?.errors?.productionCost && (
                <p className="text-sm text-destructive">{actionData.errors.productionCost}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="salePrice">Precio p/noche *</Label>
              <Input
                id="salePrice"
                name="salePrice"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                disabled={isLoading}
                className={actionData?.errors?.salePrice ? "border-destructive" : ""}
                required
              />
              {actionData?.errors?.salePrice && (
                <p className="text-sm text-destructive">{actionData.errors.salePrice}</p>
              )}
            </div>
          </div>

          {/* Capacidad y amenities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacidad *</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                max="10"
                placeholder="1"
                disabled={isLoading}
                className={actionData?.errors?.capacity ? "border-destructive" : ""}
                required
              />
              {actionData?.errors?.capacity && (
                <p className="text-sm text-destructive">{actionData.errors.capacity}</p>
              )}
              <p className="text-sm text-muted-foreground">
                Capacidad máxima de personas (1-10)
              </p>
            </div>

            <div className="space-y-4">
              <Label>Características</Label>
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasTV"
                    name="hasTV"
                    value="true"
                    disabled={isLoading}
                  />
                  <Label htmlFor="hasTV" className="cursor-pointer">
                    TV
                  </Label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Seleccione las características disponibles
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrar Habitación"}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}