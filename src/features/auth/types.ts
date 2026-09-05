export type AuthUser = {
  email: string;
  id: string;
};

export type AuthSession = {
  user: AuthUser;
};
