import NavbarIndex from "./navigation/NavbarIndex";

export default function Index(props) {
  return(
    <>
    <NavbarIndex />
    <div class="drawer-content mt-[3.5rem] bg-slate-50 dark:bg-slate-800 overflow-auto scrollbar-custom">
      <div class="w-full text-gray-800 dark:text-gray-200">
        {props.children}
      </div>
    </div>
    </>
  );
};
