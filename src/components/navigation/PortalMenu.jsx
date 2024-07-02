import { useParams } from "@solidjs/router";

export default function PortalMenu(props) {

  const setLink = (baselink) => baselink + "/" + useParams().id;

  return (
    <div class="my-2 flex flex-col">
      <div class="w-full h-10 flex before:h-full before:w-2 bg-slate-50 before:bg-slate-200 hover:bg-sky-50 hover:text-sky-800 dark:bg-slate-800 dark:before:bg-slate-700 dark:hover:bg-gray-800 dark:hover:text-sky-300">
        <a href={setLink(props.menu.link)} class="w-full h-full pl-3 flex items-center">
          <div class="h-full flex items-center grow">
            <span class={ props.menu.icon + " text-[1.5rem]" }></span>
            <span class="font-medium mx-2">{props.menu.text}</span>
          </div>
          <span class="icon-arrow_right text-[1.25rem] mr-3 font-extrabold"></span>
        </a>
      </div>
    </div>
  );
}
