export interface User {
  email: string;
  password: string;
  role: string;
  authorizedAdmin: boolean;
  fullName: string;
  address: Address;
  phone: string;
}

export interface Address {
  street: string;
  zipCode: string;
  city: string;
  country: string;
}
