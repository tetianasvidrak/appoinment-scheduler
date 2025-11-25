import type { CategoryType } from "./category.model";

export type ServiceType = {
  _id: string;
  category: CategoryType;
  name: string;
  price: number;
  duration: number;
};

export type ServicePayload = {
  name: string;
  category: string;
  price: number;
  duration: number;
};
