import { Show, For } from "solid-js";
import { useLocation } from "@solidjs/router";
import { DEFAULT_DASHBOARD, DEFAULT_MENU } from "../../store";

export default function PageMenu(props) {

  function path() {
    const path = useLocation().pathname.split("/");
    return {
      name: path[2] ? path[2] : DEFAULT_DASHBOARD,
      menu: path[3] ? path[3] : DEFAULT_MENU,
      submenu: path[4],
      rest: path.splice(5)
    }
  }

  const isActive = () => path().menu === props.menu.name;
  const isActiveSub = (name) => path().submenu === name;

  const setLink = (menu, submenu) => {
    return "/dashboard/" + [path().name, menu, submenu].join("/")
  };

  return (
    <div class="my-2 flex flex-col">
      <div class={"w-full h-10 flex before:h-full before:w-2 " + (isActive()
        ? "bg-slate-100 before:bg-sky-800 hover:bg-sky-50 text-black hover:text-sky-800 dark:bg-slate-700 dark:before:bg-sky-600 dark:hover:bg-gray-700 dark:text-slate-50 dark:hover:text-sky-300"
        : "bg-slate-50 before:bg-slate-200 hover:bg-sky-50 hover:text-sky-800 dark:bg-slate-800 dark:before:bg-slate-700 dark:hover:bg-gray-800 dark:hover:text-sky-300"
      )}>
        <a href={setLink(props.menu.name)} class="w-full h-full pl-3 flex items-center">
          <div class="h-full flex items-center grow">
            <span class={ props.menu.icon + " text-[1.5rem]" }></span>
            <span class="font-medium mx-2">{props.menu.text}</span>
          </div>
          <Show when={props.submenus.length}>
            <span class={"icon-chevron_right text-[1rem] mr-3" + (isActive() ? " rotate-90 transition-transform" : "" )}></span>
          </Show>
        </a>
      </div>
      <div class={"ml-2 bg-slate-50 dark:bg-slate-800 font-medium transition-opacity duration-200 " + (isActive() ? "opacity-100" : "opacity-0")}>
        <For each={props.submenus}>
        {(item) => (
          <Show when={isActive()}>
            <div class={"w-full h-9 flex before:h-full before:w-1.5 " + (isActiveSub(item.name) 
              ? "bg-slate-100 hover:bg-sky-50 before:bg-sky-700 text-black hover:text-sky-800 dark:bg-slate-700 dark:before:bg-sky-500 dark:hover:bg-gray-700 dark:text-slate-50 dark:hover:text-sky-300" 
              : "hover:bg-sky-50 hover:text-sky-800 dark:hover:text-sky-300 dark:hover:bg-gray-800"
            )}>
              <a href={setLink(props.menu.name, item.name)} class="w-full h-full ml-2.5 flex flex-row items-center">
                <span class="icon-list_square text-[1.25rem]"></span>
                <span class="mx-2">{item.text}</span>
              </a>
            </div>
          </Show>
        )}
        </For>
      </div>
    </div>
  );
}
