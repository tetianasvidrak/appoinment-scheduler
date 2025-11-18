import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import type { CheckboxServicesProps } from "./index.model";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CheckboxServices = ({
  services,
  selected,
  onChange,
}: CheckboxServicesProps) => {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={services}
      disableCloseOnSelect
      disableClearable
      isOptionEqualToValue={(option, value) => option._id === value._id}
      getOptionLabel={(option) => option.name}
      value={selected}
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "#eaf6eb",
            boxShadow: "0 4px 10px rgba(46, 108, 51, 0.5)",
            borderRadius: "12px",
          },
        },
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option._id}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            checked={selected}
            sx={{
              color: "#2e6c33",
              "&.Mui-checked": {
                color: "#2e6c33",
              },
            }}
          />
          {option.name}
        </li>
      )}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Services"
          placeholder="Add more"
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
  );
};
