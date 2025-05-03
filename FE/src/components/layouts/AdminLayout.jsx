import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useState } from "react";

export function AdminLayout() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={isOpen} />
        <div className="flex flex-col flex-1">
          <Topbar onToggle={() => setIsOpen(!isOpen)} />
          <main className="p-10 bg-gray-100 flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
