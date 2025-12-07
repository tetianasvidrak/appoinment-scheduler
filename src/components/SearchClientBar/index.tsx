import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import type { SearchClientBarProps } from "./index.model";

export default function SearchClientBar({
  onSearch,
  disabled,
}: SearchClientBarProps) {
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

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#949494",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2e6c33",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2e6c33",
            borderWidth: "2px",
          },

          "& svg": {
            color: "#949494",
            transition: "color 0.3s ease",
          },

          "&:hover svg, &.Mui-focused svg": {
            color: "#2e6c33",
          },

          "& input": {
            padding: "6px 8px",
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
      disabled={disabled}
    />
  );
}
