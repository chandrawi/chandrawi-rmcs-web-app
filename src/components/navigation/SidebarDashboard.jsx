import { For, Show, createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import { DEFAULT_DASHBOARD } from "../../store";
import PageMenu from "./PageMenu";
import PortalMenu from "./PortalMenu";

export default function SidebarDashboard() {

  const dashboardName = () => useParams().name ? useParams().name : DEFAULT_DASHBOARD;

  const [flatmenus] = createResource(dashboardName, async (name) => {
    const response = await fetch(`/data/dashboard/${name}/menu.json`);
    return response.json().then((data) => {
      const menus = [], submenus = [];
      for (const row of data) {
        if (row.id === row.parent_id) menus.push(row);
        else submenus.push(row);
      }
      return {menus, submenus}
    });
  });

  /** @returns {{ id:number, parent_id:number, name:string, text:string, icon:string }[]} */
  const menus = () => flatmenus() ? flatmenus().menus : [];

  /** @returns {{ id:number, parent_id:number, name:string, text:string, icon:string }[]} */
  const submenus = () => flatmenus() ? flatmenus().submenus : [];
  const filterSubmenu = (parent_id) => submenus().filter((submenu) => submenu.parent_id == parent_id);

  const isPortal = (menu) => {
    const split = String(menu.link).split("/");
    return split.length > 1 && split[1] !== "dashboard";
  };

  return (
    <div class="min-w-[max(250px,20vw)] h-[calc(100vh-3.5rem)] mt-[3.5rem] pl-4 pr-2 py-3 bg-white dark:bg-slate-900 
      text-gray-800 dark:text-gray-200 border-r border-slate-100 dark:border-slate-800 overflow-auto scrollbar-custom"
    >
      <For each={menus()}>
      {(item) => (
        <Show when={isPortal(item)} fallback={
          <PageMenu menu={item} submenus={filterSubmenu(item.id)} />
        }>
          <PortalMenu menu={item} />
        </Show>
      )}
      </For>
    </div>
  );
}
