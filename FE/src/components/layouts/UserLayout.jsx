import { Outlet } from "@tanstack/react-router";

export function UserLayout() {
  return (
    <>
      <div className="max-w-full">
        <Outlet />
      </div>
    </>
  );
}
