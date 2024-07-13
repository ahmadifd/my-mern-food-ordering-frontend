type UserAuthType = {
  userId: string;
  email: string;
  roles: string[];
};

export type UserAuthInfo = {
  data: UserAuthType;
};
