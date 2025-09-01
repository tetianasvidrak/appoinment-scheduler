import type { ServiceType } from "../../model/service.model";
import type { DurationOption } from "../../model/duration.model";

export type ServiceListProps = {
  durationOptions: DurationOption[];
  services: ServiceType[];
  onEdit: (id: string, data: Partial<ServiceType>) => void;
  onDelete: (id: string) => void;
};
