import qs from "qs";
import jwt from "jsonwebtoken";
import { Redirect, useLocation } from "react-router-dom";
import { ACCESS_TOKEN, OAUTH_TOKEN } from "../constants";
import { useDispatch } from "react-redux";
import { updateLogin } from "../modules/user";

const CallbackView = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { accessToken, OAuthToken } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  if (accessToken && OAuthToken) {
    localStorage.setItem(ACCESS_TOKEN, accessToken as string);
    localStorage.setItem(OAUTH_TOKEN, OAuthToken as string);

    const decoded = jwt.decode(accessToken as string) as jwt.JwtPayload;

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
    <Redirect to="/" />;
  }

  return null;
};

export default CallbackView;
