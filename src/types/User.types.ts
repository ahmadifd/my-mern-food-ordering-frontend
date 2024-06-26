export type User = {
  _id?: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
  roles: string[];
  active: boolean;
  password: string;
};
