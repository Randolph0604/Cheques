import React from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as Select1,
} from "@material-ui/core";

export function Select({
  label,
  name,
  value,
  items,
  onChange,
  required = false,
  modificando = true,
}: {
  label: string;
  name: string;
  value: string;
  items: { id: string; label: string }[];
  onChange: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
  required?: boolean;
  modificando?: boolean;
}) {
  const itemSeleccionado = items.find((item) => item.id === value);

  return modificando ? (
    <FormControl
      fullWidth
      required={required}
      variant="outlined"
      margin="normal"
    >
      <InputLabel shrink id={"label" + name}>
        {label}
      </InputLabel>

      <Select1
        labelId={"label" + name}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select1>
    </FormControl>
  ) : (
    <div>
      <div>
        <strong>{label}</strong>
      </div>
      <div>{itemSeleccionado?.label ?? ""}</div>
    </div>
  );
}
