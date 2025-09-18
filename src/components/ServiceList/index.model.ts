import type { ServicePayload, ServiceType } from "../../model/service.model";
import type { DurationOption } from "../../model/duration.model";
import type { CategoryType } from "../../model/category.model";

export type ServiceListProps = {
  categories: CategoryType[];
  durationOptions: DurationOption[];
  services: ServiceType[];
  onEdit: (id: string, data: ServicePayload) => void;
  onDelete: (id: string) => void;
};
