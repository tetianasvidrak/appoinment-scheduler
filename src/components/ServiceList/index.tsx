import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import type { ServiceListProps } from "./index.module";
import type { Category } from "../AddServiceModal/index.model.ts";
import type { ServiceType } from "../Services/index.model.ts";

const categories: Category[] = [
  { id: "1", name: "Manicure" },
  { id: "2", name: "Pedicure" },
  { id: "3", name: "Treatment" },
  { id: "4", name: "Podology" },
  { id: "5", name: "Rest time" },
  { id: "6", name: "Own time" },
  { id: "7", name: "Holidays" },
];

export const ServiceList = ({ services }: ServiceListProps) => {
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
                      key={service.service}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 0.5,
                        cursor: "pointer",
                      }}
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
    </div>
  );
};
