import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { services } from "../../data/services";

import type { CheckboxServicesProps } from "./index.model";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CheckboxServices = ({
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
      onChange={(event, newValue) => {
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
          placeholder="Favorites"
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
