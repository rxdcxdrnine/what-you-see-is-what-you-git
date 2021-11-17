import LayoutContainer from "../containers/LayoutContainer";
import MainContainer from "../containers/MainContainer";

import "../styles/main.css";

const MainView = () => {
  return (
    <LayoutContainer main={true}>
      <MainContainer />
    </LayoutContainer>
  );
};
export default MainView;
