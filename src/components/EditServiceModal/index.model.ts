import type { ServiceType } from "../../model/service.model";

export type EditServiceModalProps = {
  service: ServiceType;
  durationOptions?: string[];
  categories?: { id: string; name: string }[];
  onEdit: (id: string, data: Partial<ServiceType>) => void;
  onDelete: (id: string) => void;
};
