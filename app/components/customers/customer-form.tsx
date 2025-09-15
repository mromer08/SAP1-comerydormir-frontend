// components/customers/router-customer-form.tsx
import { Form, useActionData, useNavigation } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function CustomerForm() {
  const actionData = useActionData() as { errors?: Record<string, string>; error?: string };
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Registrar Nuevo Cliente</CardTitle>
        <CardDescription>
          Complete la información del nuevo cliente
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {actionData?.error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{actionData.error}</AlertDescription>
          </Alert>
        )}

        <Form method="post" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Ej: Juan"
                disabled={isLoading}
                className={actionData?.errors?.firstName ? "border-destructive" : ""}
              />
              {actionData?.errors?.firstName && (
                <p className="text-sm text-destructive">{actionData.errors.firstName}</p>
              )}
              {/* <p className="text-sm text-muted-foreground">Nombre del cliente</p> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Ej: Pérez"
                disabled={isLoading}
                className={actionData?.errors?.lastName ? "border-destructive" : ""}
              />
              {actionData?.errors?.lastName && (
                <p className="text-sm text-destructive">{actionData.errors.lastName}</p>
              )}
              {/* <p className="text-sm text-muted-foreground">Apellido del cliente</p> */}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nit">NIT</Label>
            <Input
              id="nit"
              name="nit"
              placeholder="123456789"
              disabled={isLoading}
              maxLength={9}
              className={actionData?.errors?.nit ? "border-destructive" : ""}
            />
            {actionData?.errors?.nit && (
              <p className="text-sm text-destructive">{actionData.errors.nit}</p>
            )}
            {/* <p className="text-sm text-muted-foreground">9 dígitos numéricos sin guiones</p> */}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Teléfono</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="12345678"
              disabled={isLoading}
              className={actionData?.errors?.phoneNumber ? "border-destructive" : ""}
            />
            {actionData?.errors?.phoneNumber && (
              <p className="text-sm text-destructive">{actionData.errors.phoneNumber}</p>
            )}
            {/* <p className="text-sm text-muted-foreground">Número de teléfono del cliente</p> */}
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
              {isLoading ? "Registrando..." : "Registrar Cliente"}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}