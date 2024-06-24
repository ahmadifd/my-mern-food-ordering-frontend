type UserAuthType = {
  email: string;
  roles: string[];
};

export type UserAuthInfo = {
  data: UserAuthType;
};
