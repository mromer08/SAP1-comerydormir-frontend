import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation, useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import type { CustomerResponseDTO } from "~/types/customer";

export function EditCustomerForm() {
  const customer = useLoaderData() as CustomerResponseDTO;
  const actionData = useActionData() as { errors?: Record<string, string>; error?: string };
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  
  const [formData, setFormData] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    nit: customer.nit,
    phoneNumber: customer.phoneNumber,
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.firstName,
        lastName: customer.lastName,
        nit: customer.nit,
        phoneNumber: customer.phoneNumber,
      });
    }
  }, [customer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Editar Cliente</CardTitle>
        <CardDescription>
          Modifique la información del cliente
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {actionData?.error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{actionData.error}</AlertDescription>
          </Alert>
        )}

        <Form method="post" className="space-y-6">
          <input type="hidden" name="id" value={customer.id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Ej: Juan"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={isLoading}
                className={actionData?.errors?.firstName ? "border-destructive" : ""}
              />
              {actionData?.errors?.firstName && (
                <p className="text-sm text-destructive">{actionData.errors.firstName}</p>
              )}
              <p className="text-sm text-muted-foreground">Nombre del cliente</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Ej: Pérez"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={isLoading}
                className={actionData?.errors?.lastName ? "border-destructive" : ""}
              />
              {actionData?.errors?.lastName && (
                <p className="text-sm text-destructive">{actionData.errors.lastName}</p>
              )}
              <p className="text-sm text-muted-foreground">Apellido del cliente</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nit">NIT</Label>
            <Input
              id="nit"
              name="nit"
              placeholder="123456789"
              value={formData.nit}
              onChange={handleInputChange}
              disabled={isLoading}
              maxLength={9}
              className={actionData?.errors?.nit ? "border-destructive" : ""}
            />
            {actionData?.errors?.nit && (
              <p className="text-sm text-destructive">{actionData.errors.nit}</p>
            )}
            <p className="text-sm text-muted-foreground">9 dígitos numéricos sin guiones</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Teléfono</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="12345678"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">Número de teléfono del cliente</p>
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Actualizando..." : "Actualizar Cliente"}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}