import type { ServiceType } from "../../model/service.model";
import type { DurationOption } from "../../model/duration.model";
import type { CategoryType } from "../../model/category.model";

export type ServiceListProps = {
  mode: "create" | "edit";
  categories: CategoryType[];
  durationOptions: DurationOption[];
  services: ServiceType[];
  onSubmit: (
    action: "create" | "edit" | "delete",
    payload?: Omit<ServiceType, "_id" | "category"> & { category: string },
    id?: string
  ) => void;
  onClose?: () => void;
};
