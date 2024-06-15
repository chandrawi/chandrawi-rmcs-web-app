import NavbarIndex from "./navigation/NavbarIndex";

export default function Index() {
  return(
    <>
    <div class="w-[100vw] h-[100vh] bg-gray-500 opacity-30 hidden fixed z-10"></div>
    <NavbarIndex />
    <div class="w-full min-h-[calc(100vh-3.5rem)] bg-slate-50 dark:bg-slate-800">
      <div class="w-full text-gray-800 dark:text-gray-200">
      
      </div>
    </div>
    </>
  );
};
