import { Router, Route } from "@solidjs/router";
import Index from "./components/Index";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import { darkTheme, authServer, resourceServer } from "./store";

function App() {

  // get api servers definition
  fetch("/data/api.json")
    .then(async (response) => {
      /** @type {{ auth: { address:string }, resource: { address:string, id:string }[] }} */
      const api = await response.json();
      authServer.setAddress(api.auth.address);
      for (const res of api.resource) {
        resourceServer.setAddress(res.id, res.address);
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
