import { BrowserRouter, Switch, Route } from "react-router-dom";

import WriteView from "./views/WriteView";
import UserView from "./views/UserView";
import FollowView from "./views/FollowView";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/user" component={UserView} />
        <Route path="/write" component={WriteView} />
        <Route path="/follow" component={FollowView} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
