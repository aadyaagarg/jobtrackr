import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <main className=" min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
