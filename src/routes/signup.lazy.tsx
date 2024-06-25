import { createLazyFileRoute } from "@tanstack/react-router";
import { RegistrationPage } from "../pages/SignUnPage";

export const Route = createLazyFileRoute("/signup")({
  component: RegistrationPage,
});
