import type { ServiceType } from "../../model/service.model";
import type { CategoryType } from "../../model/category.model";

export type ServiceListProps = {
  categories: CategoryType[];
  services: ServiceType[];
  onSubmit: (
    action: "create" | "edit" | "delete",
    payload?: Omit<ServiceType, "_id" | "category"> & { category: string },
    id?: string
  ) => void;
  onClose?: () => void;
};
