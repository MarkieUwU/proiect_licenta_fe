import { createLazyFileRoute } from "@tanstack/react-router";
import HomePage from "../pages/HomePage/HomePage";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});
