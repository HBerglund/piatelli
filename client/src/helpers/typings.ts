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

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegistrationInput {
  email: string;
  fullName: string;
  address: {
    street: string;
    zipcode: string;
    city: string;
    country: string;
  };
  phone: string;
  password: string;
  role: string;
}

export interface Address {
  street: string;
  zipcode: string;
  city: string;
  country: string;
}

export interface Delivery {
  _id: string;
  name: string;
  price: number;
  deliveryTime: string;
}

export interface Order {
  _id: string;
  customer: User;
  address: Address;
  items: Product[];
  payment: string;
  delivery: Delivery;
  sum: number;
  createdAt?: Date;
}

export interface Product {
  _id?: string;
  name: string;
  price: number;
  img: string;
  category: string[];
  description: string;
  details: string;
  care: string;
  stock: number;
  quantity?: number;
}
