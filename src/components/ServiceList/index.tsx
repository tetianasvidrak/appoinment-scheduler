import React from "react";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";

import { Modal } from "../Modal";
import { EditServiceModal } from "../EditServiceModal";

import type { ServiceType } from "../../model/service.model";
import type { ServiceListProps } from "./index.model";
import { categories } from "../../data/categories";

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
      <Card sx={{ bgcolor: "#fff" }}>
        <CardContent
          className="scroll-thin"
          sx={{ maxHeight: 220, overflowY: "auto", pr: 1 }}
        >
          {categories.map((category) => {
            const categoryServices = services.filter(
              (service: ServiceType) => service.categoryId === category.id
            );

            return (
              <div
                key={category.id}
                style={{
                  backgroundColor: `#${category.displayColor}`,
                }}
                className="mb-1 p-2 rounded"
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: 600, letterSpacing: "0.05em" }}
                >
                  {category.name}
                </Typography>

                <List style={{ padding: 0 }}>
                  {categoryServices.map((service) => (
                    <ListItem
                      key={service.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 0.5,
                        cursor: "pointer",
                        transition:
                          "background-color 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.15)",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                        },
                        borderRadius: "10px",
                      }}
                      onClick={() => setSelectedService(service)}
                    >
                      <span className="text-sm">{service.name}</span>
                      <span className="text-sm">
                        {
                          durationOptions.find(
                            (option) => option.value === service.duration
                          )?.label
                        }
                      </span>
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
