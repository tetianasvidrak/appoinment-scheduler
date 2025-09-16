import React from "react";
import {
  CardContent,
  Typography,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

import { Modal } from "../Modal";
import { EditServiceModal } from "../EditServiceModal";

import type { ServicePayload, ServiceType } from "../../model/service.model";
import type { ServiceListProps } from "./index.model";
import { useGetCategoriesQuery } from "../../services/apiSlice";
// import { Loader } from "../Loader";

export const ServiceList = ({
  durationOptions,
  services,
  onEdit,
  onDelete,
}: ServiceListProps) => {
  const [selectedService, setSelectedService] =
    React.useState<ServiceType | null>(null);
  const { data: categories, error, isLoading } = useGetCategoriesQuery();

  const categorizedServices = React.useMemo(() => {
    if (!categories) return [];

    return categories.map((category) => ({
      ...category,
      services: services.filter(
        (service: ServiceType) => service.categoryId._id === category._id
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
        {error && (
          <div className="flex flex-col items-center justify-center flex-grow">
            <ErrorOutline fontSize="large" />
            <span className="ml-2 text-gray-500">
              не вдалося завантажити...
            </span>
          </div>
        )}
        {isLoading && (
          <div className="flex flex-col items-center justify-center flex-grow">
            <CircularProgress />
            <span className="ml-2 text-gray-500">Loading...</span>
          </div>
        )}
        {categorizedServices.map((category) => (
          <div
            key={category._id}
            // style={{
            //   backgroundColor: `${category.displayColor}`,
            // }}
            className="mb-1 rounded"
          >
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
                      // backgroundColor: "rgba(255,255,255,0.15)",
                      backgroundColor: `${category.displayColor}`,
                      boxShadow: "0 6px 6px rgba(0,0,0,0.2)",
                    },
                  }}
                  className="rounded-2xl"
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
        ))}
      </CardContent>
      {selectedService && (
        <Modal handlerClick={() => setSelectedService(null)}>
          <EditServiceModal
            service={selectedService}
            durationOptions={durationOptions}
            categories={categories}
            onEdit={(id: string, data: ServicePayload) => {
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
