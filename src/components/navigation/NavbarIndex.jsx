
export default function NavbarIndex() {
  return (
    <>
    <div class="navbar h-[3.5rem] min-h-[3.5rem] bg-white dark:bg-slate-900 shadow-md_res shadow-slate-200 dark:shadow-slate-1000 text-gray-800 dark:text-gray-200">
      <div class="lg:min-w-[200px] lg:w-[16%] xl:min-w-[220px] w-auto h-full flex flex-row justify-start lg:justify-center px-2 xs:px-3 md:px-4">
        <button class="lg:hidden h-full flex items-center mr-1.5">
          <img src="/icon/menu-svgrepo-com.svg" class="w-full h-full py-2.5 px-1" />
        </button>
        <div class="h-full flex flex-row items-center">
          <img src="/image/gundala_logo.svg" alt="" class="w-[2.25rem] h-[2rem] min-w-[2.25rem] min-h-[2rem] xs:w-[2.5rem] xs:h-[2.25rem] xs:inline" />
          <img src="/image/gundala_letter.svg" alt="" class="w-[6.875rem] h-[0.75rem] ml-1 hidden md:inline" />
        </div>
      </div>
      <div class="grow h-full flex flex-row justify-between ml-0 md:ml-2 mr-2 md:mr-3">
        <div class="grow h-full flex flex-row justify-center md:justify-start">

        </div>
        <div class="h-full flex flex-row">

        </div>
      </div>
      <div class="w-0 h-full">

      </div>
    </div>
    </>
  );
};
