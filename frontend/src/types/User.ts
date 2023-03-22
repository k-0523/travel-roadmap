type User = {
  userId: number;
  email: string;
  userName: string;
  isPrivate: number;
  createdAt: string;
};
type MyPage = {
  email: string;
  userId: number;
  userName: string;
  imagePath: string;
  introduce: string;
  url: string;
  name: string;
  canFollow: boolean;
  isOwn: boolean;
  totalViewCount: number;
  followingCount: number;
  followerCount: number;
  isPrivate: boolean;
};

type UserProfile = {
  imagePath: string;
  introduce: string;
  url: string;
  name: string;
};

type UpdateUserProfile = {
  introduce: string;
  url: string;
	name: string;
  imagePath: string
};
type UpdateUserPassword = {
  password: string;
  newPassword: string;
  newPassword2: string;
};
type UpdatePasswordRemind = {
	token: string;
  newPassword: string;
  newPassword2: string;
};
type UpdateUserName = {
  userName: string;
};
type UpdateEmail = {
  newEmail: string;
};
type Remind = {
  email: string;
};
type PasswordRemind = {
  newPassword: string;
  newPassword2: string;
};
export type {
  User,
  MyPage,
  UserProfile,
  UpdateUserProfile,
  UpdateUserPassword,
  UpdateUserName,
  UpdateEmail,
  PasswordRemind,
  UpdatePasswordRemind,
  Remind,
};
