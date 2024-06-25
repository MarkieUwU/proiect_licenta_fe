import { createLazyFileRoute } from "@tanstack/react-router";
import { LogInPage } from "../pages/LogInPage";

export const Route = createLazyFileRoute("/login")({
  component: LogInPage,
});
