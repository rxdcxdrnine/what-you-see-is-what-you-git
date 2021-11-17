import qs from "qs";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const CallbackView = () => {
  const history = useHistory();
  const location = useLocation();
  const { code } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    // TO DO
    // REST API POST with code

    history.push("/user");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, history]);

  return null;
};

export default CallbackView;
