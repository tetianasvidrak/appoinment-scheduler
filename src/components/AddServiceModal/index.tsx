import { useState } from "react";
import type { ChangeEvent } from "react";
import { Button, MenuItem, TextField } from "@mui/material";

import type { AddServiceModalProps } from "./index.model.ts";
import { categories } from "../../data/categories.ts";

export const AddServiceModal = ({
  durationOptions,
  onAdd,
  onSubmit,
}: AddServiceModalProps) => {
  const [formData, setFormData] = useState({
    id: "",
    categoryId: "",
    name: "",
    duration: 30,
    price: 0,
  });
  console.log(formData);

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
            name="categoryId"
            value={formData.categoryId}
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
            name="name"
            size="small"
            value={formData.name}
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
            {durationOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
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
