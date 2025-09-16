import type { CategoryType } from "./category.model";

export type ServiceType = {
  _id: string;
  categoryId: CategoryType;
  name: string;
  price: number;
  duration: number;
};

export type ServicePayload = {
  categoryId: string;
  name: string;
  price: number;
  duration: number;
};
