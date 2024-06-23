import SvgDashboard from "./svg/SvgDashboard";
import NavbarDashboard from "./navigation/NavbarDashboard";
import SidebarDashboard from "./navigation/SidebarDashboard";

export default function Dashboard() {
  return (
    <>
    <SvgDashboard />
    <input id="sidebar" type="checkbox" class="drawer-toggle" />
    <NavbarDashboard />
    <div class="drawer-content h-[calc(100vh-3.5rem)] mt-[3.5rem] bg-slate-50 dark:bg-slate-800">

    </div>
    <div class="drawer-side min-w-[20vw] h-[calc(100vh-3.5rem)] mt-[3.5rem] scrollbar-custom bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800">
      <label for="sidebar" aria-label="close sidebar" class="drawer-overlay bg-gray-500 opacity-30"></label>
      <SidebarDashboard />
    </div>
    </>
  );
}
