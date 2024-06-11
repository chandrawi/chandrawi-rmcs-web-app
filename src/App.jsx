import logo from './assets/favicon.svg';

function App() {
  return (
    <div class="text-center">
      <header class="flex flex-col items-center justify-center bg-[#282c34] min-h-[100vh] text-white text-xl">
        <img src={logo} class="logo" alt="logo" />
        <p class="m-2 mt-10">
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          class="text-[#b318f0]"
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
}

export default App;
