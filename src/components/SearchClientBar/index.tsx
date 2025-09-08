import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
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
        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
          padding: "2px 10px",
          "& fieldset": {
            borderColor: "#949494",
          },
          "&:hover fieldset": {
            borderColor: "#949494",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#949494",
          },
          "& input": {
            padding: "6px 8px",
            color: "#949494",
          },
          "& svg": {
            color: "#949494",
          },
        },
      }}
      onChange={(e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
