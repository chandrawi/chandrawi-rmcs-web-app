import { Show, createSignal, createEffect } from "solid-js";

export default function SearchMenu(props) {

  let [searchFocus, setsearchFocus] = createSignal(false);

  let searchInput;
  createEffect(() => {
    if (props.searchExpand()) {
      searchInput.focus();
    }
  });

  return (
    <div class="h-full mr-1">
      <form action="#" class="h-full hidden lg:flex flex-row items-center"
        classList={{ hidden: !props.searchExpand(), flex: props.searchExpand() }}
      >
        <input ref={searchInput} type="text" class="w-48 xs:w-52 xl:w-72 h-8 py-0.5 px-1.5 border border-slate-300 text-base bg-white placeholder:text-gray-500 dark:bg-slate-800 dark:border-slate-600" placeholder="Search" 
          onfocus={() => setsearchFocus(true)} onfocusout={() => { setsearchFocus(false); props.setSearchExpand(false) }}
        />
        <div class="w-8 h-8 bg-slate-100 dark:bg-slate-700 border-y border-r border-slate-300 dark:border-slate-600">
          <button type="submit" class="w-full h-full flex justify-center items-center">
            <span class="icon-search text-2xl"></span>
          </button>
        </div>
      </form>
      <div class="w-full justify-start bg-white shadow-md_res shadow-slate-200 rounded-b-sm dark:bg-gray-800 dark:shadow-slate-950 break-words">
        <Show when={searchFocus()}>
          <a href="#row1" class="w-full px-2 py-1 flex flex-row items-center border-t border-slate-200 hover:text-sky-800 dark:border-slate-700 dark:hover:text-sky-300">
            <span>Category:</span>
          </a>
          <a href="#row2" class="w-full px-2 py-1 flex flex-row items-center border-t border-slate-200 hover:text-sky-800 dark:border-slate-700 dark:hover:text-sky-300">
            <span>Region:</span>
          </a>
          <a href="#row3" class="w-full px-2 py-1 flex flex-row items-center border-t border-slate-200 hover:text-sky-800 dark:border-slate-700 dark:hover:text-sky-300">
            <span>Site</span>
          </a>
        </Show>
      </div>
      <button type="submit" title="Search" class="h-full flex items-center lg:hidden"
        classList={{ hidden: props.searchExpand() }}
        onclick={() => props.setSearchExpand(true)}
      >
        <span class="icon-search lg:inline text-2xl text-gray-500 hover:text-sky-800 dark:hover:text-sky-300"></span>
      </button>
    </div>
  );
}
