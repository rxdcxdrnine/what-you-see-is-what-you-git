import qs from "qs";
import jwt from "jsonwebtoken";
import { Redirect, useLocation } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import { useDispatch } from "react-redux";
import { updateLogin } from "../modules/user";

const CallbackView = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { token } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token as string);
    const decoded = jwt.decode(token as string) as jwt.JwtPayload;

    dispatch(
      updateLogin({
        userId: parseInt(decoded.sub as string),
        userName: decoded.username,
      })
    );

    return (
      <Redirect
        to={{
          pathname: "/user",
          state: { userId: decoded.sub },
        }}
      />
    );
  } else {
    // redirect with error state
  }

  return null;
};

export default CallbackView;
