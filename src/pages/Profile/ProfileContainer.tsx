// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
import { getRedux } from "scripts/helpers";
// import { updatePassword } from "store/actions/user";
import ProfileView from "./ProfileView";

const ProfileContainer = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const accessToken = getRedux("auth.currentAuth.accessToken", "");
  const currentUser = getRedux(`auth.currentUser`, {});

  const handleChangePassword = (data: any) => {
    // console.log("handleChangePassword ===> ", data);
    // delete data?.passwordConfirm;
    // dispatch(
    //   updatePassword({
    //     body: {
    //       ...data,
    //       accessToken,
    //     },
    //     navigate,
    //   }),
    // );
  };

  return <ProfileView {...{ currentUser, handleChangePassword }} />;
};

export default ProfileContainer;
