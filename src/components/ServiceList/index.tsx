import React from "react";
import { CardContent, Typography, List, ListItem, Box } from "@mui/material";

import { Modal } from "../Modal";

import type { ServiceType } from "../../model/service.model";
import type { ServiceListProps } from "./index.model";
import { ServiceFormModal } from "../ServiceFormModal";

export const ServiceList = ({
  mode,
  categories,
  durationOptions,
  services,
  onSubmit,
}: ServiceListProps) => {
  const [selectedService, setSelectedService] =
    React.useState<ServiceType | null>(null);

  const categorizedServices = React.useMemo(() => {
    if (!categories) return [];

    return categories.map((category) => ({
      ...category,
      services: services.filter(
        (service: ServiceType) => service.category._id === category._id
      ),
    }));
  }, [categories, services]);

  return (
    <div className="w-full">
      <CardContent
        className="scroll-thin"
        sx={{
          maxHeight: 220,
          minHeight: 220,
          overflowY: "auto",
          padding: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {categorizedServices.map((category) => (
          <div key={category._id} className="mb-1 rounded">
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                letterSpacing: "0.05em",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                mb: 1,
                backgroundColor: `${category.displayColor}`,
              }}
              className="rounded-2xl px-2 py-1"
            >
              {category.name}
            </Typography>

            <List style={{ padding: 6 }}>
              {category.services.map((service) => (
                <ListItem
                  key={service._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 0.7,
                    cursor: "pointer",
                    transition:
                      "background-color 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      backgroundColor: `${category.displayColor}`,
                      boxShadow: "0 6px 6px rgba(0,0,0,0.2)",
                    },
                  }}
                  className="rounded-2xl"
                  onClick={() => setSelectedService(service)}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: `${category.displayColor}`,
                        mr: 1,
                      }}
                    />
                    <span className="text-sm">{service.name}</span>
                  </Box>
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
        ))}
      </CardContent>
      {selectedService && (
        <Modal onClose={() => setSelectedService(null)}>
          <ServiceFormModal
            mode={mode}
            initialData={selectedService}
            durationOptions={durationOptions}
            onSubmit={(action, payload, id) => {
              onSubmit(action, payload, id);
              setSelectedService(null);
            }}
          />
        </Modal>
      )}
    </div>
  );
};
