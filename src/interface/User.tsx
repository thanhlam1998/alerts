import { USER_ROLES } from "scripts/constants";

export interface UserProps {
  img: string;
  firstName: string;
  lastName: string;
  email: string;
  role: USER_ROLES;
  lastUpdatedOn?: string;
  profilePictureUrl?: string;
  id: string;
}
