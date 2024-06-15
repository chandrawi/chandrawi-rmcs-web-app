import { Router, Route } from "@solidjs/router";
import Index from "./components/Index";
import Counter from "./components/Counter";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Route path="/" component={Index} />
      <Route path="/counter" component={Counter} />
      <Route path="/*404" component={NotFound} />
    </Router>
  );
}

export default App;
