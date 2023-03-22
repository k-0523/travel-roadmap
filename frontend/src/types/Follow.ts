type FollowUser = {
  userId: number;
  followUserId: number;
  followerUserId: number;
  email: string;
  userName: string;
  imagePath: string;
  isFollowingCount: number;
};
type Follower = {
  userId: number;
  followUserId: number;
  followerUserId: number;
  email: string;
  userName: string;
  imagePath: string;
  isFollowingCount: number;
};

export type { FollowUser, Follower };
