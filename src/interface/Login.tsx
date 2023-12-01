export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  languageCode?: string;
  timezone?: string;
  role: string;
  active: boolean; //default: true
  createdOn: number; //default: current datetime
  lastUpdatedOn?: number;
  deactivatedOn?: number;
  createdBy: string;
  lastUpdatedBy?: string;
  deactivatedBy?: string;
  supervisedBy?: string;
  profilePictureSet?: boolean;
  profilePictureBlob?: string;
}
export interface IAuth {
  access_token: string;
  refresh_token: string;
}
