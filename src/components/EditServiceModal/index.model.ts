import type { ServiceType } from "../../model/service.model";
import type { DurationOption } from "../../model/duration.model";

export type EditServiceModalProps = {
  service: ServiceType;
  durationOptions: DurationOption[];
  categories?: { id: string; name: string }[];
  onEdit: (id: string, data: Partial<ServiceType>) => void;
  onDelete: (id: string) => void;
};
