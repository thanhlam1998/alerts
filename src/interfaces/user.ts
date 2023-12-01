export interface IUserListItem {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  languageCode?: string;
  profilePictureUrl: string | null;
  lastUpdatedOn: number | null;
}
