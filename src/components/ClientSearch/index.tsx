import { useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import type { ClientSearchProps } from "./index.model";
import type { ClientType } from "../../model/client.model";

export const ClientSearch = ({
  clients,
  selected,
  onChange,
}: ClientSearchProps) => {
  const [inputValue, setInputValue] = useState("");

  const filterOptions = createFilterOptions<ClientType>({
    stringify: (option) => `${option.name} ${option.phone}`,
  });

  return (
    <div className="w-full">
      <Autocomplete
        options={clients}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        value={clients.find((c) => c._id === selected) || null}
        onChange={(_, client) => {
          if (!client) return;
          onChange(client._id);
        }}
        noOptionsText="Клієнта не знайдено"
        getOptionLabel={(option) => `${option.name} ${option.phone}`}
        filterOptions={filterOptions}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#eaf6eb",
              boxShadow: "0 4px 10px rgba(46, 108, 51, 0.5)",
              borderRadius: "12px",
            },
          },
        }}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps} style={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "8px 12px",
                }}
              >
                <Typography>{option.name}</Typography>
                <Typography color="text.secondary">{option.phone}</Typography>
              </Box>
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Client"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "15px",
                  borderColor: "#2e6c33",
                  color: "#2e6c33",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#2e6c33",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#2e6c33",
                "&.Mui-focused": {
                  color: "#2e6c33",
                },
              },
              "& .MuiButtonBase-root": {
                color: "#2e6c33",
                fontWeight: "700",
                backgroundColor: "#c2e5c5",
              },
            }}
          />
        )}
      />
    </div>
  );
};
