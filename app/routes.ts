import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

export default [
  layout("layouts/sidebar.tsx", [
    index("routes/home.tsx"),

    // Clientes
    route("clients", "routes/clients/index.tsx"),
    route("clients/register", "routes/clients/create-customer.tsx"),
    route("clients/:id/edit", "routes/clients/edit-customer.tsx"),
    route("clients/delete-customer", "routes/clients/delete-customer.tsx"),

    // Hoteles
    // route("hotels", "routes/hotels/index.tsx"),
    // route("hotels/register", "routes/hotels/create-hotel.tsx"),
    // route("hotels/:id/edit", "routes/hotels/edit-hotel.tsx"),
    // route("hotels/delete-hotel", "routes/hotels/delete-hotel.tsx"),
    
    // // Habitaciones
    // route("hotels/rooms", "routes/hotels/rooms/index.tsx"),
    // route("hotels/rooms/register", "routes/hotels/rooms/create-room.tsx"),
    // route("hotels/rooms/:id/edit", "routes/hotels/rooms/edit-room.tsx"),
    // route("hotels/rooms/delete-room", "routes/hotels/rooms/delete-room.tsx"),
  ]),
] satisfies RouteConfig