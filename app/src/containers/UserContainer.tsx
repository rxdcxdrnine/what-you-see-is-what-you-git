import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../components/user";
import { RootState } from "../modules";
import {
  resetPage,
  resetPosts,
  resetUser,
  updateComponent,
  updateLogin,
  UserComponentState,
} from "../modules/user";
import {
  fetchCommits,
  fetchPostCount,
  fetchAllPosts,
  fetchUserProfile,
  removePost,
} from "../modules/user/saga";
import { getPayload } from "../utils";

export type UserContainerProps = {
  userId: number | null;
};

const UserContainer = ({ userId }: UserContainerProps) => {
  const login = useSelector((state: RootState) => state.user.login);
  const profile = useSelector((state: RootState) => state.user.profile);
  const { allPosts, commits, heatmap } = useSelector(
    (state: RootState) => state.user.posts
  );
  const page = useSelector((state: RootState) => state.user.page);
  const readOnly = useSelector((state: RootState) => state.user.readOnly);
  const component = useSelector((state: RootState) => state.user.component);
  const dispatch = useDispatch();

  const [regDate, setRegDate] = useState<string>("");

  useEffect(() => {
    if (!login.userId || !login.userName) {
      const { userId, userName } = getPayload();
      dispatch(updateLogin({ userId, userName }));
      dispatch(fetchUserProfile({ userId }));
    } else {
      dispatch(fetchUserProfile({ userId: userId || login.userId }));
    }

    return () => {
      dispatch(updateComponent("heatmap"));
      dispatch(resetUser());
      dispatch(resetPosts());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickComponent = (newComponent: UserComponentState) => {
    if (component === newComponent) return;

    dispatch(updateComponent(newComponent));
    dispatch(resetPage());

    if (
      newComponent === "all" ||
      newComponent === "push" ||
      newComponent === "gist" ||
      newComponent === "image"
    ) {
      setRegDate("");
      dispatch(
        fetchAllPosts({
          userId: profile.userId,
          type:
            newComponent === "push"
              ? "PUSH"
              : newComponent === "gist"
              ? "GIST"
              : newComponent === "image"
              ? "IMAGE"
              : undefined,
        })
      );
    } else if (newComponent === "heatmap") {
      setRegDate("");
      dispatch(fetchPostCount(profile.userId));
    }
  };

  const onClickPageButton = (e: any) => {
    dispatch(
      fetchAllPosts({
        userId: profile.userId,
        regDate: regDate ? regDate : undefined,
        type:
          component === "push"
            ? "PUSH"
            : component === "gist"
            ? "GIST"
            : component === "image"
            ? "IMAGE"
            : undefined,
        page:
          e.target.name === "prev"
            ? page.number - 1
            : e.target.name === "next"
            ? page.number + 1
            : undefined,
      })
    );
  };

  const onClickDay = (regDate: string) => {
    setRegDate(regDate);
    dispatch(updateComponent("day"));
    dispatch(fetchAllPosts({ userId: profile.userId, regDate }));
  };

  const onClickModal = (postId: number) => {
    dispatch(fetchCommits(postId));
  };

  const onClickDelete = (postId: number) => {
    if (window.confirm("???????????? ?????????????????????????")) {
      dispatch(removePost(postId));
    }
  };

  return (
    <User
      profile={profile}
      component={component}
      allPosts={allPosts}
      commits={commits}
      heatmap={heatmap}
      page={page}
      readOnly={readOnly}
      onClickPageButton={onClickPageButton}
      onClickDay={onClickDay}
      onClickModal={onClickModal}
      onClickComponent={onClickComponent}
      onClickDelete={onClickDelete}
    />
  );
};

export default UserContainer;
