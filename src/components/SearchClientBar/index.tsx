import { useState } from "react";
import {
  TextField,
  InputAdornment,
  type OutlinedInputProps,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import type { SearchClientBarProps } from "./index.model";

export default function SearchClientBar({ onSearch }: SearchClientBarProps) {
  const [, setQuery] = useState("");
  return (
    <TextField
      variant="outlined"
      placeholder="Search…"
      size="small"
      sx={{
        borderRadius: "20px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
        },
      }}
      onChange={(e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
      }}
      InputProps={
        {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        } as Partial<OutlinedInputProps>
      }
    />
  );
}
