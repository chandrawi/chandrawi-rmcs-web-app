import { Show, createSignal } from "solid-js";
import TitleMenuIndex from "./TitleMenuIndex";
import SearchMenu from "./SearchMenu";
import SettingMenu from "./SettingMenu";
import ProfileMenu from "./ProfileMenu";

export default function NavbarIndex() {

  let [searchExpand, setSearchExpand] = createSignal(false);

  let login = true;

  return (
    <div class="fixed z-30 top-0 w-full h-[3.5rem] flex flex-row bg-white dark:bg-slate-900 shadow-md_res shadow-slate-200 dark:shadow-slate-950 text-gray-800 dark:text-gray-200">
      <div class="lg:min-w-[200px] lg:w-[16%] xl:min-w-[220px] w-auto h-full flex flex-row justify-start lg:justify-center px-2 xs:px-3 md:px-4">
        <div class="h-full flex flex-row items-center">
          <img src="/image/gundala_logo.svg" alt="" class="w-9 h-8 min-w-9 min-h-8 xs:w-10 xs:h-9 xs:inline" />
          <img src="/image/gundala_letter.svg" alt="" class="w-28 h-3 ml-1 hidden md:inline" />
        </div>
      </div>
      <div class="grow h-full flex flex-row justify-between">
        <div class="grow h-full flex flex-row justify-center md:justify-start">
          <Show when={!searchExpand()}>
            <TitleMenuIndex />
          </Show>
        </div>
        <div class="h-full flex flex-row">
          <SearchMenu searchExpand={searchExpand} setSearchExpand={setSearchExpand} />
          <SettingMenu login={login} />
          <ProfileMenu login={login} />
        </div>
      </div>
    </div>
  );
};
