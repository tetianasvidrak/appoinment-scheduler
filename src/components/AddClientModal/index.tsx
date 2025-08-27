import { useState } from "react";
import type { ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";
import type { AddClientModelProps } from "./index.model";
import { v4 as uuidv4 } from "uuid";

export const AddClientModal = ({ onAdd }: AddClientModelProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newClient = {
      ...formData,
      id: uuidv4(),
    };
    onAdd(newClient);
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
        <Button variant="outlined" onClick={() => console.log("Cancel")}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit()}
        >
          Save
        </Button>
      </div>
    </>
  );
};
