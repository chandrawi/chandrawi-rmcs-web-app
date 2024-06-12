import { Router, Route } from "@solidjs/router";
import Home from "./components/Home";
import Counter from "./components/Counter";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/counter" component={Counter} />
      <Route path="/*404" component={NotFound} />
    </Router>
  );
}

export default App;
