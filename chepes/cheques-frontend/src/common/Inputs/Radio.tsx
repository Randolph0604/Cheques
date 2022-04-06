import React from "react";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio as Radio1,
  RadioGroup,
} from "@material-ui/core";

export function Radio({
  label,
  name,
  value,
  items,
  onChange,
  modificando = true,
}: {
  label: string;
  name: string;
  value: string;
  items: { id: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  modificando?: boolean;
}) {
  const itemSeleccionado = items.find((item) => item.id === value);

  return modificando ? (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio1 />}
            label={item.label}
          />
        ))}
      </RadioGroup>
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
