import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "../pages/ProfilePage";

export const Route = createFileRoute("/$username/profile")({
  component: ProfilePage,
});
