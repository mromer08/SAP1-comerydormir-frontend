// components/hotels/hotel-form.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import type { CreateHotelRequest } from "~/types/hotel";
import { hotelService } from "~/services/hotels-service";
import { Checkbox } from "../ui/checkbox";

export function HotelForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<CreateHotelRequest>({
    name: "",
    address: "",
    city: "",
    phoneNumber: "",
    email: "",
    nit: "",
    hasPool: false,
    hasGym: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      await hotelService.createHotel(formData);
      navigate("/hotels", { replace: true });
    } catch (error: any) {
      console.error("Error creating hotel:", error);
      
      if (error.message.includes("HTTP error! status: 400")) {
        try {
          // Intentar parsear el error de validación del backend
          const errorText = await error.response.text();
          const errorData = JSON.parse(errorText);
          
          if (errorData?.errors) {
            setFieldErrors(errorData.errors);
            setError("Por favor, corrige los errores en el formulario");
          } else {
            setError(errorData?.detail || "Error de validación en el servidor");
          }
        } catch (parseError) {
          setError("Error al procesar la respuesta del servidor");
        }
      } else {
        setError(error.message || "Error al crear el hotel");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Registrar Nuevo Hotel</CardTitle>
        <CardDescription>
          Complete la información del nuevo hotel
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Hotel *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ej: Hotel Paradise"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                className={fieldErrors.name ? "border-destructive" : ""}
              />
              {fieldErrors.name && (
                <p className="text-sm text-destructive">{fieldErrors.name}</p>
              )}
              <p className="text-sm text-muted-foreground">Nombre comercial del hotel</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nit">NIT *</Label>
              <Input
                id="nit"
                name="nit"
                placeholder="123456789"
                value={formData.nit}
                onChange={handleInputChange}
                disabled={isLoading}
                maxLength={9}
                className={fieldErrors.nit ? "border-destructive" : ""}
              />
              {fieldErrors.nit && (
                <p className="text-sm text-destructive">{fieldErrors.nit}</p>
              )}
              <p className="text-sm text-muted-foreground">9 dígitos numéricos</p>
            </div>
          </div>

          {/* Ubicación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city">Departamento *</Label>
              <Input
                id="city"
                name="city"
                placeholder="Ej: Ciudad de Guatemala"
                value={formData.city}
                onChange={handleInputChange}
                disabled={isLoading}
                className={fieldErrors.city ? "border-destructive" : ""}
              />
              {fieldErrors.city && (
                <p className="text-sm text-destructive">{fieldErrors.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <Input
                id="address"
                name="address"
                placeholder="Ej: 5a Avenida 10-25, Zona 1"
                value={formData.address}
                onChange={handleInputChange}
                disabled={isLoading}
                className={fieldErrors.address ? "border-destructive" : ""}
              />
              {fieldErrors.address && (
                <p className="text-sm text-destructive">{fieldErrors.address}</p>
              )}
            </div>
          </div>

          {/* Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Teléfono *</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="12345678"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                disabled={isLoading}
                maxLength={8}
                className={fieldErrors.phoneNumber ? "border-destructive" : ""}
              />
              {fieldErrors.phoneNumber && (
                <p className="text-sm text-destructive">{fieldErrors.phoneNumber}</p>
              )}
              <p className="text-sm text-muted-foreground">8 dígitos numéricos</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ejemplo@hotel.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className={fieldErrors.email ? "border-destructive" : ""}
              />
              {fieldErrors.email && (
                <p className="text-sm text-destructive">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          {/* Instalaciones */}
          <div className="space-y-4">
            <Label>Instalaciones</Label>
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPool"
                  checked={formData.hasPool}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("hasPool", checked === true)
                  }
                  disabled={isLoading}
                />
                <Label htmlFor="hasPool" className="cursor-pointer">
                  Piscina
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasGym"
                  checked={formData.hasGym}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("hasGym", checked === true)
                  }
                  disabled={isLoading}
                />
                <Label htmlFor="hasGym" className="cursor-pointer">
                  Gimnasio
                </Label>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Seleccione las instalaciones disponibles en el hotel
            </p>
          </div>

          <div className="flex gap-4 justify-end pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/hotels")}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrar Hotel"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}