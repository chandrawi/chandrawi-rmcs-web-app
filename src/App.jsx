import { Router, Route } from "@solidjs/router";
import Index from "./components/Index";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Route path="/" component={Index} />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
  );
}

export default App;
