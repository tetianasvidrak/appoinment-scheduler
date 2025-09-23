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
      getOptionLabel={(option) => option.name}
      value={selected}
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        );
      }}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Services"
          placeholder="Add more"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black",
              },

              "&.Mui-focused fieldset": {
                borderColor: "green",
              },
            },
          }}
        />
      )}
    />
  );
};
