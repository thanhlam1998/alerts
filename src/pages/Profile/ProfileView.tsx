import { memo } from "react";
import "./Profile.scss";
import UserProfile from "./components/UserProfile";

const ProfileView = ({}: any) => {
  return <UserProfile />;
};

export default memo(ProfileView);
