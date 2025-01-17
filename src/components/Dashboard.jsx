import NavbarDashboard from "./navigation/NavbarDashboard";
import SidebarDashboard from "./navigation/SidebarDashboard";

export default function Dashboard(props) {
  return (
    <>
    <input id="sidebar" type="checkbox" class="drawer-toggle" />
    <NavbarDashboard />
    <div class="drawer-content mt-[3.5rem] px-1.5 py-1.5 bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 overflow-auto scrollbar-custom">
      {props.children}
    </div>
    <div class="drawer-side overflow-hidden">
      <label for="sidebar" aria-label="close sidebar" class="drawer-overlay bg-gray-500 opacity-30"></label>
      <SidebarDashboard />
    </div>
    </>
  );
}
