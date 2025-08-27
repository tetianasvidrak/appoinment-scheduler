import { useState, type ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";

import { Modal } from "../Modal";

import type { EditClientModalProps } from "./index.model";

export const EditClientModel = ({
  client,
  onEdit,
  onDelete,
}: EditClientModalProps) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [formData, setFormData] = useState(
    client || {
      name: "",
      phone: "",
    }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="w-96 flex flex-col gap-4 my-4">
        <div className="flex items-center gap-2">
          <label className="block font-medium">Full name:</label>
          <TextField
            size="small"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{
              width: "70%",
              marginLeft: "auto",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          ></TextField>
        </div>

        <div className="flex items-center gap-2">
          <label className="block font-medium">Phone:</label>
          <TextField
            name="phone"
            size="small"
            value={formData.phone}
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
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="outlined" onClick={() => setModalDelete(true)}>
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEdit(client.id, formData)}
        >
          Save
        </Button>
      </div>
      {modalDelete && (
        <Modal handlerClick={() => setModalDelete(false)}>
          <div className="flex flex-col items-center gap-6 p-4">
            <p>Are you sure you want to delete this client?</p>
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
                  onDelete(client.id);
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
