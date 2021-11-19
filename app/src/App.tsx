import { BrowserRouter, Switch, Route } from "react-router-dom";

import WriteView from "./views/WriteView";
import UserView from "./views/UserView";
import FollowView from "./views/FollowView";
import UpdateView from "./views/UpdateView";
import MainView from "./views/MainView";
import CallbackView from "./views/CallbackView";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainView} />
        <Route path="/user" component={UserView} />
        <Route path="/write" component={WriteView} />
        <Route path="/update" component={UpdateView} />
        <Route path="/follow" component={FollowView} />
        <Route path="/oauth2/redirect" component={CallbackView} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
