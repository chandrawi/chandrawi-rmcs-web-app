import SvgDashboard from "./svg/SvgDashboard";
import NavbarDashboard from "./navigation/NavbarDashboard";

export default function Dashboard() {
  return (
    <>
    <SvgDashboard />
    <div class="w-[100vw] h-[100vh] bg-gray-500 opacity-30 hidden fixed z-10"></div>
    <NavbarDashboard />
    <div class="w-full min-h-[100vh] bg-slate-50 dark:bg-slate-800">

        <div class="fixed left-0 z-20 min-w-[250px] w-[20%] bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 border-r border-slate-100 dark:border-slate-800 transition-transform md:translate-x-0">

        </div>
        <div class="h-full md:ml-[max(250px,20%)] py-2 xs:p-2 text-gray-800 dark:text-gray-200">

        </div>

    </div>
    </>
  );
}
