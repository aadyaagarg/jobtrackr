import { useState } from "react";
import {
  FiBarChart2,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { NavLink } from "react-router";
function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navItems = [
    {
      name: "Analytics",
      url: "/dashboard/analytics",
      icon: FiBarChart2,
    },
    {
      name: "Applications",
      url: "/dashboard/applications",
      icon: FiBriefcase,
    },
    {
      name: "Follow-ups",
      url: "/dashboard/follow-ups",
      icon: FiClock,
    },
  ];

  const accountItems = [
    {
      name: "Profile",
      url: "/dashboard/profile",
      icon: FiUser,
    },
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: FiSettings,
    },
  ];

  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo */}
      <div
        className={`flex h-20 shrink-0 items-center border-b border-gray-200 ${
          collapsed ? "justify-center px-2" : "px-6"
        }`}
      >
        {collapsed ? (
          <span className="text-2xl font-black text-[#2563eb]">J</span>
        ) : (
          <span className="truncate text-xl font-bold text-[#10253d]">
            JobTrackr
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.url}
                className={({ isActive }) =>
                  `flex w-full items-center rounded-lg py-3 text-sm font-medium transition ${
                    collapsed ? "justify-center px-3" : "gap-4 px-4"
                  } ${
                    isActive
                      ? "bg-[#eef3ff] text-[#2563eb]"
                      : "text-[#10253d] hover:bg-[#f5f6fc]"
                  }`
                }
              >
                <Icon className="shrink-0 text-lg" />

                {!collapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Account */}
        <div className="mt-10 space-y-2">
          {accountItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.url}
                className={({ isActive }) =>
                  `flex w-full items-center rounded-lg py-3 text-sm font-medium transition ${
                    collapsed ? "justify-center px-3" : "gap-4 px-4"
                  } ${
                    isActive
                      ? "bg-[#eef3ff] text-[#2563eb]"
                      : "text-[#10253d] hover:bg-[#f5f6fc]"
                  }`
                }
              >
                <Icon className="shrink-0 text-lg" />

                {!collapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Collapse */}
      <div className="shrink-0 border-t border-gray-200 p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-500 transition hover:bg-[#f5f6fc]"
        >
          {collapsed ? (
            <FiChevronRight className="text-xl" />
          ) : (
            <>
              <FiChevronLeft className="text-xl" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
