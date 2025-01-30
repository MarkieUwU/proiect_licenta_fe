import Settings from "@/core/pages/Settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_main/settings')({
  component: Settings
})