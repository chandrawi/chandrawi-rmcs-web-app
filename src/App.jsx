import { createResource, createEffect } from "solid-js";
import { Router, Route } from "@solidjs/router";
import Index from "./components/Index";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import { darkTheme, authServer, resourceServer } from "./store";

function App() {

  /**
   * get api servers definition
   * @type { [function():{ auth: { address:string }, resource: { address:string, id:string }[] }] }
   */
  const [apiData] = createResource(async () => {
    const response = await fetch("/data/api.json");
    return await response.json()
  });

  // save auth and resource api address in cookie
  createEffect(() => {
    const api = apiData();
    if (api) {
      authServer.setAddress(api.auth.address);
      for (const res of api.resource) {
        resourceServer.setAddress(res.id, res.address);
      };
    }
  });

  return (
    <div classList={{ dark: darkTheme() }} class="drawer md:drawer-open h-[100vh] overflow-hidden">
      <Router>
        <Route path="/" component={Index} />
        <Route path="/" component={Index}>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/dashboard/:id" component={Dashboard} />
        <Route path="/dashboard/:id/:menu" component={Dashboard} />
        <Route path="/dashboard/:id/:menu/:submenu" component={Dashboard} />
        <Route path="/dashboard/:id/:menu/:submenu/*rest" component={Dashboard} />
      </Router>
    </div>
  );
}

export default App;
