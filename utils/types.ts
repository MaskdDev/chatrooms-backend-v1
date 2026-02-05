// User types

/**
 * A type representing a user's profile.
 */
export type UserProfile = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
};

export type Room = {
  id: string;
  name: string;
  description: string | null;
  visibility: boolean;
};
