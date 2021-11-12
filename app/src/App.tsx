import { BrowserRouter, Switch, Route } from "react-router-dom";

import WriteView from "./views/WriteView";
import UserView from "./views/UserView";
import FollowView from "./views/FollowView";
import UpdateView from "./views/UpdateView";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/user" component={UserView} />
        <Route path="/write" component={WriteView} />
        <Route path="/update" component={UpdateView} />
        <Route path="/follow" component={FollowView} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
