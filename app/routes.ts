import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

export default [
  layout("layouts/sidebar.tsx", [
    index("routes/home.tsx"),
    route("clients", "routes/clients/index.tsx"),
    route("clients/register", "routes/clients/create-customer.tsx"),
    route("clients/:id/edit", "routes/clients/edit-customer.tsx"),
  ]),
] satisfies RouteConfig