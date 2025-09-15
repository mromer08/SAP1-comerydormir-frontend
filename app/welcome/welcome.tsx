import { Hotel, Utensils } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

export function Welcome() {
  return (
    <main className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <Card className="max-w-3xl w-full shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center gap-3 text-blue-600 dark:text-blue-400">
            <Hotel className="w-10 h-10" />
            <Utensils className="w-10 h-10" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Bienvenido a <span className="text-blue-600">Comer y Dormir</span>
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            El sistema de gestión integral para hoteles y restaurantes. 
            Aquí podrás visualizar indicadores clave, analizar desempeño 
            y administrar de manera eficiente tu negocio.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <Button size="lg" className="rounded-2xl">
            Explorar Dashboard
          </Button>
          <p className="text-sm text-muted-foreground">
            Más adelante verás métricas, gráficas y reportes en tiempo real.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
