import React from "react";
import { FormControlLabel, Switch as Switch1 } from "@material-ui/core";

export function Switch({
  label,
  name,
  value,
  onChange,
  modificando = true,
  disabled = false,
}: {
  label: string;
  name: string;
  value: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  modificando?: boolean;
  disabled?: boolean;
}) {
  return modificando ? (
    <FormControlLabel
      control={
        <Switch1
          disabled={disabled}
          checked={value}
          name={name}
          color="primary"
          onChange={onChange}
        />
      }
      label={label}
      labelPlacement="end"
    />
  ) : (
    <div>
      <div>
        <strong>{label}</strong>
      </div>
      <div>{value ? "SI" : "NO"}</div>
    </div>
  );
}
