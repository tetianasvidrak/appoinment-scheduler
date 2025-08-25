import React from "react";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";

import { Modal } from "../Modal";
import { EditServiceModal } from "../EditServiceModal";

import type { CategoryType } from "../../model/category.model";
import type { ServiceType } from "../../model/service.model";
import type { ServiceListProps } from "./index.model";

const categories: CategoryType[] = [
  { id: "1", name: "Manicure" },
  { id: "2", name: "Pedicure" },
  { id: "3", name: "Treatment" },
  { id: "4", name: "Podology" },
  { id: "5", name: "Rest time" },
  { id: "6", name: "Own time" },
  { id: "7", name: "Holidays" },
];

export const ServiceList = ({
  durationOptions,
  services,
  onEdit,
  onDelete,
}: ServiceListProps) => {
  const [selectedService, setSelectedService] =
    React.useState<ServiceType | null>(null);

  return (
    <div className="w-full">
      <Card
        sx={{ bgcolor: "pink.100", mb: 2, maxHeight: 200, overflowY: "auto" }}
      >
        <CardContent>
          {categories.map((category) => {
            const categoryServices = services.filter(
              (service: ServiceType) => service.category === category.id
            );

            return (
              <div key={category.id}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {category.name}
                </Typography>

                <List>
                  {categoryServices.map((service) => (
                    <ListItem
                      key={service.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 0.5,
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedService(service)}
                    >
                      <span>{service.service}</span>
                      <span>{service.duration}</span>
                    </ListItem>
                  ))}
                </List>
              </div>
            );
          })}
        </CardContent>
      </Card>
      {selectedService && (
        <Modal handlerClick={() => setSelectedService(null)}>
          <EditServiceModal
            service={selectedService}
            durationOptions={durationOptions}
            categories={categories}
            onEdit={(id: string, data: Partial<ServiceType>) => {
              onEdit(id, data);
              setSelectedService(null);
            }}
            onDelete={(id: string) => {
              onDelete(id);
              setSelectedService(null);
            }}
          />
        </Modal>
      )}
    </div>
  );
};
