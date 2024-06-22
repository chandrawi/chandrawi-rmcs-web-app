import { Router, Route } from "@solidjs/router";
import Index from "./components/Index";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div id="root">
      <Router>
        <Route path="/" component={Index} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </div>
  );
}

export default App;
