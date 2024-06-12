import { createSignal } from "solid-js";
import Nav from "./Nav";

export default function About() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <Nav />
      <main class="text-center mx-auto text-gray-700 p-4">
        <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Counter</h1>
        <button
          class="w-[200px] rounded-full bg-gray-100 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem]" 
          onClick={() => setCount(count() + 1)}
        >
          Clicks: {count()}
        </button>
      </main>
    </>
  );
}
