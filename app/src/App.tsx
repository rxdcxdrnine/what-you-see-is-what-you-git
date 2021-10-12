import { BrowserRouter, Switch, Route } from "react-router-dom";

import WriteView from "./views/WriteView";
import UserView from "./views/UserView";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/user" component={UserView} />
        <Route path="/write" component={WriteView} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
