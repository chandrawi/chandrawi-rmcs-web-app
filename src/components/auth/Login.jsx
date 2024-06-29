
export default function Login() {
  return(
    <div class="w-full min-h-[calc(100vh-3.5rem)] pt-6 pb-12 flex items-center justify-center">
      <div class="bg-white rounded-sm shadow-md shadow-slate-300 dark:bg-gray-900 dark:shadow-slate-950">
        <div class="flex flex-row px-5 pt-4 pb-2 border-b border-slate-200 dark:border-slate-700">
          <span class="icon-monitoring text-[1.5rem]"></span>
          <span class="ml-2 text-xl font-medium">Monitoring</span>
        </div>
        <form action="#" class="px-5 pt-3 pb-5 text-base" onsubmit={submitLogin}>
          <label for="input-username" class="block mb-1">Username/Email</label>
          <input ref={inputUsername} type="text" id="input-username" class="w-72 h-8 py-0.5 px-1.5 border border-slate-300 text-[1rem] bg-white dark:bg-slate-800 dark:border-slate-600" />
          <label for="input-password" class="block mb-1 mt-2">Password</label>
          <input ref={inputPassword} type="password" id="input-password" class="w-72 h-8 py-0.5 px-1.5 border border-slate-300 text-[1rem] bg-white dark:bg-slate-800 dark:border-slate-600" />
          <div class="my-2 text-sm text-red-700">&nbsp;{errorMessage()}</div>
          <div class="mt-2 flex flex-row justify-between items-end">
            <button id="btn-login" class="py-1 px-2 bg-sky-700 hover:bg-sky-800 rounded-sm">
              <span class="text-gray-100 hover:text-white">Login</span>
            </button>
            <a href="#" class="text-sm text-gray-500 font-medium hover:text-sky-800 dark:hover:text-sky-300">Forgot Password</a>
          </div>
        </form>
      </div>
    </div>
  );
}
