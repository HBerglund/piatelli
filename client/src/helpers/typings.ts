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

export interface DeliveryOpt {
  _id: string;
  name: string;
  price: number;
  deliveryTime: string;
}
