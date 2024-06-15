
export default function NavbarDashboard() {
  return (
    <>
    <div class="fixed z-30 top-0 w-full h-[3.5rem] flex flex-row bg-white dark:bg-slate-900 shadow-md_res shadow-slate-200 dark:shadow-slate-1000 text-gray-800 dark:text-gray-200">
      <div class="md:min-w-[250px] md:w-[20%] w-auto h-full flex flex-row justify-center px-2 xs:px-3 md:px-4">
        <button class="md:hidden h-full flex items-center mr-1.5">
          <span class="material-icons-outlined text-[2rem]">menu</span>
        </button>
        <div class="h-full flex flex-row items-center">
          <img src="/image/gundala_logo.svg" alt="" class="w-[2.25rem] h-8 min-w-[2.25rem] min-h-8 xs:w-[2.5rem] xs:h-[2.25rem] xs:inline" />
          <img src="/image/gundala_letter.svg" alt="" class="w-[6.875rem] h-[0.75rem] ml-1 hidden md:inline" />
        </div>
      </div>
      <div class="grow h-full flex flex-row justify-between mx-0 md:mx-2">
        <div class="grow h-full">

        </div>
        <div class="h-full flex flex-row">

        </div>
      </div>
    </div>
    </>
  );
};
