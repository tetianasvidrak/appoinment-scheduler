import { useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";

import { Modal } from "../Modal";

import type { EditServiceModalProps } from "./index.model";

export const EditServiceModal = ({
  service,
  durationOptions,
  categories,
  onEdit,
  onDelete,
}: EditServiceModalProps) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [formData, setFormData] = useState(
    service || {
      name: "",
      price: "",
      duration: "",
      categoryId: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            {categories?.map((option) => (
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
        <Button
          variant="outlined"
          onClick={() => {
            setModalDelete(true);
          }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEdit(service.id, formData)}
        >
          Save
        </Button>
      </div>
      {modalDelete && (
        <Modal handlerClick={() => setModalDelete(false)}>
          <div className="flex flex-col items-center gap-6 p-4">
            <p>Are you sure you want to delete this service?</p>
            <div className="flex gap-4">
              <Button
                variant="outlined"
                onClick={() => {
                  setModalDelete(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  onDelete(service.id);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
