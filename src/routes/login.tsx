import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

export function LoginPage() {
  return (
    <div className="p-2">
      <h3>Welcome Login</h3>
    </div>
  );
}
