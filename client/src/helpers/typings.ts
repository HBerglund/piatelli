export interface User {
  email: string;
  password: string;
  role: string;
  authorizedAdmin: boolean;
  fullName: string;
  address: Address;
  phone: string;
  _id?: string;
}

export interface Address {
  street: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface Delivery {
  _id: string;
  name: string;
  price: number;
  deliveryTime: string;
}
