import { For } from "solid-js";
import { langs, lang, setLang, darkTheme, setDarkTheme, userId } from "../../store";

export default function SettingMenu() {
  return (
    <div class="dropdown">
      <button tabindex="0" title="Setting" class="h-full pr-2">
        <span class="icon-setting text-2xl text-gray-500 hover:text-sky-800 dark:hover:text-sky-300"></span>
      </button>
      <div class="flex flex-row justify-end">
        <div class="dropdown-content min-w-28 bg-white shadow-md_res shadow-slate-200 rounded-b-sm dark:bg-gray-800 dark:shadow-slate-950">
          <For each={langs}>
          {(item) => (
            <button class="w-full px-3 py-1.5 flex flex-row items-center border-t border-slate-200 dark:border-slate-700"
              classList={{ "hover:text-sky-800": lang() !== item.name, "dark:hover:text-sky-300": lang() !== item.name, "font-bold": lang() === item.name }}
              onclick={()=>{setLang(item.name)}}
            >
              <img src={item.icon} class="w-[1.25rem] h-[0.9375rem] border border-slate-200 dark:border-slate-700" />
              <span class="ml-1.5">{item.name}</span>
            </button>
          )}
          </For>
          <button class="w-full px-3 py-1.5 flex flex-row items-center border-t border-slate-200 hover:text-sky-800 dark:border-slate-700 dark:hover:text-sky-300"
            onclick={() => { setDarkTheme((theme) => !theme) }}
          >
            <div class="flex items-end justify-center">
              <div class="w-11 h-5 px-0.5 bg-slate-500 rounded-full flex flex-row items-center justify-between">
                <div classList={{ hidden: !darkTheme() }} class="w-4 h-4 bg-slate-100 rounded-full"></div>
                <span classList={{ hidden: darkTheme() }} class="icon-theme_light text-[1.125rem] text-gray-100"></span>
                <span classList={{ hidden: !darkTheme() }} class="icon-theme_dark text-[1.125rem] text-gray-100"></span>
                <div classList={{ hidden: darkTheme() }} class="w-4 h-4 bg-slate-100 rounded-full"></div>
              </div>
            </div>
            <div class="ml-1.5 flex items-start justify-center">
              <span classList={{ hidden: darkTheme() }} class="pt-0.5">Light</span>
              <span classList={{ hidden: !darkTheme() }} class="pt-0.5">Dark</span>
            </div>
          </button>
          <div class="w-full px-3 py-1.5 xl:hidden flex flex-row items-center border-t border-slate-200 hover:text-sky-800 dark:border-slate-700 dark:hover:text-sky-300"
            classList={{ hidden: userId() }}
          >
            <a href="/#/register" class="text-sm text-gray-100 py-0.5 px-2 bg-sky-700 hover:bg-sky-800 rounded-sm hover:text-white">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}
