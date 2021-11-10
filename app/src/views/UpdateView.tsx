import { useParams } from "react-router";
import Layout from "../components/layout";
import UpdateContainer from "../containers/UpdateContainer";

import "../styles/layout.css";

const UpdateView = () => {
  const { postId } = useParams<{ postId: string }>();

  return (
    <Layout>
      <UpdateContainer postId={parseInt(postId)} />
    </Layout>
  );
};

export default UpdateView;
