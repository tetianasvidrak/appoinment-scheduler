import { useState } from "react";
import type { ChangeEvent } from "react";
import { Button, MenuItem, TextField } from "@mui/material";

import type { AddServiceModalProps } from "./index.model.ts";
import type { CategoryType } from "../../model/category.model.ts";

export const AddServiceModal = ({ onAdd, onSubmit }: AddServiceModalProps) => {
  const [formData, setFormData] = useState({
    category: "",
    service: "",
    duration: "",
    price: "",
  });

  const categories: CategoryType[] = [
    { id: "1", name: "Manicure" },
    { id: "2", name: "Pedicure" },
    { id: "3", name: "Treatment" },
    { id: "4", name: "Podology" },
    { id: "5", name: "Rest time" },
    { id: "6", name: "Own time" },
    { id: "7", name: "Holidays" },
  ];
  const durations = ["0:30", "1:00", "1:30", "2:00", "2:30", "3:00"];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd(formData);
    onSubmit();
  };

  return (
    <>
      <div className="w-96 flex flex-col gap-4 my-4">
        <div className="flex items-center gap-2">
          <label className="block font-medium">Category:</label>
          <TextField
            select
            size="small"
            name="category"
            value={formData.category}
            onChange={handleChange}
            sx={{
              width: "70%",
              marginLeft: "auto",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
            slotProps={{
              select: {
                MenuProps: {
                  disableScrollLock: true,
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                      overflowY: "auto",
                    },
                  },
                },
              },
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="flex items-center gap-2">
          <label className="block font-medium">Service:</label>
          <TextField
            name="service"
            size="small"
            value={formData.service}
            onChange={handleChange}
            sx={{
              width: "70%",
              marginLeft: "auto",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="block font-medium">Duration:</label>
          <TextField
            select
            size="small"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            sx={{
              width: "70%",
              marginLeft: "auto",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
            slotProps={{
              select: {
                MenuProps: {
                  disableScrollLock: true,
                },
              },
            }}
          >
            {durations.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="flex items-center gap-2">
          <label className="block font-medium">Price (€):</label>
          <TextField
            name="price"
            size="small"
            value={formData.price}
            onChange={handleChange}
            type="text"
            sx={{
              width: "70%",
              marginLeft: "auto",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="outlined" onClick={() => console.log("Cancel")}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </>
  );
};
