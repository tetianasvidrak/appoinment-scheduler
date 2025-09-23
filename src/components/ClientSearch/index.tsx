import { useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import type { ClientSearchProps } from "./index.model";
import type { ClientType } from "../../model/client.model";

export const ClientSearch = ({ clients, onChange }: ClientSearchProps) => {
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
        onChange={(_, client) => {
          if (!client) return;
          onChange(client);
        }}
        noOptionsText="Клієнта не знайдено"
        getOptionLabel={(option) => `${option.name} ${option.phone}`}
        filterOptions={filterOptions}
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
        renderInput={(params) => <TextField {...params} label="Client" />}
        sx={{ width: "100%" }}
      />
    </div>
  );
};
