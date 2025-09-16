import type { ServicePayload, ServiceType } from "../../model/service.model";
import type { DurationOption } from "../../model/duration.model";
import type { CategoryType } from "../../model/category.model";

export type EditServiceModalProps = {
  service: ServiceType;
  durationOptions: DurationOption[];
  // categories?: { id: string; name: string }[];
  categories?: CategoryType[];
  onEdit: (id: string, data: ServicePayload) => void;
  onDelete: (id: string) => void;
};
