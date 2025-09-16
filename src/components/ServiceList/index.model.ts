import type { ServicePayload, ServiceType } from "../../model/service.model";
import type { DurationOption } from "../../model/duration.model";

export type ServiceListProps = {
  durationOptions: DurationOption[];
  services: ServiceType[];
  onEdit: (id: string, data: ServicePayload) => void;
  onDelete: (id: string) => void;
};
